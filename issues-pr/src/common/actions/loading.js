import { LOADING } from "./index";

export const setLoading = (value) => ({
  type: LOADING,
  payload: { value },
});
