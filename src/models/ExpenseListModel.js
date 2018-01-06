import { observable, computed, action } from "mobx";

import { ExpenseModel } from "./ExpenseModel";

export class ExpenseListModel {
  @observable expenses = [];
  @observable spenders = [];

  // @computed
  totalSpendForUser(spender) {
    return this.expenses
      .filter(ex => ex.spender === spender)
      .reduce((total, ex) => (total + ex.amount), 0)
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
  deleteExpense(id) {
    const idx = this.expenses.findIndex(exp => exp.id === id)
    if (idx > -1) {
      this.expenses.splice(idx, 1)
    }
  }

  @action
  addSpender(name) {
    this.spenders = this.spenders.concat([name]).sort()
  }

  @action
  deleteSpender(name) {
    // this.spenders.remove(name)
    const idx = this.spenders.indexOf(name)
    if (idx > -1) {
      this.spenders.splice(idx, 1)
    }
  }
}
