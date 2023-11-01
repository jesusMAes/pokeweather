import { useState } from 'react'
import './App.scss'
import Home from './pages/home'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <>
    <NextUIProvider>
      <Provider store={store}>
        <Home></Home>
      </Provider>
    </NextUIProvider>
    </>
  )
}

export default App
