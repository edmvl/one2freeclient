import React, { useEffect } from 'react'
import free from '../../img/logo_free.svg'
import axios from 'axios'

const Token = ({ location = {} , updateRefreshToken, history}) => {
  useEffect(() => {
    const search = location.search || ''
    const guid = search.replace('?guid=', '')
    const url = `https://api.test.one2free.ru/client/${guid}/getToken`
    axios.get(url, {}).then((responce) => {
      if (responce.statusText === 'OK') {
        const data = responce.data || {}
        const access_token = data.access_token;
        const refresh_token = data.refresh_token;
        updateRefreshToken({ access_token, refresh_token });
        history.push('/');
      }
    }).catch((error) => {
      console.log(error)
    })

  })
  return (
    <div>
      <img src={free} alt="logo"/>

    </div>
  )
}
export default Token
