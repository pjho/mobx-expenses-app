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
          <button className='btn btn-sm' title='edit expense' onClick={ () => expenseForm.populate(expense) }>
            <i className="icon icon-edit"></i>
          </button>
          <button
            className='btn btn-sm'
            title='delete expense'
            onClick={ () => confirmAndDelete(description, () => store.deleteExpense(expense)) }
          >
            <i className="icon icon-delete"></i>
          </button>
        </div>
      </td>
    </tr>
  )}
))
