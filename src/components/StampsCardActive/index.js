import React from 'react'
import s from './StampsCardActive.module.scss'
import getPictureUrl from '../../utils/getPictureUrl'

const StampsCardActive = ({ company }) => {
  const picPathVariations = company.picPathVariations

  const getRepeatedIcons = (count, rest) => {
    const stampedIcons = Array(count).fill(getPictureUrl('stamp', picPathVariations))
    const restIcons = Array(rest).fill(getPictureUrl('outline', picPathVariations))
    let index = 1
    return stampedIcons.map((icon) => {
        index++
        return <div key={index} className={s.iconwrapper}>
          <img src={icon} className={s.icon} alt={company.productTitle}/>
        </div>
      },
    ).concat(restIcons.map((icon) => {
        index++
        return <div key={index} className={s.iconwrapper}>
          <img src={icon} className={s.disable} alt={company.productTitle}/>
        </div>
      },
    ))
  }

  let rest = company.discountThreshold - company.discountCount
  return (
    <>
      <div className={s.rectcontainer}>
        <div className={s.rectangleleft}>
          <div className={s.main}>{company.productTitle}</div>
          <div className={s.imgcontainer}>
            <img className={s.icon} src={getPictureUrl('normal', picPathVariations)} alt={company.productTitle}/>
          </div>
        </div>
        <div className={s.hr}/>
        <div className={s.rectangleright}>
          <div className={s.companyname}>{company.hostPointTitle}
            <div className={s.rest}>{rest}</div>
          </div>
          <div className={s.stampswrapper}>
            {getRepeatedIcons(company.discountCount, rest)}
          </div>
        </div>
      </div>
    </>)
}
export default StampsCardActive
