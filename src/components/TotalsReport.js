import React, { Component, Fragment } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import { Expense } from './Expense'

@inject('store')
@observer
export class TotalsReport extends Component {
  render() {
    const { store } = this.props
    return (
      <div>
        <h4>Report</h4>
        <table className='table'>
          <tbody>
            <tr>
              <td><strong>Total Spend: </strong></td>
              <td className='text-right'>{ store.totalSpend.toFixed(2) }</td>
            </tr>
            <tr>
              <td><strong>Per Spender: </strong></td>
              <td className='text-right'>{ store.totalSpendPerSpender.toFixed(2) }</td>
            </tr>
          </tbody>
        </table>
        <div>
          { store.spenders.map(spender => (
              <div key={ spender } style={{marginTop: '20px'}}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>{ spender }</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Spent: </strong></td>
                      <td className='text-right'>${ store.totalSpendForSpender(spender).toFixed(2) }</td>
                    </tr>
                      <tr>
                      <td><strong>Owes: </strong></td>
                      <td className='text-right'>${ (store.totalSpendForSpender(spender) - store.totalSpendPerSpender).toFixed(2) }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          ))}
        </div>
      </div>
    )
  }
}
