import React from 'react'
import Menu from './Menu';

type LayoutProps = {children:React.ReactNode};

function Layout({children}:LayoutProps) {
  return (
    <div>
    <Menu></Menu>
    {children}
    </div>
  )
}

export default Layout