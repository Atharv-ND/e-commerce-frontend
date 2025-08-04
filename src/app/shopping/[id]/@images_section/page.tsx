"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useProduct } from "../ProductContext";

export default function ImageSection() {
  const { id } = useProduct();
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      setError("");
      try {
        // Adjust the API endpoint as needed
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product data");
        const product = await res.json();
        // Expecting product.images to be an array of image URLs
        if (
          product.images &&
          Array.isArray(product.images) &&
          product.images.length > 0
        ) {
          setImages(product.images);
          setSelectedImage(product.images[0]);
        } else {
          setImages([]);
          setSelectedImage("");
        }
      } catch (err: any) {
        setError(err.message || "Error fetching images");
        setImages([]);
        setSelectedImage("");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchImages();
  }, [id]);

  if (loading) return <div>Loading images...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!images.length) return <div>No images available for this product.</div>;

  // Move these checks to the top level of the function, after hooks and before return
  if (loading) return <div>Loading images...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!images.length) return <div>No images available for this product.</div>;

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
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Main product image"
            width={500}
            height={500}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
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
