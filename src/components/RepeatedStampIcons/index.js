import React from 'react'
import getPictureUrl from '../../utils/getPictureUrl'

const RepeatedStampIcons = ({ company, style }) => {
  const {picPathVariations} = company

  const getRepeatedIcons = (count, rest, s) => {
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
      {getRepeatedIcons(company.discountCount, rest, style)}
    </>)
}
export default RepeatedStampIcons
