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
        this.expenses = expenses.map(exp => new ExpenseModel({ ...exp }))
      }
    }

    autorun(() => {
      localStorage.setItem('mobx-expense-tracker', JSON.stringify({
        expenses: this.expenses,
        spenders: this.spenders,
      }))
    })

  }

  @computed
  get totalSpend() {
    return this.expenses.reduce((total, ex) => (total + ex.amount), 0)
  }

  @computed
  get totalSpendPerSpender() {
    return this.totalSpend / this.spenderCount
  }

  @computed
  get spenderCount() {
    return this.spenders.length
  }

  totalSpendForSpender(spender) {
    return this.expenses
      .filter(ex => ex.spender === spender)
      .reduce((total, ex) => (total + ex.amount), 0)
  }

  expenseCountForSpender(spender) {
    return this.expenses.filter(exp => exp.spender === spender).length
  }

  @action
  addExpense(expense) {
    this.expenses.push(new ExpenseModel(expense));
  }

  @action
  updateExpense({ id, amount, description, spender }) {
    let idx = this.expenses.findIndex(exp => exp.id === id)
    if (idx === -1) {
      throw new Error('Expense does not exist.')
    }
    this.expenses[idx].amount = +amount
    this.expenses[idx].description = description
    this.expenses[idx].spender = spender
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
