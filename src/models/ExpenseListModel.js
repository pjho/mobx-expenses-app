import { observable, computed, action, autorun } from "mobx";

import { ExpenseModel } from "./ExpenseModel";

class ExpenseListModel {
  @observable expenses = [];
  @observable spenders = [];

  constructor() {
    const storedVals = localStorage.getItem('mobx-expense-tracker')
    if (storedVals) {
      const { spenders, expenses } = JSON.parse(storedVals)

      if (spenders) {
        this.spenders = spenders
      }
      if (expenses) {
        this.expenses = expenses.map(exp => new ExpenseModel(exp.amount, exp.description, exp.spender))
      }
    }

    autorun(() => {
      localStorage.setItem('mobx-expense-tracker', JSON.stringify({
        expenses: this.expenses,
        spenders: this.spenders,
      }))
    })

  }

  // @computed
  totalSpendForSpender(spender) {
    return this.expenses
      .filter(ex => ex.spender === spender)
      .reduce((total, ex) => (total + ex.amount), 0)
  }

  expenseCountForSpender(spender) {
    return this.expenses.filter(exp => exp.spender === spender).length
  }

  @action
  addExpense(amount, description, spender) {
    this.expenses.push(new ExpenseModel(amount, description, spender));
  }

  @action
  updateExpense(id, amount, description, spender) {
    let idx = this.expenses.findIndex(exp => exp.id === id)
    let expense = this.expenses.find(exp => exp.id === id)
    expense.amount = +amount
    expense.description = description
    expense.spender = spender
    if (expense) {
      this.expenses.splice(idx, 1, expense);
    }
  }

  @action
  deleteExpense({ id, spender }) {
    const idx = this.expenses.findIndex(exp => exp.id === id)

    if (idx > -1) {
      this.expenses.splice(idx, 1)
    }

    if (this.expenseCountForSpender(spender) === 0) {
      this.deleteSpender(spender)
    }
  }

  @action
  addSpender(name) {
    if (this.spenders.indexOf(name) === -1) {
      this.spenders = this.spenders.concat([name]).sort()
    }
  }

  @action
  deleteSpender(name) {
    this.spenders.remove(name)
  }
}

export const store = new ExpenseListModel()

