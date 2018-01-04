import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import TodoModel from "./models/TodoModel";

const store = new TodoListModel();


const people = ['Andy', 'Dave']

const expenses = [
  { id: Date.now(), amount: 22.5, description: 'Petrol', person: 'Andy'},
  { id: Date.now() + 4, amount: 12.5, description: 'Lollies', person: 'Dave'}
]

const App = () => (
  <div className='container'>
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Person</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {
        expenses.map(exp => (
          <tr key={exp.id}>
            <td>${ exp.amount.toFixed(2) }</td>
            <td>{ exp.description }</td>
            <td>{ exp.person }</td>
            <td>edit | delete</td>
          </tr>
        ))
      }
      </tbody>
    </table>

      <br/> <br/> <br/>

      <h4>Add Expense</h4>
      <table className='table'>
        <tbody>
          <tr>
            <td><input type="number" placeholder='Amount' className="form-input" /></td>
            <td><input type="text" placeholder='Description' className="form-input" /></td>
            <td>
              <select className="form-select">
                <option value="">- spender -</option>
                {
                  people.map(p => (
                    <option key={p} value={ p }>{ p }</option>
                  ))
                }
              </select>
            </td>
            <td>
              <button className='btn btn-primary'>add expense</button>
            </td>
          </tr>
        </tbody>
      </table>

      <br/> <br/> <br/>

      <h4>Add Person</h4>
      <input type="text" placeholder='Name' className="form-input" />

  </div>
)










// <TodoList store={store} />

render(
  <div>
    <DevTools />
    <App />
  </div>,
  document.getElementById("root")
);

store.addTodo("Get Coffee");
// store.addTodo("Write simpler code");
// store.todos[0].finished = true;

// setTimeout(() => {
  // store.addTodo("Get a cookie as well");
// }, 2000);

// playing around in the console
window.store = store;
