import React, { Component, Fragment } from "react";

export const Modal = ({ active, close, title, children }) => (
  <div className={ `modal ${ active ? 'active' : '' }` } id="modal-id">
    <a href="#close" className="modal-overlay" aria-label="Close" onClick={ close } ></a>

    <div className="modal-container">

      <div className="modal-header">
        <button onClick={ close } href="#close" className="btn btn-clear float-right" aria-label="Close"></button>
        <div className="modal-title h5">{ title }</div>
      </div>

      <div className="modal-body">
        <div className="content">
          { children }
        </div>
      </div>

    </div>
  </div>
)
