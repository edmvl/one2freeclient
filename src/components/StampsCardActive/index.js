import React from 'react'
import s from './StampsCardActive.module.scss'

const StampsCardActive = ({ company }) => {
  const resourceUrls = 'https://api.test.one2free.ru'
  const picPathVariations = company.picPathVariations
  const getRepeatedIcons = (count, rest) => {
    const stampedIcons = Array(count).fill(resourceUrls + picPathVariations.stamp)
    const restIcons = Array(rest).fill(resourceUrls + picPathVariations.outline)
    return stampedIcons.map((icon) =>
      <div key={Math.random()*16|0} className={s.iconwrapper}>
        <img src={icon} className={s.icon} alt={company.productTitle}/>
      </div>,
    ).concat(restIcons.map((icon) =>
      <div key={Math.random()*16|0} className={s.iconwrapper}>
        <img src={icon} className={s.disable} alt={company.productTitle}/>
      </div>,
    ))
  }
  let rest = company.discountThreshold - company.discountCount
  return (
    <>
      <div className={s.rectcontainer}>
        <div className={s.rectangleleft}>
          <div className={s.main}>{company.productTitle}</div>
          <div className={s.imgcontainer}>
            <img className={s.icon} src={resourceUrls + picPathVariations.normal} alt={company.productTitle}/>
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
