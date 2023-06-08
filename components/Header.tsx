import { Box, HStack } from '@chakra-ui/react'

import Image from 'next/image';
import SvixLogo from '../assets/img/svix-logo.svg'

export default function Header() {
    return (
        <Box as="header" mb={5}>
            <Box as="nav" bg="bg.surface" boxShadow="sm">
                <HStack spacing="10">
                    <Image src={SvixLogo} width={100} alt="Svix Logo" />
                    {/* Had a couple of links for navigation here, but then changed it to a SPA */}
                </HStack>
            </Box>
        </Box>
    )
}