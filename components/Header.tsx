import { Box } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

import Image from 'next/image';
import SvixLogo from '../assets/img/svix-logo.svg'

export default function Header() {
    return (
        <Box as="header">
            <Image src={SvixLogo} width={500} alt="Svix Logo" />
            
            <Link as={NextLink} href='/'>Home</Link>
            <Link as={NextLink} href='/new-event'>New event</Link>
        </Box>
    )
}