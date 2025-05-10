import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrder = () => {
  const orders = useSelector((state) => state.orders.order);

  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold flex items-center justify-between">
        <h1>Orders</h1>
        <p>Total Orders : {orders.length}</p>
      </div>
      {!orders[0] && <NoData />}

      <div className="grid gap-4 p-3 w-fit">
        {orders.map((order, i) => {
          return (
            <div
              key={order._id + i + "order"}
              className="border border-slate-200 rounded p-4 text-sm shadow"
            >
              <p>Order No: {order?.orderId} </p>
              <div className="flex gap-3">
                <img
                  src={order.product_details.image[0]}
                  alt="product details"
                  className="w-14 h-14"
                />
                <p className="font-medium">{order.product_details.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
