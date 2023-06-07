import React, { ReactNode } from 'react'
import { Container } from '@chakra-ui/react'
import Document, { DocumentContext, Html, Main, NextScript } from "next/document";
import Head from 'next/head'

import emotionCache from "../lib/emotion-cache";
import createEmotionServer from "@emotion/server/create-instance";

import Providers from './Providers'
import Header from './Header'
import Footer from './Footer'

const { extractCritical } = createEmotionServer(emotionCache);

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

Layout.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  console.log({ initialProps })
  const styles = extractCritical(initialProps.html);
  return {
    ...initialProps,
    styles: [
      initialProps.styles,
      <style
        key="emotion-css"
        dangerouslySetInnerHTML={{ __html: styles.css }}
        data-emotion-css={styles.ids.join(" ")}
      />,
    ],
  };
}


export default Layout;

