import React from 'react'
import s from './StampsCardFree.module.scss'
import getPictureUrl from '../../utils/getPictureUrl'

const StampsCardFree = ({ company }) => {
  const picPathVariations = company.picPathVariations

  return (
    <>
      <div className={s.rectcontainer}>
        <div className={s.rectangleleft}>
          <div className={s.main}>{company.productTitle}</div>
          <div className={s.imgcontainer}>
            <img className={s.icon} src={getPictureUrl('outline', picPathVariations)} alt={company.productTitle}/>
          </div>
        </div>
        <div className={s.hr}/>
        <div className={s.rectangleright}>
          <div className={s.companyname}>Original Magic Сafeteriess</div>
          <div className={s.stampcount}>Бесплатно</div>
        </div>
      </div>
    </>)
}
export default StampsCardFree
