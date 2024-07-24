import { Loader2Icon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LineChart from "../components/lineChart/LineChart";

const Coin = () => {
  const { coin } = useParams();
  const [data, setData] = useState();
  const [hisData, setHisData] = useState();
  const { currency } = useContext(CoinContext);
  const fetchData = () => {
    const url = "https://api.coingecko.com/api/v3/coins/" + coin;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-5ZNp7kF6ew9LpKFtQU2nAXFU",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("error:" + err));
  };

  const fetchHistoricalData = () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/" +
      coin +
      "/market_chart?vs_currency=" +
      currency.name +
      "&days=10&interval=daily";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-5ZNp7kF6ew9LpKFtQU2nAXFU",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setHisData(json))
      .catch((err) => console.error("error:" + err));
  };
  useEffect(() => {
    fetchData();
    fetchHistoricalData();
    console.log(data);
  }, [currency]);

  if (data && hisData) {
    console.log(data?.market_data);
    return (
      <div className="text-white min-h-screen">
        <div className="coin-name">
          <img src={data?.image?.large} alt="" />
          <p>
            <b>
              {data?.name} {data?.symbol}
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart hisData={hisData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{data?.market_cap_rank}</li>
          </ul>

          <ul>
            <li>Crypto Price</li>
            <li>
              {data?.market_data?.current_price[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}
              {data?.market_data?.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 hour high</li>
            <li>
              {currency.symbol}
              {data?.market_data?.high_24h[currency.name]}
            </li>
          </ul>
          <ul>
            <li>24 hour low</li>
            <li>
              {currency.symbol}
              {data?.market_data?.low_24h[currency.name]}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex text-white justify-center items-center ">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }
};

export default Coin;
