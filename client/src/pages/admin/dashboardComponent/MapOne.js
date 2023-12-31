import React from "react";
// import "jsvectormap/dist/css/jsvectormap.css";
// // import { useEffect } from "react";
// // import jsVectorMap from "jsvectormap";
// import "./js/us-aea-en";

const MapOne = () => {
  // useEffect(() => {
  //   const mapOne = new jsVectorMap({
  //     selector: "#mapOne",
  //     map: "us-aea-en",
  //     zoomButtons: true,

  //     regionStyle: {
  //       initial: {
  //         fill: "#C8D0D8",
  //       },
  //       hover: {
  //         fillOpacity: 1,
  //         fill: "#3056D3",
  //       },
  //     },
  //     regionLabelStyle: {
  //       initial: {
  //         fontFamily: "Satoshi",
  //         fontWeight: "semibold",
  //         fill: "#fff",
  //       },
  //       hover: {
  //         cursor: "pointer",
  //       },
  //     },

  //     labels: {
  //       regions: {
  //         render(code) {
  //           return code.split("-")[1];
  //         },
  //       },
  //     },
  //   });
  // }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Region labels
      </h4>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/2560px-Blank_US_Map_%28states_only%29.svg.png"
          alt="map"
          className="w-[774px] h-[406px]"
        />
      </div>
    </div>
  );
};

export default MapOne;
