import React from 'react'
import free from '../../img/logo_free.svg'
import vk from '../../img/ico/vk.png'
import goo from '../../img/ico/goo.png'
import ya from '../../img/ico/ya.png'
import fb from '../../img/ico/fb.png'
import s from './Auth.module.scss'

const Auth = ({showLoaderGif}) => {
    const onclick = () => {
        showLoaderGif(true);
    };
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
            <a onClick={onclick} href="https://api.one2free.ru/client/login?deviceType=3&provider=Google">
                <img className={s.icon} src={goo} alt="Google"/>
            </a>
            <a onClick={onclick} href="https://api.one2free.ru/client/login?deviceType=3&provider=Yandex">
                <img className={s.icon} src={ya} alt="Yandex"/>
            </a>
            <a onClick={onclick} href="https://api.one2free.ru/client/login?deviceType=3&provider=Facebook">
                <img className={s.icon} src={fb} alt="Facebook"/>
            </a>
            <a onClick={onclick} href="https://api.one2free.ru/client/login?deviceType=3&provider=VKontakte">
                <img className={s.icon} src={vk} alt="Vkontakte"/>
            </a>
        </div>
    )
};
export default Auth
