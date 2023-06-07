import React, { ReactNode } from 'react'
import { Container } from '@chakra-ui/react'

import Head from 'next/head'

import Providers from './Providers'
import Header from './Header'
import Footer from './Footer'

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
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  </Providers>
)

export default Layout
