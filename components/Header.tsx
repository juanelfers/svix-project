import { Container, Box, HStack } from '@chakra-ui/react'

import Image from 'next/image';
import SvixLogo from '../assets/img/svix-logo.svg'

export default function Header() {
    return (
        <Box as="header" mb={10} bg="white">
            <Box as="nav" boxShadow="sm">
                <Container maxW="960px">
                    <HStack spacing="10">
                        <Image src={SvixLogo} width={100} alt="Svix Logo" />
                        {/* Had a couple of links for navigation here, but then changed it to a SPA */}
                    </HStack>
                </Container>
            </Box>
        </Box>
    )
}