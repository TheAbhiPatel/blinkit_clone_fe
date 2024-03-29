import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteAddress,
  getAddresses,
  getMyOrders,
  saveAddress,
} from "./userApis";
import { IAddress, IOrder } from "../../interfaces";

interface IInitialState {
  addresses: IAddress[];
  orders: IOrder[];
  selectedAddress: IAddress;
  isSaveAddressModalOpen: boolean;
}

/** ---> Getting local selected address */
const localSelectedAddress = localStorage.getItem("selectedAddress");

const selectedAddress = localSelectedAddress
  ? (JSON.parse(localSelectedAddress) as IAddress)
  : {
      _id: "",
      addressType: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      name: "",
      courtesyTitle: "",
      latitude: 0,
      longitude: 0,
    };

const initialState: IInitialState = {
  addresses: [],
  orders: [],
  selectedAddress,
  isSaveAddressModalOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSaveAddressModal: (state, action: PayloadAction<boolean>) => {
      state.isSaveAddressModalOpen = action.payload;
    },
    selectAddress: (state, action: PayloadAction<IAddress>) => {
      state.selectedAddress = action.payload;
      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(state.selectedAddress)
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAddressesAsync.pending, () => {})
      .addCase(getAddressesAsync.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(saveAddressAsync.fulfilled, () => {})
      .addCase(deleteAddressAsync.fulfilled, () => {})
      .addCase(getMyOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const { toggleSaveAddressModal, selectAddress } = userSlice.actions;

export default userSlice.reducer;

/** ---> Async thunk for api calling */

export const getAddressesAsync = createAsyncThunk(
  "user/get-addresses",
  async () => {
    const res = await getAddresses();
    return res;
  }
);

export const saveAddressAsync = createAsyncThunk(
  "user/save-address",
  async (address: Omit<IAddress, "_id">) => {
    const res = await saveAddress(address);
    return res;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "user/delete-address",
  async (id: string) => {
    const res = await deleteAddress(id);
    return res;
  }
);

/** ---> orders api's */
export const getMyOrdersAsync = createAsyncThunk(
  "user/get-orders",
  async () => {
    const res = await getMyOrders();
    return res;
  }
);
