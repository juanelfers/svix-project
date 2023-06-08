import React, { ReactNode } from 'react'
import { Container } from '@chakra-ui/react'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Svix' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <Container maxW="960px" padding={10} background="white" rounded={5} boxShadow="md" position="relative">
      {children}
    </Container>
    <Footer />
  </>
)

export default Layout;

