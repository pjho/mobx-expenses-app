import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import { ExpenseList } from './components/ExpenseList'
import { ExpenseForm } from './components/ExpenseForm'
import { SpenderForm } from './components/SpenderForm'

import { ExpenseListModel } from './models/ExpenseListModel'


const spenders = ['Andy', 'Dave']

const store = new ExpenseListModel();


const App = () => (
  <div className='container' style={{ padding:'20px' }}>
    <div className="columns">

      <div className="column col-9">
        <ExpenseList expenses={ store.expenses } />
      </div>

      <div className="column col-3">
        <ExpenseForm spenders={ spenders } />
        <br/> <br/> <br/>
        <SpenderForm />
      </div>

    </div>
  </div>
)



render(
  <div>
    <DevTools />
    <App />
  </div>,
  document.getElementById("root")
);

store.addExpense(22.5, 'Petrol', 'Andy')
store.addExpense(7.5, 'Lollies', 'Dave')

window.store = store;
