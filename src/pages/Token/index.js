import React, {useEffect} from 'react'
import free from '../../img/logo_free.svg'
import axios from 'axios'

const Token = ({location = {}, getMyInfo, updateRefreshToken, updateCoupons, getHostPoints, history, resourceUrl}) => {
    useEffect(() => {
        const search = location.search || '';
        const guid = search.replace('?guid=', '');
        const url = `${resourceUrl}/client/${guid}/getToken`;
        axios.get(url, {}).then((responce) => {
            if (responce.statusText === 'OK') {
                const data = responce.data || {};
                const access_token = data.access_token;
                const refresh_token = data.refresh_token;
                updateRefreshToken({access_token, refresh_token}, () => {
                    getMyInfo();
                    updateCoupons();
                    getHostPoints();
                    history.push('/');
                })
            }
        }).catch((error) => {
            console.log(error)
        })

    });
    return (
        <div>
            <img src={free} alt="logo"/>

        </div>
    )
};
export default Token
