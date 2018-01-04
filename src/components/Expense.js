import React, { Component } from "react";

export const Expense = ({ expense: { amount, description, spender } }) => (
  <tr>
    <td>${ amount.toFixed(2) }</td>
    <td>{ description }</td>
    <td>{ spender }</td>
    <td>edit | delete</td>
  </tr>
)
