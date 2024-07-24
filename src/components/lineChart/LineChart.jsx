/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import Chart from "react-google-charts";

// eslint-disable-next-line react/prop-types
const LineChart = ({ hisData }) => {
  const [data, setData] = useState(["Date", "Prices"]);
  useEffect(() => {
    const dataChart = [["Date", "Prices"]];
    hisData.prices.map((item) => {
      dataChart.push([
        new Date(item[0]).toLocaleDateString().slice(0, -5),
        item[1],
      ]);
    });

    setData(dataChart);
  }, []);
  return (
    <div>
      <Chart chartType="LineChart" data={data} legendToggle height={"100%"} />
    </div>
  );
};

export default LineChart;
