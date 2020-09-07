import React from 'react'
import s from './Card.module.scss'
import formattedDate from '../../utils/date'
import getCouponState from '../../utils/couponState'
import RepeatedStampIcons from '../../components/RepeatedStampIcons'
import getPictureUrl from '../../utils/getPictureUrl'
import free from '../../img/logo_free.svg'

const Card = ({ data, match }) => {
  const { params } = match
  const { id } = params
  const coupon = data.find((item) => {
    return item.id === Number(id)
  })
  const { picPathVariations } = coupon
  let rest = coupon.discountThreshold - coupon.discountCount
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
        {rest ? <div className={s.count}>{rest}</div> :
          <div className={s.iconconstainer}><img className={s.icon} src={getPictureUrl('normal', picPathVariations)}
                                                 alt={coupon.productTitle}/></div>}
        <div className={s.hrtop}/>
        {rest ? <RepeatedStampIcons company={coupon} style={s}/> :
          <img className={s.free} src={free} alt="free"/>}
        <div className={s.hrbottom}/>
      </div>
    </div>
  )
}
export default Card
