import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import MyStamps from './pages/MyStamps'
import Card from './pages/Card'
import Auth from './pages/Auth'
import QR from './components/QR'
import s from './App.module.scss'
import Token from './pages/Token'
import { Redirect } from 'react-router'
import axios from 'axios'
import qs from 'qs'

class App extends Component {
  resourceUrl = 'https://api.test.one2free.ru'
  state = {
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
  }

  updateRefreshToken = ({ access_token, refresh_token }, callback) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    this.setState(() => {
      return { access_token, refresh_token }
    })
    if (callback) {
      callback()
    }
  }

  updateCoupons = () => {
    axios.get(this.resourceUrl + '/coupons/client', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    }).then((resp) => {
      console.log(resp)
    }).catch((err) => {
      const { response } = err
      const { statusText } = response

      if (statusText === 'Unauthorized') {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          url: this.resourceUrl + '/connect/token',
          data: qs.stringify({
            grant_type: 'refresh_token',
            client_id: 'one2free',
            refresh_token: localStorage.getItem('refresh_token'),
          }),
        }
        axios(options).then((resp) => {
          const { data } = resp
          const { access_token, refresh_token } = data
          this.updateRefreshToken(access_token, refresh_token)
        }).catch((err) => {
          this.history.push('/login')
          console.log(err)
        })
      }
    })
  }

  componentDidMount() {
    if (this.state.access_token) {
      this.updateCoupons()
    }
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
                     <Token {...props} updateRefreshToken={this.updateRefreshToken} updateCoupons={this.updateCoupons}/>
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
