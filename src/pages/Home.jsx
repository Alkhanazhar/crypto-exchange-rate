import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { coin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    const coins = await coin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    setDisplayCoin(coin);
  }, [coin]);
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Market Place
        </h1>
        <p>
          Welcome to biggest crypto place market place.
          <br />
          sign up to explore more about cryptos
        </p>
        <form onSubmit={submitHandler}>
          <input
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target.value === "") {
                setDisplayCoin(coin);
              }
            }}
            type="text"
            className="text-black"
            value={input}
            placeholder="Search crypto..."
            required
          />
          <button>Submit</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p className="col-span-1">#</p>
          <p className="col-span-4">Coins</p>
          <p className="col-span-3">Price</p>
          <p className="col-span-2">24H Changes</p>
          <p className="hidden md:flex md:col-span-2">Market Cap</p>
        </div>
        <div>
          {displayCoin.slice(0, 10).map((item, index) => {
            return (
              <Link
                to={"/coin/" + item.id}
                key={index}
                className="table-layout"
              >
                <p className="col-span-1">{item.market_cap_rank}</p>
                <div className="col-span-4 flex items-center gap-3">
                  <img className="w-9" src={item.image} alt="" />
                  <p className="text-sm">{item.name + " - " + item.symbol}</p>
                </div>
                <p className="col-span-3">
                  {currency.symbol} {item.current_price.toLocaleString()}
                </p>
                <p
                  className={`col-span-2 ${
                    item.price_change_percentage_24h > 0
                      ? "text-green500"
                      : "text-red-500"
                  }`}
                >
                  {Math.floor(item.price_change_percentage_24h)}
                </p>
                <p className="hidden md:flex md:col-span-2">
                  {currency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
