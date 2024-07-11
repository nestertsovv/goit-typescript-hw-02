import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

type Obj = {
  data: {
    results: [];
    total: number;
  };
};

export const getPhotos = (query: string, page: number): Promise<Obj> => {
  const PARAMS = {
    params: {
      client_id: "VnvExAY_-4rz-yTCISF1Dws5SAGUc_IeqsGo_imr8zU",
      query,
      page,
      per_page: 12,
      orientation: "landscape",
    },
  };
  const data = axios.get("search/photos/?", PARAMS);

  return data;
};
