import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import MyStamps from './pages/MyStamps'
import Card from './pages/Card'
import Auth from './pages/Auth'
import QR from './components/QR'
import s from './App.module.scss'
import Token from './pages/Token'
import Modal from './components/Modal'
import HostPoints from './pages/HostPoints'
import { Redirect } from 'react-router'
import axios from 'axios'
import qs from 'qs'
import HostPointPage from './pages/HostPointPage'

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
    companies: [],
    hostpoints: [],
    latitude: null,
    longitude: null,
    hostPointPage: 0,
    myStampsButtonColor: null,
    hostPointsButtonColor: null,
    qrtopposition: 1000,
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
          this.getClientCoupons().then(this.getHostPoints())
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
      const { data } = resp
      this.setState(() => {
        return {
          companies: data,
        }
      })
    }).catch((err) => {
      this.refreshTokenIfUnauth(err)
    })
  }

  getHostPoints = async () => {
    await axios.get(this.resourceUrl + '/client/hostPoints', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      params: {
        page: this.state.hostPointPage,
        size: 10,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
    }).then((resp) => {
      const { data } = resp
      const { items } = data
      if (items.length === 0) {
        return
      }
      const newhostpoints = this.state.hostpoints.concat(items)
      this.setState((state) => {
        return {
          hostPointPage: state.hostPointPage + 1,
          hostpoints: newhostpoints,
        }
      })
    }).catch((err) => {
      this.refreshTokenIfUnauth(err)
    })
  }

  showQRCode = () => {
    if (this.socket) {
      return false
    }
    this.setState(() => {
      return {
        qrtopposition: 0,
      }
    })
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
      qrtopposition: 1000,
    })
  }

  geoDetectSuccess = (position) => {
    const { latitude, longitude } = position.coords

    this.setState(() => {
      return {
        latitude,
        longitude,
      }
    })
  }

  routeChanged = (route) => {
    this.setState(() => {
      return {
        myStampsButtonColor: route === 'main' ? 'white' : 'gainsboro',
        hostPointsButtonColor: route === 'main' ? 'gainsboro' : 'white',
      }
    })
  }

  componentDidMount() {
    if (this.state.access_token) {
      this.getClientCoupons().then(this.getMyInfo).then(this.getHostPoints())
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoDetectSuccess)
    }
  }

  render() {
    const qrReadyClicked = () => {
      this.setState(() => {
        return {
          isQROpen: false,
        }
      })
      this.socket.close()
      this.socket = null
    }

    const getQrCodeElement = (src) => {
      return <Modal show={true}>
        <div style={{ top: this.state.qrtopposition }} className={s.qrcontainer}>
          <div className={s.qrwrapper}>
            <div className={s.qrdescription}>Покажи QR-код чтобы поставить или списать штампы</div>
            <img className={s.qrImage}
                 src={src}
                 alt="QR"
            />
            <div>ID {this.state.identifier}</div>
            <button className={s.qrbutton} onClick={() => qrReadyClicked()}>Готово</button>
          </div>
        </div>
      </Modal>
    }

    const getMainRoutes = () => {
      const { companies, hostpoints } = this.state
      return <>
        <Route path='/' exact render={(props) => (
          <MyStamps
            {...props}
            data={companies}
            changeButton={() => this.routeChanged('main')}
          />
        )}/>
        <Route path='/card/:id' render={(props) => (
          <Card {...props} data={companies}/>
        )}/>
        <Route path='/hostpoints' render={(props) => (
          <HostPoints
            {...props}
            data={hostpoints}
            onNextPage={() => this.getHostPoints()}
            changeButton={() => this.routeChanged('hostpoints')}/>
        )}/>
        <Route path='/hostpoint/:id' render={(props) => (
          <HostPointPage {...props} data={hostpoints}/>
        )}/>
      </>
    }

    const getAuthoredRoutes = () => {
      return <BrowserRouter>
        {
          getQrCodeElement('data:image/png;base64,' + localStorage.getItem('qrPicData'))
        }
        <div className={s.buttonswrapper}>
          <div className={s.buttonscontainer}>
            <Link to={'/'}>
              <button style={{ backgroundColor: this.state.myStampsButtonColor }} type="button">Мои штампы</button>
            </Link>
            <Link to={'/hostpoints'}>
              <button style={{ backgroundColor: this.state.hostPointsButtonColor }} type="button">Все заведения</button>
            </Link>
          </div>
        </div>
        {
          getMainRoutes()
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
