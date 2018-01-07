import React, { Component } from "react";
import { inject, observer } from 'mobx-react'


const confirmAndDelete = (description, deleteCB) => {
  if(confirm(`Do you want to delete the expense ${ description }?`)) {
    deleteCB()
  }
}

export const Expense = inject('store', 'expenseForm')(observer(({ expense, store, expenseForm }) => {
  const { amount, description, spender, id } = expense
  return (
    <tr>
      <td>${ amount.toFixed(2) }</td>
      <td>{ description }</td>
      <td>{ spender }</td>
      <td className='text-right'>
        <div className="btn-group">
          <button className='btn btn-sm btn-primary' onClick={ () => expenseForm.populate(expense) }>
            edit
          </button>
          <button
            className='btn btn-sm btn-error'
            onClick={ () => confirmAndDelete(description, () => store.deleteExpense(expense)) }
          >
            delete
          </button>
        </div>
      </td>
    </tr>
  )}
))
