import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import MyStamps from './pages/MyStamps'
import Card from './pages/Card'
import Auth from './pages/Auth'
import QR from './components/QR'
import s from './App.module.scss'
/*
import axios from 'axios'
*/

class App extends Component {
  resourceUrl = 'https://api.test.one2free.ru'

  componentDidMount() {
/*
    axios.post(this.resourceUrl + '/client/firstStart?DeviceId=' + 3463456 + '&DeviceType=3', {
    }).then((resp)=>{
      console.log(resp)
    })
*/
  }

  state = {
    companies: [
      {
        'id': 0,
        'productTitle': 'Кофе',
        'hostPointTitle': 'Original Magic Сafetery',
        'discountThreshold': 5,
        'discountCount': 3,
        'validUntil': '2020-09-02T20:44:40.041Z',
        'discription': 'Кофе в подарок за 6 штампов',
        'picPathVariations': {
          'active': '/resources/ico/active/coffee.png',
          'normal': '/resources/ico/normal/coffee.png',
          'outline': '/resources/ico/outline/coffee.png',
          'stamp': '/resources/ico/stamp/coffee.png',
        },
      },
      {
        'id': 1,
        'productTitle': 'Кофе',
        'hostPointTitle': 'OCoffee Ninja',
        'discountThreshold': 10,
        'discountCount': 10,
        'validUntil': '2021-09-02T20:44:40.041Z',
        'discription': 'Кофе в подарок за 10 штампов',
        'picPathVariations': {
          'active': '/resources/ico/active/coffee.png',
          'normal': '/resources/ico/normal/coffee.png',
          'outline': '/resources/ico/outline/coffee.png',
          'stamp': '/resources/ico/stamp/coffee.png',
        },
      },
      {
        'id': 2,
        'productTitle': 'Кофе',
        'hostPointTitle': 'Сhinese happiness',
        'discountThreshold': 3,
        'discountCount': 0,
        'validUntil': '2021-09-02T20:44:40.041Z',
        'discription': 'Кофе в подарок за 4 штампа',
        'picPathVariations': {
          'active': '/resources/ico/active/coffee.png',
          'normal': '/resources/ico/normal/coffee.png',
          'outline': '/resources/ico/outline/coffee.png',
          'stamp': '/resources/ico/stamp/coffee.png',
        },
      },
      {
        'id': 3,
        'productTitle': 'Кофе',
        'hostPointTitle': 'StarBucks',
        'discountThreshold': 5,
        'discountCount': 3,
        'validUntil': '2021-09-02T20:44:40.041Z',
        'discription': 'Кофе в подарок за 4 штампа',
        'picPathVariations': {
          'active': '/resources/ico/active/coffee.png',
          'normal': '/resources/ico/normal/coffee.png',
          'outline': '/resources/ico/outline/coffee.png',
          'stamp': '/resources/ico/stamp/coffee.png',
        },
      },
    ],
  }

  render() {
    return (
      <div className={s.app}>
        <BrowserRouter>
          <Route path='/' exact render={(props) => (
            <MyStamps {...props} data={this.state.companies}/>
          )}/>
          <Route path='/card/:id' render={(props) => (
            <Card {...props} data={this.state.companies}/>
          )}/>
          <Route path='/login' component={Auth}/>
          <QR/>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
