import React from 'react';

import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  DataProvider, DataContext, buildChartTheme, lightTheme
} from '@visx/xychart';

import {Data} from "./interfaces";
import {GewerkSettings} from "../config";
import {buildDataLinear, buildDataNonLinear} from "./functions";
import {ChartLegend} from "./Chart-Legend";


const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,

};

export const LineChart = ({countPoints, workPackages, linear}: {countPoints: number,workPackages: GewerkSettings[] , linear: boolean }) => {


  const DATA = linear ? buildDataLinear(countPoints, workPackages) : buildDataNonLinear(countPoints, workPackages);

  const UI_DATA: Data[] = DATA.map(d => ({
    x: d.x,
    y: d.ui
  }))

  const FAE_DATA: Data[] = DATA.map(d => ({
    x: d.x,
    y: d.fae
  }))

  const BE_DATA: Data[] = DATA.map(d => ({
    x: d.x,
    y: d.be
  }))

  const beColor = workPackages.find(w => w.nameShort === "BE").color;
  const faeColor = workPackages.find(w => w.nameShort === "FAE").color;
  const uiColor = workPackages.find(w => w.nameShort === "UI").color;


  return (
    <DataProvider
      // these props have been moved from XYChart to DataProvider
      // this allows us to move DataContext up a level such that we can
      // render an HTML legend that uses DataContext and an SVG chart
      // without doing this you would have to render XYChart as a child
      // of XYChart, which would then require the legend to be SVG-based
      // because HTML cannot be a child of SVG
      xScale={{ type: "band", paddingInner: 0.5 }}
      yScale={{ type: "linear" }}
      theme={
        {
          ...lightTheme,
          colors: [beColor, faeColor, uiColor]
        }
      }

    >
      <ChartLegend />
      <XYChart height={500} >
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="left" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries stroke={beColor} dataKey="BE" data={BE_DATA} {...accessors} />
        <AnimatedLineSeries stroke={faeColor} dataKey="FAE" data={FAE_DATA} {...accessors} />
        <AnimatedLineSeries stroke={uiColor} dataKey="UI" data={UI_DATA} {...accessors} />

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => {
            return (
              <div>
                {tooltipData.datumByKey['BE'] &&
                    <div style={{ color: colorScale(tooltipData.datumByKey['BE'].key) }}>
                        BE: {Math.round((tooltipData.datumByKey['BE'].datum as Data).y)}
                    </div>
                }
                {tooltipData.datumByKey['FAE'] &&
                    <div style={{color: colorScale(tooltipData.datumByKey['FAE'].key)}}>
                        FAE: {Math.round((tooltipData.datumByKey['FAE'].datum as Data).y)}
                    </div>
                }
                {tooltipData.datumByKey['UI'] &&
                    <div style={{color: colorScale(tooltipData.datumByKey['UI'].key)}}>
                        UI: {Math.round((tooltipData.datumByKey['UI'].datum as Data).y)}
                    </div>
                }
              </div>
            )
          }}
        />
      </XYChart>
    </DataProvider>
  )
};
