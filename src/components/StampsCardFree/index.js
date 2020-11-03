import React from 'react'
import s from './StampsCardFree.module.scss'
import getPictureUrl from '../../utils/getPictureUrl'
import placeholder from '../../img/ico/placeholder.png'

const StampsCardFree = ({ company }) => {
  const picPathVariations = company.picPathVariations
  const picUrl = getPictureUrl('active', picPathVariations)
  return (
    <>
      <div className={s.rectcontainer}>
        <div className={s.rectangleleft}>
          <div className={s.main}>{company.productTitle}</div>
          <div className={s.imgcontainer}>
            <img
              className={s.icon}
              src={picUrl}
              alt={company.productTitle}
              onError={(e) => {
                e.target.src = placeholder
              }}
            />
          </div>
        </div>
        <div className={s.hr}/>
        <div className={s.rectangleright}>
          <div className={s.companyname}>{company.hostPointTitle}</div>
          <div className={s.stampcount}>Бесплатно</div>
        </div>
      </div>
    </>)
}
export default StampsCardFree
