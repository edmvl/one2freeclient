import React from 'react'
import free from '../../img/logo_free.svg'
import vk from '../../img/ico/vk.png'
import goo from '../../img/ico/goo.png'
import ya from '../../img/ico/ya.png'
import fb from '../../img/ico/fb.png'
import s from './Auth.module.scss'

const Auth = () => {
  return (
    <div className={s.main}>
      <div className={s.header}>
        <div>one</div>
        <div>two</div>
        <div>...</div>
        <img className={s.logo} src={free} alt="logo"/>
      </div>
      <div className={s.description}>
        Вход в аккаунт
      </div>
      <a href="https://api.test.one2free.ru/client/login?deviceType=4&provider=Google">
        <img className={s.icon} src={goo} alt="Google"/>
      </a>
      <a href="https://api.test.one2free.ru/client/login?deviceType=4&provider=Yandex">
        <img className={s.icon} src={ya} alt="Yandex"/>
      </a>
      <a href="https://api.test.one2free.ru/client/login?deviceType=4&provider=Facebook">
        <img className={s.icon} src={fb} alt="Facebook"/>
      </a>
      <a href="https://api.test.one2free.ru/client/login?deviceType=3&provider=VKontakte">
        <img className={s.icon} src={vk} alt="Vkontakte"/>
      </a>
    </div>
  )
}
export default Auth
