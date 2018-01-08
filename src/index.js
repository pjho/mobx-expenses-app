import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";

import { ExpenseList } from './components/ExpenseList'
import { ExpenseForm } from './components/ExpenseForm'
import { TotalsReport } from './components/TotalsReport'

import { store } from './models/ExpenseListModel'
import { expenseForm } from './models/ExpenseFormModel'

const stores = { store, expenseForm }

const App = () => (
  <Provider { ...stores }>
    <div className='container' style={{ padding:'0 20px 20px' }}>
      <header className="bg-dark">
        <h1>Expense Tracker</h1>
      </header>
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

