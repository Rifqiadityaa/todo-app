import { ChakraProvider } from "@chakra-ui/react";

const ApplicationProviders = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default ApplicationProviders;
