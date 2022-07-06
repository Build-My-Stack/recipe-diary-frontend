import axios from "axios";
export const baseURL = "https://localhost:3443/";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Origin: baseURL,
};

const ApiCaller = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: headers,
});
ApiCaller.interceptors.request.use(async function (config: any) {
  let token = await localStorage.getItem("token");
  config.headers.Authorization = token ? `${token}` : "";
  return config;
});

const recipeApiList = {
  getRecipes: () => {
    return ApiCaller({
      url: `/recipes`,
      method: "get",
    });
  },
 
 
  getComments: (params: any) => {
    return ApiCaller({
      url: `/comments`,
      method: "get",
      params,
    });
  },
  postNewComment: (data: any) => {
    return ApiCaller({
      url: `/comments`,
      method: "post",
      data,
    });
  },

  postFeedback: (data: any) => {
    return ApiCaller({
      url: `/feedback`,
      method: "post",
      data,
    });
  },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ApiCaller,
  ...recipeApiList,
};