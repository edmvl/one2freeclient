import React, { useEffect } from 'react'
import s from './MyStamps.module.scss'
import StampsCardFree from '../../components/StampsCardFree'
import StampsCardDisable from '../../components/StampsCardDisable'
import StampsCardActive from '../../components/StampsCardActive'
import getCouponState from '../../utils/couponState'

const MyStamps = ({ data = [], history, changeButton }) => {
  const onCardClick = (id) => {
    history.push('/card/' + id)
  }

  const getCompanyComponent = (coupon) => {
    switch (getCouponState(coupon)) {
      case 'expired':
        return (
          <StampsCardDisable company={coupon} key={coupon.id}/>
        )
      case 'enough' :
        return (
          <StampsCardFree company={coupon} key={coupon.id}/>
        )
      case 'insufficiently' :
        return (
          <StampsCardActive company={coupon} key={coupon.id}/>
        )
      default:
        return null
    }
  }
  useEffect(changeButton, [])
  return (
    <div className={s.container}>
      <header className={s.header}>Мои штампы</header>
      {
        data.map((coupon) =>
          <div className={s.card} key={coupon.id}
               onClick={() => onCardClick(coupon.id)}>{getCompanyComponent(coupon)}</div>)
      }
    </div>
  )
}

export default MyStamps
