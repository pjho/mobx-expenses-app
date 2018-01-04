import React, { Fragment } from "react";

export const ExpenseForm = ({ spenders }) => (
  <Fragment>
    <h4>Add Expense</h4>
    <input type="number" placeholder='Amount' className="form-input" /><br />
    <input type="text" placeholder='Description' className="form-input" /><br />
    <select className="form-select">
      <option value="">- spender -</option>
      {
        spenders.map(p => (
          <option key={p} value={ p }>{ p }</option>
        ))
      }
    </select><br /><br />
    <button className='btn btn-primary'>add expense</button>
  </Fragment>
)
