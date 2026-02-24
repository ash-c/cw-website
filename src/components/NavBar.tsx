import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex
        maxW="6xl"
        mx="auto"
        px={4}
        py={3}
        align="center"
        justify="space-between"
      >
        <Text fontWeight="bold">Software Engineer</Text>
        <HStack gap={4} align="center">
          <ChakraLink as={RouterLink} to="/" fontWeight="medium">
            Home
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/projects" fontWeight="medium">
            Projects
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;

