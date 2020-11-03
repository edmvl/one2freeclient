import React from 'react'
import s from './StampsCardActive.module.scss'
import getPictureUrl from '../../utils/getPictureUrl'
import RepeatedStampIcons from '../RepeatedStampIcons'
import placeholder from '../../img/ico/placeholder.png'

const StampsCardActive = ({ company }) => {
  const picPathVariations = company.picPathVariations
  const rest = company.discountThreshold - company.discountCount
  const picUrl = getPictureUrl('normal', picPathVariations)

  return (
    <>
      <div className={s.rectcontainer}>
        <div className={s.rectangleleft}>
          <div className={s.main}>{company.productTitle}</div>
          <div className={s.imgcontainer}>
            <img
              className={s.mainicon}
              src={picUrl}
              alt={company.productTitle}
              onError={(e) => {
                e.target.src = placeholder
              }}/>
          </div>
        </div>
        <div className={s.hr}/>
        <div className={s.rectangleright}>
          <div className={s.companyname}>{company.hostPointTitle}
            <div className={s.rest}>{rest}</div>
          </div>
          <div className={s.stampswrapper}>
            <RepeatedStampIcons company={company} style={s}/>
          </div>
        </div>
      </div>
    </>)
}
export default StampsCardActive
