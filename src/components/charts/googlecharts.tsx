import React from "react";
import { Chart, ChartWrapperOptions } from "react-google-charts";

export const data = [
  { name: "pending", value: 3999 },
  { name: "pending2", value: 39992 },
  { name: "pending3", value: 39994 },
  { name: "pending5", value: 39995 },
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
  backgroundColor: "orange",
  colors: ["red", "blue", "green"]
};

export const BarChart = ({ _data }: any) => {
  return (
    <Chart
      // className="border-4 border-green-400"
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      
      options={options}

    />
  );
}
