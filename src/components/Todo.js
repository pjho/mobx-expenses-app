import React, { Component } from "react";
import { observer } from "mobx-react";

const Todo = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
      id={todo.id}
    />
    <label htmlFor={todo.id}>
      {todo.title}
    </label>
  </li>
));

export default Todo;
