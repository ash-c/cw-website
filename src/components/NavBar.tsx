import { Box, Flex, HStack, IconButton, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useColorMode } from "../colorMode";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg={isLight ? "white" : "gray.900"}
      borderBottom="1px"
      borderColor={isLight ? "gray.200" : "gray.700"}
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
          <ChakraLink asChild fontWeight="medium">
            <RouterLink to="/">Home</RouterLink>
          </ChakraLink>
          <ChakraLink asChild fontWeight="medium">
            <RouterLink to="/projects">Projects</RouterLink>
          </ChakraLink>
          <IconButton
            aria-label="Toggle color mode"
            size="sm"
            variant="ghost"
            onClick={toggleColorMode}
          >
            <Text fontSize="xs">{isLight ? "Dark" : "Light"}</Text>
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;

