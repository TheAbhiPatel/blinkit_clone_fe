import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, verifyOtp } from "./authApis";

interface IInitialState {
  isLoginModalOpen: boolean;
  isOtpVerificationModalOpen: boolean;
  isSuccessVerificationModalOpen: boolean;
  status: "loading" | "idle" | "error";
  token: string;
}
const initialState: IInitialState = {
  isLoginModalOpen: false,
  isOtpVerificationModalOpen: false,
  isSuccessVerificationModalOpen: false,
  status: "idle",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLoginModalOpenAndClose: (state, action: PayloadAction<boolean>) => {
      state.isLoginModalOpen = action.payload;
    },
    toggleOtpVerificationModal: (state, action: PayloadAction<boolean>) => {
      state.isOtpVerificationModalOpen = action.payload;
    },
    toggleSuccessVerificationModal: (state, action: PayloadAction<boolean>) => {
      state.isOtpVerificationModalOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state) => {
        state.status = "idle";
        state.isLoginModalOpen = false;
        state.isOtpVerificationModalOpen = true;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(verifyOtpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
      })
      .addCase(verifyOtpAsync.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { toggleLoginModalOpenAndClose, toggleOtpVerificationModal } =
  authSlice.actions;

export default authSlice.reducer;

/** ---> Async thunk for api calling */

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (mobile: string) => {
    const res = await loginUser(mobile);
    console.log("res -->", res);
  }
);
interface IVerifyOtpAsyncParams {
  mobile: string;
  otp: number;
}
export const verifyOtpAsync = createAsyncThunk(
  "auth/verifyOtp",
  async ({ mobile, otp }: IVerifyOtpAsyncParams) => {
    const res = await verifyOtp(mobile, otp);
    return res;
  }
);
