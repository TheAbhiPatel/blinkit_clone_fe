import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleCartOpenAndClose } from "../store/cart/cartSlice";
import {
  toggleAccountDropdown,
  toggleLoginModalOpenAndClose,
} from "../store/auth/authSlice";
import AccountDropDown from "./molecules/AccountDropDown";
import SearchInput from "./molecules/SearchInput";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const discountedAmount = useAppSelector(
    (state) => state.cart.discountedAmount
  );
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
  const isAccountDropdownOpen = useAppSelector(
    (state) => state.auth.isAccountDropdownOpen
  );

  const handleCartOpen = () => {
    dispatch(toggleCartOpenAndClose(true));
  };

  const handleLoginModalOpen = () => {
    dispatch(toggleLoginModalOpenAndClose(true));
  };

  const handleDoropDownToggle = (e: any) => {
    e.stopPropagation();
    // if (e.target.id === "account-btn") {
    if (isAccountDropdownOpen) dispatch(toggleAccountDropdown(false));
    else dispatch(toggleAccountDropdown(true));
    // }
  };

  return (
    <nav className="w-full max-w-[1250px] fixed top-0  border-b border-slate-200 bg-white z-50">
      <div className="w-full  hidden md:flex">
        {/* ---> logo <--- */}
        <div className={`flex w-[18%] `}>
          <a
            href="/"
            className={`logo w-full h-[4.15rem] border-r border-slate-200 flex justify-center items-center cursor-pointer `}
          >
            <img src="/blinkit-logo.svg" className="h-6" alt="logo" />
          </a>
        </div>
        {/* ---> Location and Search Input and login button <--- */}
        <div className="w-full flex items-center justify-between ">
          {/* ---> Location  <--- */}
          <div
            className={`min-w-[35%] h-[4rem] flex justify-center items-center gap-2 ${
              pathname === "/s" && "hidden"
            }`}
          >
            <div>
              <h3 className="text-sm font-bold">Delivery in 9 minutes</h3>
              <p className="text-xxs">LIG Square, Rss Nagar, Indore, ...</p>
            </div>
            <div className="h-[60%] flex justify-center items-end ">
              <IoMdArrowDropdown className="text-xl" />
            </div>
          </div>

          {/* --->  Search Input <--- */}
          <SearchInput />

          {/* ---> Login <--- */}
          {pathname !== "/s" && (
            <>
              {isUserLoggedIn ? (
                <div className="w-[20%] flex justify-center items-center ">
                  <div className="relative">
                    <button
                      onClick={handleDoropDownToggle}
                      className="flex gap-1  items-center"
                    >
                      <h4 className="text-sm text-zinc-700 tracking-wider py-1 ">
                        Account
                      </h4>
                      <IoMdArrowDropdown
                        onClick={handleDoropDownToggle}
                        className="text-xl mt-1 "
                      />
                    </button>

                    {isAccountDropdownOpen && <AccountDropDown />}
                  </div>
                </div>
              ) : (
                <div className="w-[20%] flex justify-center items-center ">
                  <div
                    onClick={handleLoginModalOpen}
                    className="cursor-pointer"
                  >
                    <h4 className="text-sm text-zinc-700">Login</h4>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* --->  cart button <--- */}
        <div className="w-[20%]  flex justify-center items-center ">
          <div
            onClick={handleCartOpen}
            className="bg-primary text-white flex justify-center items-center  h-10 w-[5.25rem]  rounded-md gap-2 cursor-pointer"
          >
            <HiOutlineShoppingCart className="text-xl" />
            {totalItems > 0 ? (
              <div className="flex flex-col ">
                <h4 className="text-[11px] font-bold leading-3">
                  {totalItems}
                  {totalItems > 1 ? " items" : " item"}
                </h4>
                <h4 className="text-[11px] font-bold">₹{discountedAmount}</h4>
              </div>
            ) : (
              <h4 className="text-[11px] font-bold">My Cart</h4>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
