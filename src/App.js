import React, { Component } from 'react'

import './App.css'
import Main from './Main'
import SignIn from './SignIn'
import base from './base';

class App extends Component {
  constructor() {
    super()

    const user = JSON.parse(localStorage.getItem('user'))

    this.state = {
      user: user || {},
    }
  }

  componentDidMount(){
    base.syncState(`shoppingList`, {
      context: this,
      state: 'items',
      asArray: true
    });
  }


  addItem(newItem){
    this.setState({
      items: this.state.items.concat([newItem]) //updates Firebase and the local state
    });
  }

  handleAuth = (user) => {
    this.setState({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }

  signedIn = () => {
    return this.state.user.uid
  }

  signOut = () => {
    this.setState({ user: {} })
    localStorage.removeItem('user')
  }

  render() {
    return (
      <div className="App">
        {
          this.signedIn()
            ? <Main
                user={this.state.user}
                signOut={this.signOut}
              />
            : <SignIn handleAuth={this.handleAuth} />
        }
      </div>
    )
  }
}

export default App