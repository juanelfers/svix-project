import React, { ReactNode } from 'react'
import { Providers } from './Providers'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Svix' }: Props) => (
  <Providers>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
    </header>
    {children}
    <footer>
    </footer>
  </Providers>
)

export default Layout
