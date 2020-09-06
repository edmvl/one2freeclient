import React from 'react'
import s from './Card.module.scss'
import formattedDate from '../../utils/date'
import getCouponState from '../../utils/couponState'

const Card = ({ data, match }) => {
  const { params } = match
  const { id } = params
  const coupon = data.find((item) => {
    return item.id === Number(id)
  })
  let rest = coupon.discountThreshold - coupon.discountCount
  console.log(coupon)
  const getCouponCardHeader = (coupon) => {
    switch (getCouponState(coupon)) {
      case 'expired':
        return null
      case 'enough' :
        return coupon.productTitle + ' бесплатно'
      case 'insufficiently' :
        return 'Осталось собрать'
      default:
        return null
    }
  }

  return (
    <div className={s.container}>
      <div className={s.header}>{coupon.hostPointTitle}</div>
      <div className={s.description}>{coupon.discription}</div>
      <div className={s.validUntil}>{'до ' + formattedDate(new Date(coupon.validUntil))}</div>
      <div className={s.stamps}>
        <div>{getCouponCardHeader(coupon)}</div>
        <div className={s.hrtop}/>
        <div className={s.count}>{rest}</div>
        <div className={s.hrtop}/>
        <div className={s.hrbottom}/>
      </div>
    </div>
  )
}
export default Card
