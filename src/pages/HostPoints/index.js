import React from 'react'
import s from './HostPoints.module.scss'
import HostPoint from '../../components/HostPoint'

const Organisations = ({ data = [], history }) => {
  const onHostPointClick = (id) => {
    history.push('/hostpoint/' + id)
  }

  return (
    <div className={s.container}>
      <header className={s.header}>Все заведения</header>
      <p className={s.description}>Все заведения в которых можно поставить штамп</p>
      {
        data.map((hostPoint, id) =>
          <div  onClick={() => onHostPointClick(id)} key={id}>
            <HostPoint hostPoint={hostPoint}/>
          </div>,
        )
      }
    </div>
  )
}

export default Organisations
