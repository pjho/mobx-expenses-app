import React, { Component, Fragment } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import { Expense } from './Expense'

@inject('store', 'expenseForm')
@observer
export class ExpenseList extends Component {
  render() {
    return (
      <Fragment>
        <h4>
          Expenses
          &nbsp;
          <button
            onClick={ () => this.props.expenseForm.show() }
            className='btn btn-sm btn--success'
          >
            + add expense
          </button>
        </h4>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="bg-dark">Amount</th>
              <th className="bg-dark">Description</th>
              <th className="bg-dark">Spender</th>
              <th className="bg-dark"></th>
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
