import React, { Component, Fragment } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import { Expense } from './Expense'
import { TotalsReport } from './TotalsReport'

@inject('store')
@observer
export class ExpenseList extends Component {
  render() {
    return (
      <Fragment>
        <h4>Expenses</h4>
        <TotalsReport />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Person</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.store.expenses.map(exp => (
              <Expense key={exp.id} expense={exp} />
            ))
          }
          </tbody>
        </table>

      </Fragment>
    )
  }
}
