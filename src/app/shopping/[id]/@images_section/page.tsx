"use client";
import { useState} from "react";
import Image from "next/image";

// Sample images — replace with dynamic product images if available
const sampleImages = [
  "/iphone.jpeg",
  "/iphone_2.jpeg",
  "/iphone_3.jpeg",
];

export default function ImageSection() {
  const [selectedImage, setSelectedImage] = useState(sampleImages[0]);
  const images = sampleImages // State for images
/*
  // Example of fetching images based on product ID (if applicable)
  useEffect(() => {
    async function fetchImages() {
      // Fetch images based on product ID
      // const fetchedImages = await fetchImagesByProductId(id);
      // setImages(fetchedImages);
    }
    fetchImages();
  }, [id]);*/

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      {/* Main Image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "16px",
          border: "1px solid #ddd",
        }}
      >
        <Image
          src={selectedImage}
          alt="Main product image"
          width={500}
          height={500}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Thumbnail Row */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img)}
            style={{
              border:
                selectedImage === img ? "2px solid #2563eb" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "4px",
              cursor: "pointer",
              transition: "border 0.2s",
              width: "100px",
              height: "100px",
            }}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
