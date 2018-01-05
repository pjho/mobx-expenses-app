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
  addSpender(name) {
    this.spenders = this.spenders.concat([name]).sort()
  }
}
