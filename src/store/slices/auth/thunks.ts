import axios from "axios";
import { url } from "@/connections/mainApi";
import { authApi } from "@/connections";
import { AppThunk } from "../../store";
import { setLoadingFalse, setLogin } from "./authSlice";

export const getUser = (payload: any): AppThunk => {
  return async (dispatch) => {
    try {
      const { data } = await authApi.post("/login", payload);
      localStorage.setItem("rt__importadora", data.jwt);
      dispatch(setLogin(data?.user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const refreshToken = (payload: string): AppThunk => {
  return async (dispatch) => {
    try {
      let headers = {
        Authorization: `Bearer ${payload}`,
      };
      const { data } = await authApi.post(
        `/refresh-token`,
        { jwt: payload },
        { headers }
      );
      localStorage.setItem("rt__importadora", data.jwt);

      if (data?.jwt) {
        let headers = {
          Authorization: `Bearer ${data?.jwt}`,
        };
        const respProfile = await axios.get(`${url}/user/my-profile`, {
          headers,
        });
        dispatch(setLogin(respProfile?.data));
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("rt__importadora");
      dispatch(setLoadingFalse());
    }
  };
};

export const logoutUser = (): AppThunk => {
  return (dispatch) => {
    localStorage.removeItem("rt__importadora");
    dispatch(setLogin({}));
  };
};
