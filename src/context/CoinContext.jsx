import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

// eslint-disable-next-line react/prop-types
export const CoinContextProvider = ({ children }) => {
  const [coin, setCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const fetchAllCoin = () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
      currency.name;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-5ZNp7kF6ew9LpKFtQU2nAXFU",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setCoin(json))
      .catch((err) => console.error("error:" + err));
  };
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    coin,
    setCoin,
    currency,
    setCurrency,
  };
  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};
