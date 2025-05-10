import React from "react";
import { DisplayPriceInUSD } from "../utils/DisplayPriceInUs";
import { Link } from "react-router-dom";
import { validURLConvert } from "../utils/validURLConvert";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;
  
  return (
    <Link
      to={url}
      className="border border-slate-300 py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down lg:scale-125"
        />
      </div>
      <div className="flex items-center gap-1">
        <div className="rounded text-xs w-fit p-[1px] px-2 bg-green-100 text-green-600   ">
          10 min
        </div>
        <div>
          {Boolean(data.discount) && (
            <p className="text-green-600 bg-green-100 w-fit px-2 text-xs rounded-full">
              {data.discount}% discount
            </p>
          )}
        </div>
      </div>
      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2 ">
        {data.name}
      </div>
      <div className="w-fit px-2 lg:px-0 text-sm lg:text-base">{data.unit}</div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="font-semibold">
          {DisplayPriceInUSD(priceWithDiscount(data.price, data.discount))}
        </div>

        <div className="">
          {data.stock == 0 ? (
            <p className="text-red-500 text-sm lg:text-lg text-center">
              Out of stock
            </p>
          ) : (
            <>
            <AddToCartButton data={data} />
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
