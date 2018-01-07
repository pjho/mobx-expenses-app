import { observable } from "mobx";

export class ExpenseModel {
  id
  @observable amount
  @observable description
  @observable spender

  constructor({ amount, description, spender, id }) {
    this.id = id ? id : Date.now()
    this.amount = +amount
    this.description = description
    this.spender = spender
  }
}
