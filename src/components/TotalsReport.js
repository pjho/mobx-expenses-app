import React, { Component, Fragment } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import { Expense } from './Expense'

const Spender = inject('store')(observer(({ spender, store }) => {
  const spent = store.totalSpendForSpender(spender)
  const owes = Math.round(store.totalSpendPerSpender - spent)

  return (
    <tr key={ spender }>
      <td>
        <strong>{ spender }</strong><strong className='float-right'>${ spent.toFixed(2) }</strong>
      </td>
      <td className={ owes > 0 ? 'bg-dark' : 'bg-success'}>
        { owes >= 0 ? 'Owes' : 'Is Owed' }: <strong className='float-right'>${ Math.abs(owes).toFixed(2) }</strong>
      </td>
    </tr>
  )
}))


@inject('store')
@observer
export class TotalsReport extends Component {
  render() {
    const { store } = this.props
    return (
      <Fragment>
        <h4>Expense Report</h4>
        <table className='table'>
          <tbody>
            <tr>
              <td className="bg-dark">Total: <strong>${ store.totalSpend.toFixed(2) }</strong></td>
              <td className='text-right bg-dark'>Each: <strong>${ store.totalSpendPerSpender.toFixed(2) }</strong></td>
            </tr>
          </tbody>
        </table>
        <table className='table compact'>
          <thead>
            <tr>
              <th className="bg-gray">Spent</th>
              <th className='text-right bg-gray'>+/-</th>
            </tr>
          </thead>
          <tbody>
            { store.spenders.map((spender) => <Spender key={ spender } spender={ spender } />) }
          </tbody>
        </table>
      </Fragment>
    )
  }
}
