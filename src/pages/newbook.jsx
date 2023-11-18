// pages/newbook.jsx
import { Center } from "@chakra-ui/react";
import BookForm from "../components/BookForm";
import Wrapper from "@/components/Wrapper";

export default function NewBookPage() {
  return (
    <Wrapper>
      <Center>
        <BookForm />
      </Center>
    </Wrapper>
  );
}
