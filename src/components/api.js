import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/";

export const fetchSearch = async (abortCtrl, input, pages) => {
    console.log(abortCtrl.signal)
  const response = await axios.get("api/", {
    signal: abortCtrl.signal,
    params: {
      q:  input ,
      page: pages,
      key: "35846376-315ddb2ec9e5a392dda98a3e5",
      image_type: "photo",
      orientation: "horizontal",
      per_page: 12,
    },
  });
  return response.data;
};
