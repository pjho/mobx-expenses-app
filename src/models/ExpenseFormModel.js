import { observable, action } from "mobx";

class ExpenseFormModel {
  @observable visible = false
  @observable amount = ''
  @observable description = ''
  @observable spender = ''
  @observable id = ''

  @action
  update(key, val) {
    this[key] = val
  }

  @action
  clear() {
    this.id = ''
    this.amount = ''
    this.description = ''
    this.spender = ''
  }

  @action
  show() {
    this.visible = true
  }

  @action
  hide() {
    this.visible = false
    this.clear()
  }

  populate({ amount, description, spender, id }) {
      this.id = id
      this.amount = amount
      this.description = description
      this.spender = spender
      this.visible = true
  }
}

export const expenseForm = new ExpenseFormModel()
