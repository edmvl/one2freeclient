import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import MyStamps from './pages/MyStamps'
import Card from './pages/Card'

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={MyStamps}/>
      <Route path='/card' component={Card}/>
    </BrowserRouter>
  )
}

export default App
