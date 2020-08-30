import React, { Component } from 'react'
import s from './MyStamps.module.scss'
import StampsCardFree from '../../components/StampsCardFree'
import StampsCardDisable from '../../components/StampsCardDisable'
import StampsCardActive from '../../components/StampsCardActive'

class MyStamps extends Component {
  state = {
    companies: [
      {
        'id': 0,
        'productTitle': 'Кофе',
        'hostPointTitle': 'Original Magic Сafetery',
        'discountThreshold': 10000,
        'discountCount': 3,
        'validUntil': '2020-09-02T20:44:40.041Z',
        'discription': 'string',
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
        'discription': 'string',
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
        'discountThreshold': 4,
        'discountCount': 3,
        'validUntil': '2021-09-02T20:44:40.041Z',
        'discription': 'string',
        'picPathVariations': {
          'active': '/resources/ico/active/coffee.png',
          'normal': '/resources/ico/normal/coffee.png',
          'outline': '/resources/ico/outline/coffee.png',
          'stamp': '/resources/ico/stamp/coffee.png',
        },
      },
    ],
  }

  onCardClick = (id) => {
    this.props.history.push('/card/' + id)
  }

  render() {
    const getCompanyComponent = (coupon) => {
      if (new Date(coupon.validUntil) < new Date()) return (
        <StampsCardDisable company={coupon} key={coupon.id}/>
      )
      if (coupon.discountCount >= coupon.discountThreshold) return (
        <StampsCardFree company={coupon} key={coupon.id}/>
      )
      if (coupon.discountCount <= coupon.discountThreshold) return (
        <StampsCardActive company={coupon} key={coupon.id}/>
      )
    }
    return (
      <div className={s.container}>
        <header className={s.header}>Мои штампы</header>
        <p className={s.description}>Все заведения в которых можно поставить штамп</p>
        {
          this.state.companies.map((coupon) =>
            <div key={coupon.id} onClick={() => this.onCardClick(coupon.id)}>{getCompanyComponent(coupon)}</div>)
        }
      </div>
    )
  }
}

export default MyStamps
