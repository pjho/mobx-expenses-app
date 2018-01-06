import { observable } from "mobx";

export class ExpenseFormModel {
  @observable amount = ''
  @observable description = ''
  @observable spender = ''
  @observable id = ''

  update(key, val) {
    this[key] = val
  }

  clear() {
    this.id = ''
    this.amount = ''
    this.description = ''
    this.spender = ''
  }

  populate({ amount, description, spender, id }) {
      this.id = id
      this.amount = amount
      this.description = description
      this.spender = spender
  }
}
