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
import Model from './components/Modal'

class App extends Component {
  resourceUrl = 'https://api.test.one2free.ru'
  socket = null
  state = {
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
    qrPicData: localStorage.getItem('qrPicData'),
    identifier: localStorage.getItem('identifier'),
    username: localStorage.getItem('username'),
    socketToken: localStorage.getItem('socketToken'),
    isQROpen: false,
  }

  getMyInfo = async () => {
    if (localStorage.getItem('qrPicData')) {
      return null
    }
    axios.get(this.resourceUrl + '/client/myInfo', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    }).then((resp) => {
      const { data } = resp
      const { qrPicData, identifier, username, socketToken } = data
      localStorage.setItem('qrPicData', qrPicData)
      localStorage.setItem('identifier', identifier)
      localStorage.setItem('username', username)
      localStorage.setItem('socketToken', socketToken)
    })
  }

  updateTokens = ({ access_token, refresh_token }, callback) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    this.setState(() => {
      return { access_token, refresh_token }
    }, () => {
      if (callback) {
        callback()
      }
    })
  }

  refreshTokenIfUnauth = (err) => {
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
      if (access_token && refresh_token) {
        this.updateTokens({ access_token, refresh_token }, () => {
          this.getClientCoupons().then(r => {
          })
        })
      }
    }).catch((err) => {
      this.updateTokens({ access_token: null, refresh_token: null })
    })
  }

  getClientCoupons = async () => {
    await axios.get(this.resourceUrl + '/coupons/client', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    }).then((resp) => {
      console.log(resp)
    }).catch((err) => {
      this.refreshTokenIfUnauth(err)
    })
  }

  componentDidMount() {
    if (this.state.access_token) {
      this.getClientCoupons().then(this.getMyInfo)
    }
  }

  showQRCode = () => {
    if (this.socket) {
      return false
    }
    const socketToken = localStorage.getItem('socketToken')
    this.socket = new WebSocket(`wss://api.test.one2free.ru/hub/clients?userGuid=${socketToken}`)
    this.socket.onopen = () => {
      this.setState({
        isQROpen: true,
      })
    }
    this.socket.onmessage = (event) => {
      const { data } = event
      const { soldProductPositions, productId, method } = JSON.parse(data)
      if (method === 'stampAction') {
        this.socket.close()
        this.socket = null
        console.log(`поставлено ${soldProductPositions} штампов по продукту ${productId}`)
        this.hideQRCode()
      }
    }
    this.socket.onclose = (event) => {
      this.socket = null
      if (!event.wasClean) {
        alert('Обрыв соединения')
      }
      this.hideQRCode()
    }
  }

  hideQRCode = () => {
    this.setState({
      isQROpen: false,
    })
  }

  render() {
    const getQrCodeElement = (src) => {
      return <Model show={true}>
        <img className={s.qrImage}
             src={src}
             alt="QR"
        />
      </Model>
    }

    const getCompaniesRoutes = () => {
      const companies = this.state.companies;
      return <>
        <Route path='/' exact render={(props) => (
          <MyStamps {...props} data={companies}/>
        )}/>
        <Route path='/card/:id' render={(props) => (
          <Card {...props} data={companies}/>
        )}/>
      </>
    }

    const getAuthoredRoutes = () => {
      return <BrowserRouter>
        {
          this.state.isQROpen ?
            getQrCodeElement('data:image/png;base64,' + localStorage.getItem('qrPicData'))
            :
            getCompaniesRoutes()
        }
        <QR showQRCode={this.showQRCode}/>
      </BrowserRouter>
    }

    const getLoginRoutes = () => {
      return <BrowserRouter>
        <Route path='/login' component={Auth}/>
        <Route path='/getToken'
               render={(props) => (
                 <Token {...props} updateRefreshToken={this.updateTokens} updateCoupons={this.getClientCoupons}/>
               )}
        />
        <Redirect to={{
          pathname: '/login',
        }}/>
      </BrowserRouter>
    }

    return (
      <div className={s.app}>
        {
          this.state.access_token ? getAuthoredRoutes() : getLoginRoutes()
        }
      </div>
    )
  }
}

export default App
