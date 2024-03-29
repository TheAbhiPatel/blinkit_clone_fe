import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMyOrdersAsync } from "../store/user/userSlice";

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.user.orders);

  useEffect(() => {
    dispatch(getMyOrdersAsync());
  }, []);

  return (
    <div className="w-full h-full p-2 md:p-4 ">
      {orders.length === 0 ? (
        <div className="w-full h-[90vh] flex justify-center items-center md:items-start px-5 ">
          <h2 className="md:text-xl font-bold text-center">
            Oops, you haven't placed an order yet.
          </h2>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2 md:mb-4">My orders</h2>
          {orders.map((item) => {
            const {
              courtesyTitle,
              name,
              addressType,
              addressLine1,
              addressLine2,
            } = item.selectedAddress;
            return (
              <div
                key={item._id}
                className="md:border-t p-2 md:p-3 my-2 bg-gray-50 md:bg-white rounded-md md:rounded-none"
              >
                <div className="flex justify-between">
                  <h3 className="text-sm font-semibold text-zinc-600">
                    {courtesyTitle} {name}
                  </h3>
                  <h4 className="text-sm font-semibold">
                    Amt : ₹{item.totalAmount}
                  </h4>
                </div>
                <p className="text-xxs mt-1 text-zinc-500 line-clamp-1">
                  <span className="font-semibold"> {addressType} : </span>
                  {addressLine1}, {addressLine2}
                </p>
                <div className="flex justify-between text-xs text-zinc-500 font-semibold mt-2 ">
                  <div>
                    <p className="text-xxs md:text-xs">
                      Payment Status :{" "}
                      <span className="text-green-500">success</span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center text-xxs md:text-xs">
                    Order Status :{" "}
                    {Date.now() >
                    new Date(item.createdAt).valueOf() + 10 * 1000 * 60 ? (
                      <DeliveredButton />
                    ) : Date.now() >
                      new Date(item.createdAt).valueOf() + 2 * 1000 * 60 ? (
                      <PlacedButton />
                    ) : (
                      <PendingButton />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

const PendingButton = () => {
  return (
    <div className="w-16 h-4 flex justify-center items-center  border border-indigo-500 rounded-md text-[10px] text-indigo-500 bg-indigo-50">
      pending
    </div>
  );
};
const PlacedButton = () => {
  return (
    <div className="w-16 h-4 flex justify-center items-center  border border-orange-500 rounded-md text-[10px] text-orange-500 bg-orange-50">
      placed
    </div>
  );
};
const DeliveredButton = () => {
  return (
    <div className="w-16 h-4 flex justify-center items-center  border border-green-500 rounded-md text-[10px] text-green-500 bg-green-50">
      delivered
    </div>
  );
};
// const RejectedButton = () => {
//   return (
//     <div className="w-16 h-4 flex justify-center items-center  border border-red-500 rounded-md text-[10px] text-red-500 bg-red-50">
//       rejected
//     </div>
//   );
// };
