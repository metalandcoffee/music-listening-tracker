import React, { useState } from "react";
import {
  Box,
  VStack,
  Field,
  Input,
  Button,
  HStack,
  IconButton,
  Text,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import { Toaster, toaster } from "./ui/toaster";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AlbumData {
  bandName: string;
  albumName: string;
  releaseDate: string;
  rating: "up" | "down" | null;
}

const AlbumRatingForm: React.FC = () => {
  const [formData, setFormData] = useState<AlbumData>({
    bandName: "",
    albumName: "",
    releaseDate: "",
    rating: null,
  });

  const handleInputChange = (field: keyof AlbumData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRatingChange = (rating: "up" | "down") => {
    setFormData((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.bandName ||
      !formData.albumName ||
      !formData.releaseDate ||
      !formData.rating
    ) {
      toaster.create({
        title: "Missing fields",
        description: "Please fill in all fields and select a rating",
        type: "error",
        duration: 3000,
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Album submission:", formData);

    toaster.create({
      title: "Album added!",
      description: `${formData.albumName} by ${formData.bandName} has been rated`,
      type: "success",
      duration: 3000,
    });

    // Reset form
    setFormData({
      bandName: "",
      albumName: "",
      releaseDate: "",
      rating: null,
    });
  };

  return (
    <Card.Root maxW="md" mx="auto" mt={8}>
      <Card.Body>
        <VStack>
          <Heading size="lg" textAlign="center" color="teal.600">
            Rate New Album
          </Heading>

          <Box as="form" onSubmit={handleSubmit} w="100%">
            <VStack>
              <Field.Root required>
                <Field.Label>
                  Band Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="text"
                  value={formData.bandName}
                  onChange={(e) =>
                    handleInputChange("bandName", e.target.value)
                  }
                  placeholder="Enter band name"
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>
                  Album Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="text"
                  value={formData.albumName}
                  onChange={(e) =>
                    handleInputChange("albumName", e.target.value)
                  }
                  placeholder="Enter album name"
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>
                  Release Date <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) =>
                    handleInputChange("releaseDate", e.target.value)
                  }
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>
                  Rating <Field.RequiredIndicator />
                </Field.Label>
                <HStack justify="center">
                  <VStack>
                    <ChevronUp size={24} />
                    <Text fontSize="sm" color="green.600">
                      Thumbs Up
                    </Text>
                  </VStack>

                  <VStack>
                    <ChevronDown size={24} />
                    <Text fontSize="sm" color="red.600">
                      Thumbs Down
                    </Text>
                  </VStack>
                </HStack>
              </Field.Root>
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                w="100%"
                mt={4}
              >
                Add Album
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default AlbumRatingForm;
