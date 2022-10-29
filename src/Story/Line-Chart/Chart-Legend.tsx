import React, {useContext} from "react";
import {DataContext} from "@visx/xychart";
import {LegendOrdinal} from "@visx/legend";

export const ChartLegend = () => {
  const {theme, margin, colorScale} = useContext(DataContext);
  return (
    <LegendOrdinal
      direction="row"
      itemMargin="8px 8px 8px 0"
      scale={colorScale}
      // labelFormat={(label) => label.replace("-", " ")}
      legendLabelProps={{color: "white"}}
      shape="line"
      style={{
        backgroundColor: theme.backgroundColor,
        marginBottom: -24,
        paddingLeft: margin.left,
        display: 'flex', // requir
      }}
    />
  );
};

