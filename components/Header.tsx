import NextLink from 'next/link'
import { Box, Link, HStack } from '@chakra-ui/react'

import Image from 'next/image';
import SvixLogo from '../assets/img/svix-logo.svg'

export default function Header() {
    return (
        <Box as="header" mb={5}>
            <Image src={SvixLogo} width={500} alt="Svix Logo" />

            <Box as="nav" bg="bg.surface" boxShadow="sm">
                <HStack spacing="10">
                    <Link as={NextLink} padding={3} href='/'>Home</Link>
                    <Link as={NextLink} padding={3} href='/new-event'>New event</Link>
                </HStack>
            </Box>
        </Box>
    )
}