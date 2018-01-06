import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";

import { ExpenseList } from './components/ExpenseList'
import { ExpenseForm } from './components/ExpenseForm'
import { TotalsReport } from './components/TotalsReport'

import { ExpenseListModel } from './models/ExpenseListModel'
import { ExpenseFormModel } from './models/ExpenseFormModel'



const store = new ExpenseListModel();
const expenseForm = new ExpenseFormModel();

const stores = { store, expenseForm }

const App = () => (
  <Provider { ...stores }>
    <div className='container' style={{ padding:'20px' }}>
      <div className="columns">
        <div className="column col-9">
          <ExpenseList />
        </div>
        <div className="column col-3">
          <TotalsReport />
        </div>
      </div>
      <ExpenseForm />
    </div>
  </Provider>
)

render(
  <div>
    <DevTools />
    <App />
  </div>,
  document.getElementById("root")
);

store.addSpender('Dave')
store.addSpender('Andy')
store.addExpense(22.5, 'Petrol', 'Andy')
store.addExpense(7.5, 'Lollies', 'Dave')
