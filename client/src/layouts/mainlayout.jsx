import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="main-layout">
        <Header />
        <main>
            <Outlet />
        </main>
    </div>
  )
}
