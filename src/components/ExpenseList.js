import React, { Component, Fragment } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { Expense } from './Expense'

@observer
export class ExpenseList extends Component {
  render() {
    return (
      <Fragment>
        <h4>Expenses</h4>
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
            this.props.expenses.map(exp => (
              <Expense key={exp.id} expense={exp} />
            ))
          }
          </tbody>
        </table>
      </Fragment>
    )
  }
}
