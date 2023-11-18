import { VStack } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Wrapper(props) {
  return (
    <VStack align="stretch" minH="100vh" minW="100vw" maxW="80%" bgGradient="linear(to-b, #F8E8DE, #D6A692)">
      <Navbar />
      {props.children}
    </VStack>
  );
}

export default Wrapper;
