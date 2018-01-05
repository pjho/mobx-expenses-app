import React, { Component, Fragment } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import { Expense } from './Expense'

@inject('store')
@observer
export class TotalsReport extends Component {
  render() {
    return (
      <div>
          { this.props.store.spenders.map(spender => (
              <span key={ spender } style={{marginRight: '10px'}}>
                <strong>{ spender }: </strong>
                ${ this.props.store.totalSpendForUser(spender) }
              </span>
          ))}
      </div>

    )
  }
}
