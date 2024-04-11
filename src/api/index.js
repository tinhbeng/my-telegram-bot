const axios = require("axios").default;
const uuid = require("uuid");

const API_BASE = "https://multichain-api.birdeye.so/";

const getTokenNew = async () => {
  const data = {
      query: [
          {
              keyword: "createdAt",
              operator: "gte",
              value: "7d"
          }
      ],
      offset: 0,
      limit: 15
  }
  const options = {
    method: "POST",
    headers: {
      Origin: "https://birdeye.so",
      Referer: "https://birdeye.so",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Agent-Id": uuid.v4(),
      "x-bypass": "lPRupsjBWyJjyUReBcz6xXHALC0nKlo2",
    },
    data,
    url: `${API_BASE}solana/gems/new_listing`,
  };
  try {
    const timeNow = Date.now();
    const { data } = await axios(options);
    if (data?.success && data?.data?.items?.length > 0) {
        const filterData = data?.data?.items.filter((item, key) => {
            const createTime = Date.parse(item?.createdAt);
            return timeNow - createTime < 60000
        })
        return filterData;
    }
    return false;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

module.exports = {
  getTokenNew,
};
