import React from 'react'
import s from './QR.module.scss'
import qr from '../../img/ico/qr-code.svg'

const StampsCardActive = ({ company, showQRCode }) => {
  return (
    <div className={s.qrcontainer}>
      <div className={s.qr}>
        <img className={s.qrimg} src={qr} alt="qr"/>
        <div className={s.qrtext} onClick={showQRCode}>
          ПОКАЗАТЬ QR-КОД
        </div>
      </div>
    </div>
  )
}
export default StampsCardActive