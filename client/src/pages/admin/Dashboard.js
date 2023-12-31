import React from "react";
import CardOne from "./dashboardComponent/CardOne";
import CardTwo from "./dashboardComponent/CardTwo";
import CardThree from "./dashboardComponent/CardThree";
import CardFour from "./dashboardComponent/CardFour";
import ChartOne from "./dashboardComponent/ChartOne";
import ChartTwo from "./dashboardComponent/ChartTwo";
import ChartThree from "./dashboardComponent/ChartThree";
import MapOne from "./dashboardComponent/MapOne";
import TableOne from "./dashboardComponent/TableOne";
import ChatCard from "./dashboardComponent/ChatCard";

const Dashboard = () => {
  return (
    <div className="w-[99%] pl-6 m-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-10 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </div>
  );
};

export default Dashboard;
