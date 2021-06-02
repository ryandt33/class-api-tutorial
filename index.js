const axios = require("axios");
const config = require("config");

const apiURL = config.get("apiURL");

const callApi = async () => {
  const basicAPICall = async () => {
    // This just sends a get request to the URL assigned to apiURL in config/default.json
    const res = await axios.get(apiURL, {
      headers: { page: 1, per_page: 5, total_pages: 3 },
    });

    console.log(res.data);
  };

  const loopingAPICall = async () => {
    // This starts at page 1 and uses a do while loop to make sure that it makes one call
    let page = 0,
      total_pages = 3, // Normally this field doesn't exist, but just for the purpose of this demonstration I created it
      classes = [];
    do {
      page += 1;

      const res = await axios.get(apiURL, {
        headers: { page: page, total_pages: total_pages, per_page: 5 },
      });

      total_pages = res.data.meta.total_pages;

      classes = classes.concat(res.data.classes);
    } while (res.data.meta.page < res.data.meta.total_pages);

    console.log(classes);
  };

  // Uncomment the appropriate function below, otherwise it doesn't do anything
  //   basicAPICall();
  //   loopingAPICall();
};

callApi();
