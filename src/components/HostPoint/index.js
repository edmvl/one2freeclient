import React from 'react'
import s from './HostPoint.module.scss'
import getPictureUrl from '../../utils/getPictureUrl'
import axios from 'axios'

const HostPoint = ({hostPoint}) => {
    const {logoUrl, title} = hostPoint;
    const logoFullurl = getPictureUrl('normal', {'normal': logoUrl});
    let logo;

    axios.get(logoFullurl).then(responce => {
            logo = (
                <img
                    className={s.icon}
                    src={logoFullurl}
                    alt={hostPoint.productTitle}
                />
            );
            console.log(responce);
        }
    ).catch(error => {
            logo = (
                <div className={s.textlogo}>
                    {title.substring(0, 1)}
                </div>
            );
            console.log(error);
        }
    );
    return (
        <>
            <div className={s.rectcontainer}>
                <div className={s.rectangleleft}>
                    <div className={s.imgcontainer}>
                        {logo}
                    </div>
                </div>
                <div className={s.rectangleright}>
                    <div className={s.companyname}>
                        <div>{hostPoint.title}</div>
                        <div>{hostPoint.productNames}</div>
                    </div>
                    <div className={s.address}>
                        <span
                            className={s.address1}>{hostPoint.address.substring(0, hostPoint.address.length / 2)}</span>
                        <span className={s.address2}>{hostPoint.address.substring(hostPoint.address.length / 2)}</span>
                    </div>
                </div>
            </div>
        </>)
};
export default HostPoint
