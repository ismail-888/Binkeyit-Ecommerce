import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
        },
      });
      const { data: responseData } = response;

      console.log(responseData);
      if (responseData.success) {
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);
  return <div>Product</div>;
};

export default Product;
