import React, { Component } from "react";
import { inject, observer } from 'mobx-react'
import { action } from 'mobx'
import { Modal } from './Modal'


@inject('store', 'expenseForm')
@observer
export class ExpenseForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showNewSpenderField: false
    }
  }

  @action
  handleFormSubmit = (e) => {
    e.preventDefault();

    const { store, expenseForm } = this.props
    const { showNewSpenderField } = this.state
    const { id, amount, description, spender } = expenseForm

    if (showNewSpenderField) {
      if (store.spenders.indexOf(spender) === -1) {
        store.addSpender(spender)
      }
    }

    if(!amount || !description || !spender) {
      return window.alert('You need to enter all the values.')
    }

    id ? store.updateExpense(id, amount, description, spender)
       : store.addExpense(amount, description, spender)

     this.resetForm()
  }

  @action
  resetForm() {
    this.setState({ showNewSpenderField: false })
    this.props.expenseForm.hide()
  }

  update = (key) => action((e) => {
    e.preventDefault()
    this.props.expenseForm.update(key, e.target.value)
  })

  @action
  updateSpender =  (e) => {
    e.preventDefault()
    if (e.target.value === '_NEW_' ) {
      this.props.expenseForm.spender = ''
      this.setState({ showNewSpenderField: true }, () => this.newSpenderField.focus())
    } else {
      this.props.expenseForm.update('spender', e.target.value)
    }
  }

  render () {
    const { store, expenseForm } = this.props
    const { showNewSpenderField } = this.state

    return (
      <Modal active={ expenseForm.visible } close={ () => expenseForm.hide() } title='Add Expense'>
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

          { showNewSpenderField ? (
            <div style={{ display: 'flex' }}>
              <input
                value={ expenseForm.spender }
                onChange={ this.update('spender') }
                placeholder='Name'
                className="form-input"
                type="text"
                style={{ flex: '1' }}
                ref={el => this.newSpenderField = el}
              />
              <button
                className='btn'
                onClick={ () => this.setState({ showNewSpenderField: false }) }
              >
                <i className="icon icon-cross"></i>
              </button>
            </div>
          ) : (
            <select
              value={ expenseForm.spender }
              onChange={ this.updateSpender }
              className="form-select"
            >
              <option value="">- Select spender -</option>
              { store.spenders.map(spender => (
                <option key={spender} value={ spender }>{ spender }</option>
              ))}
              <option value="_NEW_">- Add new spender -</option>
            </select>
          )}

          <br /><br />

          <button className='btn btn-primary'>
            { expenseForm.id ? 'update expense' : 'add expense' }
          </button>
        </form>
      </Modal>
    )
  }
}
