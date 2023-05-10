import React, { useLayoutEffect } from 'react'
import loading from '../styles/Loading.module.scss'

function Loading() {
  return (
    <section className={loading.page}>
          <i className={loading.loader}></i>
    </section>
  )
}

export default Loading