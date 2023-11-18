import { useEffect, useState } from "react";
import { Center } from "@chakra-ui/react";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
import BookForm from "@/components/BookForm";
import { getBookDetailById } from "@/modules/fetch";

export default function EditBookPage() {
  const [book, setBook] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(router.query.id);
        setBook(response.book);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [router.query.id]);

  return (
    <Wrapper>
      <Center>
      <BookForm bookData={book} />
      </Center>
    </Wrapper>
  );
}
