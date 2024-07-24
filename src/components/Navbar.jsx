import { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const selectCurrency = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }
      case "eur": {
        setCurrency({
          name: "eur",
          symbol: "€",
        });
        break;
      }
      case "inr": {
        setCurrency({
          name: "inr",
          symbol: "₹",
        });
        break;
      }
      default: {
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <h2 className="text-lg md:text-xl lg:text-2xl md:font-bold font-medium">
        <Link to={"/"}> Logo</Link>
      </h2>
      <ul className="flex gap-8">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="navbar-right">
        <select onChange={selectCurrency}>
          <option value="usd">usd</option>
          <option value="eur">euro</option>
          <option value="inr">inr</option>
        </select>
        <button>sign up</button>
      </div>
    </div>
  );
};

export default Navbar;
