import React, { useEffect } from 'react'
import s from './HostPoints.module.scss'
import HostPoint from '../../components/HostPoint'

const HostPoints = ({ data = [], history, onNextPage, changeButton }) => {
  const handleScroll = (e) => {
    const { target } = e
    const { scrollHeight, scrollTop, clientHeight } = target
    if (scrollHeight - scrollTop === clientHeight) {
      onNextPage()
    }
  }
  const onHostPointClick = (id) => {
    history.push('/hostpoint/' + id)
  }
  useEffect(() => {
    changeButton()
  }, [])
  return (
    <div className={s.container} onScroll={handleScroll}>
      <header className={s.header}>Все заведения</header>
      <p className={s.description}>Все заведения в которых можно поставить штамп</p>
      {
        data.map((hostPoint, id) =>
          <div onClick={() => onHostPointClick(id)} key={id}>
            <HostPoint hostPoint={hostPoint}/>
          </div>,
        )
      }
    </div>
  )
}

export default HostPoints
