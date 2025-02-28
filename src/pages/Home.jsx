import React, { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../context/MainContext";

const Home = () => {
  const [product_response, setProductResponse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [listingMod, setListingMod] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { category_slug } = useParams();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const limit = 20;

  const pageChangeHandler = (page_number) => {
    setPage(page_number);
    setSearchQuery({ page: page_number });
  };

  const fetchProducts = () => {
    const skip = limit * (searchQuery.get("page") ?? page);
    setLoading(true);
    let API = "https://dummyjson.com/products";
    if (category_slug != undefined) {
      API += `/category/${category_slug}`;
    }
    API += `?limit=${limit}&skip=${skip}`;
    axios
      .get(API)
      .then((response) => {
        if (response.status == 200) {
          setProductResponse(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        if (response.status == 200) {
          setCategories(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const search_page = searchQuery.get("page");
    if (search_page != null) {
      setPage(Number(search_page));
    } else {
      setPage(0);
    }
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [category_slug, page]);

  return (
    <>
      <Container className="grid grid-cols-4 gap-3 mt-3">
        <div>
          <div className="bg-slate-700 text-center  font-bold text-white py-2 text-[14px] sm:text-lg">
            Categories
          </div>
          <ul>
            <Categories category_slug={category_slug} categories={categories} />
          </ul>
        </div>
        <div className="col-span-3">
          <div className="bg-slate-700 flex items-center gap-3 justify-end px-2 font-bold text-white py-3 text-lg">
            <IoGrid
              onClick={() => setListingMod(0)}
              className={`${
                listingMod == 0 && "text-yellow-500"
              } cursor-pointer`}
            />
            <FaThList
              onClick={() => setListingMod(1)}
              className={`${
                listingMod == 1 && "text-yellow-500"
              } cursor-pointer`}
            />
          </div>
          <Pagination
            current_page={page}
            product_response={product_response ?? []}
            pageChangeHandler={pageChangeHandler}
            limit={limit}
          />
          <ProductListing
            loading={loading}
            products={product_response.products}
            listingMod={listingMod}
          />
        </div>
      </Container>
    </>
  );
};

export default Home;

const ProductListing = ({ products, listingMod, loading }) => {
  const { addToCart } = useContext(Context);
  return (
    <>
      {loading === true ? (
        <>
          <div
            className={
              listingMod === 0
                ? "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 animate-pulse" // Grid view skeleton styles
                : "flex flex-col gap-3 mt-3 animate-pulse" // List view skeleton styles
            }
          >
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className={
                  listingMod === 0
                    ? "group relative" // Grid item skeleton styles
                    : "group relative flex gap-4" // List item skeleton styles
                }
              >
                <div
                  className={
                    listingMod === 0
                      ? "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-300 lg:aspect-none"
                      : "w-24 h-24 overflow-hidden rounded-md bg-gray-300" // Smaller image placeholder for list mode
                  }
                ></div>
                <div className="mt-4 flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                  {listingMod === 1 && (
                    <div className="mt-1 h-3 bg-gray-300 rounded w-full"></div>
                  )}
                  <div className="mt-1 h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className={
              listingMod === 0
                ? "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3" // Grid view styles
                : "flex flex-col gap-3 mt-3" // List view styles
            }
          >
            {products.map((product, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    listingMod === 0
                      ? "group relative" // Grid item styles
                      : "group relative flex gap-4" // List item styles
                  }  border p-2 rounded`}
                >
                  <div
                    className={
                      listingMod === 0
                        ? "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75"
                        : "w-24 h-24 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75" // Smaller image for list mode
                    }
                  >
                    <Link to={`/product/${product.id}`} href="#">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className={
                          listingMod === 0
                            ? "object-cover object-center lg:h-full lg:w-full" // Grid image styles
                            : "object-cover object-center w-full h-full" // Smaller image size for list mode
                        }
                      />
                    </Link>
                  </div>
                  <div className="mt-4 flex flex-col  w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-ellipsis whitespace-nowrap w-[70px] sm:min-w-fit overflow-hidden text-sm text-gray-700 font-bold">
                        <Link to={`/product/${product.id}`} href="#">
                          <span aria-hidden="true" className="" />
                          {product.title}
                        </Link>
                      </h3>
                      <p className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                    {listingMod == 1 ? (
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    ) : (
                      ""
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {product.brand}
                    </p>
                    <button
                      onClick={() => {
                        addToCart(product.id, product.price);
                      }}
                      className="border p-1 rounded mt-1 font-bold hover:text-white hover:bg-blue-500"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

const Categories = ({ categories, category_slug }) => {
  return (
    <>
      <li
        to="/"
        className={`border p-2 text-[12px] sm:text-[16px] ${
          category_slug == undefined &&  " bg-blue-500 text-white"
        }`}
      >
        <Link to="/">All</Link>
      </li>

      {categories.map((item, index) => {
        return (
          <li
            key={index}
            className={`border p-2 text-[12px] sm:text-[16px] ${
              category_slug == item.slug && "bg-blue-500 text-white"
            }`}
          >
            <Link to={`/${item.slug}`}>{item.name}</Link>
          </li>
        );
      })}
    </>
  );
};

const Pagination = ({
  product_response,
  limit,
  pageChangeHandler,
  current_page,
}) => {
  const totalPages = Math.ceil(product_response.total / limit);
  const pageElement = [];

  if (isNaN(totalPages) == false) {
    for (let i = 0; i < totalPages; i++) {
      pageElement.push(
        <li key={i}>
          <span
            onClick={() => pageChangeHandler(i)}
            className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              current_page == i && "!bg-blue-500 !text-white"
            }`}
          >
            {i + 1}
          </span>
        </li>
      );
    }
  }

  return (
    <nav aria-label="Page navigation example" className="my-3">
      <ul className="inline-flex -space-x-px text-sm flex-wrap">
        <li>
          <span
            style={{ pointerEvents: current_page === 0 && "none" }}
            onClick={() => pageChangeHandler(current_page - 1)}
            className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
          >
            Previous
          </span>
        </li>
        {pageElement}
        <li>
          <span
            style={{ pointerEvents: current_page === totalPages - 1 && "none" }}
            onClick={() => pageChangeHandler(current_page + 1)}
            className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};
