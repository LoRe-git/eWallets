import axios from "axios";
import { BASE_URL } from "./constants";

export const getAllWallets = async () => {
  return await axios.get(BASE_URL + "/wallet/list", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });
};

export const createWallet = async (wallet) => {
  return await axios.post(
    BASE_URL + "/wallet/create",
    { ...wallet },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    }
  );
};

export const updateWallet = async (walletid, amount, transType) => {
  return await axios.put(
    `${BASE_URL}/wallet/update/${walletid}?amount=${amount}&type=${transType}`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    }
  );
};

export const signIn = async (payload) => {
  return await axios.post(BASE_URL + "/authenticate", payload);
};

export const transferAmount = async (transferData) => {
  return await axios.post(
    BASE_URL + "/wallet/transfer",
    { ...transferData },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    }
  );
};
