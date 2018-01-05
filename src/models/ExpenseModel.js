import { observable } from "mobx";

export class ExpenseModel {
  id = Date.now()
  @observable amount = 0
  @observable description = ''
  @observable spender = ''

  constructor(amount, description, spender) {
    this.amount = +amount;
    this.description = description;
    this.spender = spender;
  }
}
