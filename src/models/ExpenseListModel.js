import { observable, computed, action } from "mobx";

import { ExpenseModel } from "./ExpenseModel";

export class ExpenseListModel {
  @observable expenses = [];

  // @computed
  // get unfinishedTodoCount() {
  //   return this.todos.filter(todo => !todo.finished).length;
  // }

  @action
  addExpense(amount, description, spender) {
    this.expenses.push(new ExpenseModel(amount, description, spender));
    console.log(this.expenses.length)
  }
}
