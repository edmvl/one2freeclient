import React from 'react'
import s from './HostPoint.module.scss'
import getPictureUrl from '../../utils/getPictureUrl'

const HostPoint = ({ hostPoint }) => {
  const { logoUrl } = hostPoint

  return (
    <>
      <div className={s.rectcontainer}>
        <div className={s.rectangleleft}>
          <div className={s.imgcontainer}>
            <img className={s.icon} src={getPictureUrl('normal', { 'normal': logoUrl })} alt={hostPoint.productTitle}/>
          </div>
        </div>
        <div className={s.rectangleright}>
          <div className={s.companyname}>
            <div>{hostPoint.title}</div>
            <div>{hostPoint.productNames}</div>
          </div>
          <div className={s.address}>{hostPoint.address}</div>
        </div>
      </div>
    </>)
}
export default HostPoint
