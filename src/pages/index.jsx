import { Grid } from "@chakra-ui/react"; 
import Wrapper from "@/components/Wrapper";
import { prisma } from "@/utils/prisma";
import Books from "../components/Books";
import Cookies from "js-cookie";

export default function Homepage(props) {
  return (
    <Wrapper>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}  // Menambah properti gap untuk memberikan jarak antara kartu buku
        justifyContent="center"
        p={3}
      >
        {props?.books?.map((book) => (
          <Books
            key={`${book.id} ${book.title}`}
            {...book}
          />
        ))}
      </Grid>
    </Wrapper>
  );
}

// server side props ( fetch in server )

export async function getServerSideProps() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return {
      props: {
        books,
      },
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
