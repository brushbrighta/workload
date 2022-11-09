import React, { useContext } from "react";

import { GewerkSettings } from "../data";

export const StackedBarChart = ({
  workPackages,
}: {
  workPackages: GewerkSettings[];
}) => {
  const total = workPackages.reduce((prev, curr) => prev + curr.value, 0);

  const getWidthPercent = (data: number): number => {
    const perc = (data * 100) / total;
    return perc;
  };

  const getLeftPercent = (index: number, all: GewerkSettings[]): number => {
    const before = all.filter((_, _index) => _index < index);
    return (
      before.reduce((prev, curr) => {
        return prev + getWidthPercent(curr.value);
      }, 0) || 0
    );
  };

  return (
    <div className="animated-bar" style={{ width: "100%", height: "2rem" }}>
      {workPackages.map((gewerk, index) => (
        <div
          key={gewerk.nameShort}
          className={"bar"}
          style={{
            width: `${getWidthPercent(gewerk.value)}%`,
            left: `${getLeftPercent(index, workPackages)}%`,
            height: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: gewerk.color,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};
