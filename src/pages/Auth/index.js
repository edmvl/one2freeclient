import React from 'react'
import free from '../../img/logo_free.svg'

const Auth = () => {
  return (
    <div>
      <img src={free} alt="logo"/>
      <a href="https://api.test.one2free.ru/client/login?deviceType=3&provider=VKontakte">VK</a>
      <a href="https://api.test.one2free.ru/client/login?deviceType=4&provider=Google">Google</a>
      <a href="https://api.test.one2free.ru/client/login?deviceType=4&provider=Facebook">Facebook</a>
      <a href="https://api.test.one2free.ru/client/login?deviceType=4&provider=Yandex">Yandex</a>
    </div>
  )
}
export default Auth
