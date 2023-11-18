import { Card, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link href={`/detail/${id}`}>
      <Card
        key={id}
        my={4}
        p={4}
        cursor="pointer"
        height="300px"
        width={{ base: "80%", md: "250px" }}
        bg="#E9C8A1"
        textAlign="center"
        mx="auto"
      >
        <VStack spacing={2}>
          <Heading size={"md"}>
            {title} ({year})
          </Heading>
          <Text>{author}</Text>
          <Image width={80} height={80} src={`${image}`} alt={`${id}-${title}`} />
          <Text>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
