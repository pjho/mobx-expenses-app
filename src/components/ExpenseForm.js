import React, { Component, Fragment } from "react";
import { inject, observer } from 'mobx-react'
import { action } from 'mobx'

// @inject('store,expenseForm')
@inject('store', 'expenseForm')
@observer
export class ExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.amountRef = null
    this.descriptionRef = null
    this.spenderRef = null
  }

  @action
  handleFormSubmit = e => {
    e.preventDefault();

    const { id, amount, description, spender } = this.props.expenseForm
    const { store } = this.props

    if(!amount || !description || !spender) {
      window.alert('You need to enter all the values.')
      return false
    }

    id ? store.updateExpense(id, amount, description, spender)
       : store.addExpense(amount, description, spender)

    this.props.expenseForm.clear()
  }

  update = (key) => (e) => {
    e.preventDefault()
    this.props.expenseForm.update(key, e.target.value)
  }

  render () {
    const { store, expenseForm } = this.props

    return (
      <Fragment>
        <h4>Add Expense</h4>
        <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" value={ expenseForm.id } />
          <input
            value={ expenseForm.amount }
            onChange={ this.update('amount') }
            placeholder='Amount'
            className="form-input"
            type="number"
          />
          <br />
          <input
            value={ expenseForm.description }
            onChange={ this.update('description') }
            placeholder='Description'
            className="form-input"
            type="text"
          />
          <br />
          <select
            value={ expenseForm.spender }
            onChange={ this.update('spender') }
            className="form-select"
          >
            <option value="">- spender -</option>
            {
              store.spenders.map(p => (
                <option key={p} value={ p }>{ p }</option>
              ))
            }
          </select>
          <br /><br />
          <button className='btn btn-primary'>
            { expenseForm.id ? 'update expense' : 'add expense' }
          </button>
        </form>


      </Fragment>
    )
  }
}










