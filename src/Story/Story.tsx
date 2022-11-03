import React from "react";
import { LineChart } from "./Line-Chart";
import { StackedBarChart } from "./Stacked-Bar-Chart";
import { gewerkSettings, GewerkSettings } from "./data";
import { Config } from "./Configure-Workpackages";

interface AppState {
  gewerke: GewerkSettings[];
  teamSize: number;
}

const initialState: AppState = {
  gewerke: gewerkSettings,
  teamSize: 10,
};

const Story = () => {
  const countPoints = 100;
  const [state, setState] = React.useState<AppState>(initialState);

  const updateWorkPackages = (workPackages: GewerkSettings[]) => {
    setState({
      ...state,
      gewerke: workPackages,
    });
  };

  const updateTeamSize = (newSize: number) => {
    setState({
      ...state,
      teamSize: newSize,
    });
  };

  return (
    <div className="Story">
      <div className="block" style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Config
          workPackages={state.gewerke}
          updateConfig={updateWorkPackages}
          teamSize={state.teamSize}
          updateTeamSize={updateTeamSize}
        ></Config>
        <hr />
        <StackedBarChart workPackages={state.gewerke}></StackedBarChart>
      </div>

      <h3>Geplante Auslastung</h3>
      <div className="block">
        <LineChart
          countPoints={countPoints}
          workPackages={state.gewerke}
          linear={true}
        ></LineChart>
        <p className="caption hug">Lorem ispum Dolor</p>
      </div>
      <h3>Reale Auslastung</h3>
      <div className="block">
        <LineChart
          countPoints={countPoints}
          workPackages={state.gewerke}
          linear={false}
        ></LineChart>
        <p className="caption hug">Lorem ispum Dolor</p>
      </div>
      <h3>Ein Beispiel</h3>
      <figure>
        <img src="current-state-blurred.jpg" />
        <p className="caption">Eines der ersten Tickets in einem Projekt</p>
      </figure>
    </div>
  );
};

export default Story;
