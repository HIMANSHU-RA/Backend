import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);

       
        setReviews([
          {
            id: 1,
            reviewer: "John Doe",
            rating: 4.5,
            comment: "Great product, really loved the quality!",
          },
          {
            id: 2,
            reviewer: "Jane Smith",
            rating: 4,
            comment: "Good value for the price. Delivery was quick too.",
          },
        ]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details-container">
    <div className="product-details">
   
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
        
        <div className="meta-info">
          <h2>Product Metadata</h2>
          <p>Created At: {new Date(product.meta?.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(product.meta?.updatedAt).toLocaleString()}</p>
          <p>Barcode: {product.meta?.barcode}</p>
          <img src={product.meta?.qrCode} alt="QR Code" className="qr-code" />
        </div>
      </div>

     
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="bordered">{product.description}</p>
        <p className="bordered">Brand: {product.brand}</p>
        <p className="bordered">Category: {product.category}</p>
        <p>Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

        
        <button className="price-button">
          Price: ${product.price}
        </button>

        
        <h2>Warranty Information</h2>
        <p className="bordered">1-year warranty included with the product.</p>

        <h2>Availability Status</h2>
        <p className="bordered">{product.stock > 0 ? 'Available for immediate delivery' : 'Currently unavailable'}</p>

        <h2>Return Policy</h2>
        <p className="bordered">30-day return policy. Free returns within this period.</p>

       
        <div className="review-section">
          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="testimonial-box">
                <p className="reviewer-name">{review.reviewer}</p>
                <p>{review.comment}</p>
                <p className="reviewer-rating">Rating: {review.rating} / 5</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProductDetails;
