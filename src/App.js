import React, { Component } from 'react'
import Navbar from './component/Navbar'
import Users from './component/Users'
import AddUser from './component/AddUser'

import './App.css'

export default class App extends Component {
  render () {
    return (
      <div>
        <div className='container'>

          <Navbar /><hr />
          <AddUser />
          <Users />

        </div>
      </div>
    )
  }
}
