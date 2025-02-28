import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ImPrevious } from "react-icons/im";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/MainContext";

const ProductDetails = () => {
  const {addToCart}=useContext(Context);
  const { product_id } = useParams();
  const [product, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchProduct = () => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${product_id}`)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchProduct();
  }, [product_id]);
  return (
    <>
      {loading == true ? (
        <>
          <div className="max-w-4xl mx-auto p-6 shadow-lg my-4 animate-pulse">
            {/* Skeleton Product Header */}
            <div className="md:flex gap-6">
              <div className="w-64 h-64 bg-gray-300 rounded-md"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>

            {/* Skeleton Product Tags */}
            <div className="mt-4">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="flex gap-2 mt-1">
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
                <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
              </div>
            </div>

            {/* Skeleton Product Dimensions */}
            <div className="mt-4">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>

            {/* Skeleton Warranty and Shipping Information */}
            <div className="mt-4">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>

            {/* Skeleton Return Policy */}
            <div className="mt-4">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Skeleton Reviews Section */}
            <div className="mt-6">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="space-y-4 mt-2">
                <div className="border p-4 rounded-md">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mt-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mt-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/5 mt-1"></div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mt-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mt-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/5 mt-1"></div>
                </div>
              </div>
            </div>

            {/* Skeleton QR Code and Barcode */}
            <div className="mt-6">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="flex items-center gap-4 mt-1">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="w-16 h-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
           <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg shadow-md">
      {/* Product Header */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="w-48 h-48 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{product?.title}</h1>
          <p className="text-gray-600 mt-2">{product?.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Category: {product?.category}
          </p>
          <p className="text-gray-800 mt-2 font-semibold">
            Brand: {product?.brand}
          </p>
          <div className="mt-4">
            <span className="text-lg font-bold text-green-600">
              ${product?.price.toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              $
              {(product?.price / (1 - product?.discountPercentage / 100)).toFixed(
                2
              )}
            </span>
          </div>
          <p className="text-gray-600 mt-2">
            Availability: {product?.availabilityStatus}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Product Details</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>SKU: {product?.sku}</li>
          <li>Weight: {product?.weight}g</li>
          <li>
            Dimensions: {product?.dimensions.width} x {product?.dimensions.height}{" "}
            x{product?.dimensions.depth} cm
          </li>
          <li>Warranty: {product?.warrantyInformation}</li>
          <li>Shipping: {product?.shippingInformation}</li>
          <li>Return Policy: {product?.returnPolicy}</li>
        </ul>
      </div>

      {/* Reviews Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
        {product?.reviews.map((review, index) => (
          <div
            key={index}
            className="mt-4 border-t border-gray-200 pt-4 first:border-t-0 first:pt-0"
          >
            <p className="text-gray-800 font-medium">{review.reviewerName}</p>
            <p className="text-yellow-500">
              Rating: {"⭐".repeat(review.rating)}
            </p>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-gray-400 text-sm">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Add to Cart Section */}
      <div className="mt-6">
        <button
        onClick={()=> addToCart(product_id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={product?.stock === 0}
        >
          {product?.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
