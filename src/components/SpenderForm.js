import React, { Component } from "react"
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'




// @observer
// class TodoList extends React.Component {
//   @observable newTodoTitle = "";
// }


@inject('store')
@observer
export class SpenderForm extends Component {
  @observable nameInputValue = '';

  @action
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.nameInputValue === '') {
      return window.alert('You need to enter a name')
    }
    this.props.store.addSpender(this.nameInputValue)
    this.nameInputValue = ''
  }

  @action
  handleNameInputChange = e => {
    this.nameInputValue = e.target.value
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <h4>Add Spender</h4>
        <input
          type="text"
          placeholder='Name'
          className="form-input"
          value={ this.nameInputValue }
          onChange={ this.handleNameInputChange }
        />
        <br/>
        <button className='btn btn-primary'>
          add spender
        </button>
      </form>
    )
  }
}
