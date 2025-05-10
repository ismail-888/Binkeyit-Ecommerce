import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInUSD } from "../utils/DisplayPriceInUs";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });

  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
      {/* left part (images) */}
      <div>
        {/* image */}
        <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
          <img
            src={data.image[image]}
            className="h-full w-full object-scale-down"
            alt=""
          />
        </div>
        {/* indicator */}
        <div className="flex items-center justify-center gap-3 my-2">
          {data.image.map((img, i) => {
            return (
              <div
                key={img + i + "point"}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                  i === image && "bg-slate-300"
                }`}
              ></div>
            );
          })}
        </div>
        {/* other image */}
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex z-10 gap-4 relative w-full overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, i) => {
              return (
                <div
                  className="w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md "
                  key={img + i}
                >
                  <img
                    src={img}
                    alt="min-product"
                    onClick={() => setImage(i)}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              );
            })}
          </div>
          {/* left and right button */}
          <div className="w-full h-full -ml-3 hidden lg:flex justify-between absolute items-center">
            <button
              onClick={handleScrollLeft}
              className="z-10 bg-white p-1 relative rounded-full shadow-lg"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 bg-white p-1 relative rounded-full shadow-lg"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="my-4 hidden  lg:grid gap-3 ">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>

          {data?.more_details &&
            Object.keys(data?.more_details).map((el, i) => (
              <div key={i}>
                <p className="font-semibold">{el}</p>
                <p className="text-base">{data?.more_details[el]}</p>
              </div>
            ))}
        </div>
      </div>

      {/* right part Details */}
      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 rounded-full w-fit px-2">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl ">{data.name}</h2>
        <p className="">{data.unit}</p>
        <Divider />
        <div>
          <p className="text-lg">Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {DisplayPriceInUSD(
                  priceWithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount > 1 && (
              <p className="line-through">{DisplayPriceInUSD(data.price)}</p>
            )}
            {data.discount > 1 && (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data.discount}%{" "}
                <span className="text-base text-neutral-500">Discount</span>
              </p>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <p className="text-lg text-red-500 my-2">Out of Stock</p>
        ) : (
          // <button className="my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded">
          //   Add
          // </button>
          <div className="my-4">
            <AddToCartButton data={data} />
          </div>
        )}

        <h2 className="font-semibold">Why shop from binkeyit?</h2>

        <div>
          <div className="flex items-center gap-4 my-4">
            <img src={image1} alt="superfast delivery" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Superfast Delivery</div>
              <p>
                Get your order delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 my-4">
            <img src={image2} alt="best prices offers" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Best Prices & Offers</div>
              <p>
                Best price destination with offers directly from the
                nanufacturers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 my-4">
            <img src={image3} alt="Wide Assortment" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Wide Assortment</div>
              <p>
                Choose from 5000+ products across food personal care, household
                & other categories.
              </p>
            </div>
          </div>
        </div>

        {/* only mobile */}
        <div className="my-4 gap-3 ">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>

          {data?.more_details &&
            Object.keys(data?.more_details).map((el, i) => (
              <div key={i}>
                <p className="font-semibold">{el}</p>
                <p className="text-base">{data?.more_details[el]}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
