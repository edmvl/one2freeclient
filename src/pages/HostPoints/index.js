import React from 'react'
import s from './HostPoints.module.scss'
import StampsCardActive from '../../components/StampsCardActive'
import getCouponState from '../../utils/couponState'

const Organisations = ({ data = [], history }) => {
  const onCardClick = (id) => {
    history.push('/card/' + id)
  }

  const getCompanyComponent = (coupon) => {
    switch (getCouponState(coupon)) {
      case 'insufficiently' :
        return (
          <StampsCardActive company={coupon} key={coupon.id}/>
        )
      default:
        return null
    }
  }
  return (
    <div className={s.container}>
      <header className={s.header}>Все заведения</header>
      <p className={s.description}>Все заведения в которых можно поставить штамп</p>
      {
        data.map((coupon, id) =>
          <div key={id}>{coupon.title}</div>)
      }
    </div>
  )
}

export default Organisations
