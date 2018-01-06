import React, { Component } from "react";
import { inject } from 'mobx-react'


export const Expense = inject('store')(({ expense: { amount, description, spender, id }, store }) => (
  <tr>
    <td>${ amount.toFixed(2) }</td>
    <td>{ description }</td>
    <td>{ spender }</td>
    <td className='text-right'>
      <div className="btn-group">
        <button className='btn btn-sm btn-primary' onClick={ () => console.log(id) }>
        edit
        </button>
        <button className='btn btn-sm btn-error' onClick={ () => store.deleteExpense(id) }>
          delete
        </button>
      </div>
    </td>
  </tr>
))
