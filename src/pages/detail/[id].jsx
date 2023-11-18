import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  VStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { css } from "styled-jsx/css";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteBook } from "@/modules/fetch";
import { useAuth } from "@/modules/context/authContext";
import { prisma } from "@/utils/prisma";
import Image from "next/image";

export default function BookDetails({ book }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleDeleteBook = async () => {
    try {
      await deleteBook(router.query.id);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <VStack>
        <Flex mt="50">
          <Box w="300px">
            <Image width={500} height={500} src={`${book.image}`} alt={book.title} />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
        {isLoggedIn && (
          <HStack>
            <Popover>
              <PopoverTrigger>
                <Button mt="4" bg="#CC4242" color="white">Delete</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete this book?
                </PopoverBody>
                <Button onClick={handleDeleteBook} mt="4" bg="#CC4242" color="white">
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
            <Link href={`/edit/${router.query.id}`}>
              <Button mt="4" bg="#B18362" color="white">Edit</Button>
            </Link>
          </HStack>
        )}
      </VStack>
      <VStack>
        <Link href="/">
          <Button mt="4" bg="#81583B" color="white" textAlign="center">
            Back to Home
          </Button>
        </Link>
      </VStack>
    </Wrapper>
  );
}

export async function getStaticPaths() {
  // get all books id
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  });
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(context.params.id) },
    });
    return {
      props: {
        book,
      },
      revalidate:10
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
}
