import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);

  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
      // console.log(responseData)
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    if (!subCategoryData || subCategoryData.length === 0) return null;
    const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subcategory.name)}-${subcategory._id}`;

    return url;
  };

  const redirectURL = handleRedirectProductListpage();

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        {
          redirectURL && (
        <Link to={redirectURL} className="text-green-600 hover:text-green-400">
          See All
        </Link>
          )
        }
      </div>

      <div className="relative flex items-center">
        <div
          className="flex  gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, i) => {
              return <CardLoading key={"CategoryWiseProductDisplay" + i} />;
            })}

          {data.map((p, i) => {
            return (
              <CardProduct
                key={p._id + "CategoryWiseProductDisplay" + i}
                data={p}
              />
            );
          })}
        </div>
        <div className="w-full left-0 right-0 container mx-auto  absolute hidden   lg:flex justify-between">
          <button
            onClick={handleScrollLeft}
            className="z-10  bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10  bg-white  hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
