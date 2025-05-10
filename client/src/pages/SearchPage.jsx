import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothing here yet.webp";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params?.search?.slice(3);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((prev) => {
            return [...prev, ...responseData.data];
          });
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length} </p>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
            {data.map((p, i) => {
              return <CardProduct data={p} key={p._id + "searchProduct" + i} />;
            })}

            {/* loading data */}
            {loading &&
              loadingArrayCard.map((_, i) => {
                return <CardLoading key={"loadingsearchpage" + i} />;
              })}
          </div>
        </InfiniteScroll>

        {
          // no data
          !data[0] && !loading && (
            <div className="flex flex-col justify-center items-center">
              <img
                src={noDataImage}
                alt="noDataImage"
                className="w-full h-full max-w-xs max-h-xs"
              />
              <p className="font-semibold my-2">No Data found</p>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default SearchPage;
