import React from 'react'
import s from './StampsCardDisable.module.scss'
import intToWords from '../../utils/intToWords'
import declOfNum from '../../utils/declOfNum'
import getPictureUrl from '../../utils/getPictureUrl'

const StampsCardDisable = ({ company }) => {
  const picPathVariations = company.picPathVariations;

  const stamps = (discountCount) => {
    const str = String(intToWords(discountCount) + ' ' + declOfNum(discountCount, ['штамп', 'штампа', 'штампов']));
    return str[0].toUpperCase() + str.slice(1)
  };

  return (
    <>
      <div className={s.rectcontainer}>
        <div className={s.rectangleleft}>
          <div className={s.main}>{company.productTitle}</div>
          <div className={s.imgcontainer}>
            <img className={s.icon} src={getPictureUrl('outline', picPathVariations)} alt={company.productTitle}/>
          </div>
        </div>
        <div className={s.rectangleright}>
          <div className={s.companyname}>{company.hostPointTitle}</div>
          <div className={s.stampcount}>{stamps(company.discountCount)}</div>
        </div>
      </div>
    </>)
};
export default StampsCardDisable
