import { createBook, editBook } from "@/modules/fetch";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      router.push("/");
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } router.push("/");
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(bookData?.image);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
      <VStack align="flex-start" mb={{ base: 4, md: 20 }}>
      {selectedImage && (
        <Image width={64} src={selectedImage} alt="Selected Image" />
      )}
    </VStack>

        <VStack spacing={4} w={{ base: "90%", md: "600px" }} p={4} borderRadius="10px" mb={{ base: "30px", md: 0 }}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" required defaultValue={bookData?.title} 
            borderWidth="2px"
            borderBottomWidth="4px"
            borderColor="black" />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input name="author" required defaultValue={bookData?.author}
            borderWidth="2px"
            borderBottomWidth="4px"
            borderColor="black"  />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher</FormLabel>
            <Input
              name="publisher"
              required
              defaultValue={bookData?.publisher}
              borderWidth="2px"
            borderBottomWidth="4px"
            borderColor="black" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
              name="year"
              type="number"
              required
              defaultValue={bookData?.year}
              borderWidth="2px"
              borderBottomWidth="4px"
              borderColor="black" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>Pages</FormLabel>
            <Input
              name="pages"
              type="number"
              required
              defaultValue={bookData?.pages}
              borderWidth="2px"
              borderBottomWidth="4px"
              borderColor="black" 
              // mt={4}
            />
          </FormControl>

      {!bookData?.image && (
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            name="image"
            type="file"
            accept="image/*"
            borderWidth="2px"
            borderBottomWidth="4px"
            borderColor="black" 
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              
            }}
          />
        </FormControl>
      )}

      <Button type="submit" bg="#81583B" color="white">
        {bookData ? "Edit Book" : "Create Book"}
      </Button>
        </VStack>
    </HStack>
    </form>
  );
}