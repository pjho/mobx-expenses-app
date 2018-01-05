import React, { Component, Fragment } from "react";
import { inject, observer } from 'mobx-react'
import { action } from 'mobx'

@inject('store')
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
    const amount = this.amountRef.value
    const description = this.descriptionRef.value
    const spender = this.spenderRef.value


    if(!amount || !description || !spender) {
      window.alert('You need to enter all the values.')
      return false
    }

    this.props.store.addExpense(amount, description, spender);
    this.clearForm()
  }


  clearForm = () => {
    this.amountRef.value = ''
    this.descriptionRef.value = ''
    this.spenderRef.value = ''
  }

  render () {
    const { store } = this.props

    return (
      <Fragment>
        <h4>Add Expense</h4>
        <form onSubmit={this.handleFormSubmit}>
          <input type="number" placeholder='Amount' className="form-input" ref={ el => this.amountRef = el } /><br />
          <input type="text" placeholder='Description' className="form-input" ref={ el => this.descriptionRef = el } /><br />
          <select className="form-select" ref={ el => this.spenderRef = el }>
            <option value="">- spender -</option>
            {
              store.spenders.map(p => (
                <option key={p} value={ p }>{ p }</option>
              ))
            }
          </select>
          <br /><br />
          <button className='btn btn-primary'>
            add expense
          </button>
        </form>
      </Fragment>
    )
  }
}
