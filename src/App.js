import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import MyStamps from './pages/MyStamps'
import Card from './pages/Card'
import Auth from './pages/Auth'
import QR from './components/QR'
import s from './App.module.scss'
import Token from './pages/Token'
import { Redirect } from 'react-router'

class App extends Component {
  access_token = localStorage.getItem('access_token')
  refresh_token = localStorage.getItem('refresh_token')
  state = {
    access_token: this.access_token,
    refresh_token: this.refresh_token,
  }

  updateRefreshToken = ({ access_token, refresh_token }) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    this.setState(() => {
      return { access_token, refresh_token }
    })
  }

  render() {
    return (
      <div className={s.app}>
        {this.state.access_token ?
          <BrowserRouter>
            <Route path='/' exact render={(props) => (
              <MyStamps {...props} data={this.state.companies}/>
            )}/>
            <Route path='/card/:id' render={(props) => (
              <Card {...props} data={this.state.companies}/>
            )}/>

            <QR/>
          </BrowserRouter>
          :
          <BrowserRouter>
            <Route path='/login' component={Auth}/>
            <Route path='/getToken'
                   render={(props) => (
                     <Token {...props} updateRefreshToken={this.updateRefreshToken}/>
                   )}
            />
            <Redirect to={{
              pathname: '/login',
            }}/>
          </BrowserRouter>}
      </div>
    )
  }
}

export default App
