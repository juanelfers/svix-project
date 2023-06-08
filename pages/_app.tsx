import { ChakraProvider } from '@chakra-ui/react'
import '../assets/global.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}