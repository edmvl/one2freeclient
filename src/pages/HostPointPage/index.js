import React from 'react'
import s from './HostPointPage.module.scss'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

const HostPointPage = ({ data, match }) => {
  const { params } = match
  const { id } = params
  const hostPoint = data.find((item, number) => {
    return number === Number(id)
  }) || {}
  const { location = {} } = hostPoint
  const { longitude, latitude } = location
  const mapData = {
    center: [latitude, longitude],
    zoom: 18,
  }
  const placeMarkOptions = {
    center: [latitude, longitude],
    preset: 'islands#redIcon',
    iconColor: '#ff0000',
  }
  const placeMarkGeometry = [latitude, longitude]
  return (
    <YMaps>
      <Map className={s.container} defaultState={mapData}>
        <Placemark defaultOptions={placeMarkOptions} defaultGeometry={placeMarkGeometry}/>
      </Map>
    </YMaps>
  )
}
export default HostPointPage
