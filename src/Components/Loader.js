import React, { Component } from 'react'
import Spinner from './images/Spinner.gif'
import "./Styles/Loader.css"

export default class Loader extends Component {
  render() {
    
    return (
      <div id="loader">
        <img src={Spinner} alt="loading..." />
      </div>
    )
  }
}
