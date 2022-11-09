import React from "react";
import { LineChart } from "./Line-Chart";
import { StackedBarChart } from "./Stacked-Bar-Chart";
import { gewerkSettings, GewerkSettings } from "./data";
import { Config } from "./Configure-Workpackages";
import { Team } from "./Team";
import { Belastung } from "./Belastung";

interface AppState {
  workPackages: GewerkSettings[];
  teamSize: number;
}

const initialState: AppState = {
  workPackages: gewerkSettings,
  teamSize: 10,
};

const Story = () => {
  const countPoints = 100;
  const [state, setState] = React.useState<AppState>(initialState);

  const updateWorkPackages = (workPackages: GewerkSettings[]) => {
    setState({
      ...state,
      workPackages: workPackages,
    });
  };

  const updateTeamSize = (newSize: number) => {
    setState({
      ...state,
      teamSize: newSize,
    });
  };

  return (
    <div className={"split"}>
      <div>
        <h3>Projekt-Konfiguration</h3>
        <div
          className="block"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <div style={{ marginBottom: "1em" }}>
            <Config
              workPackages={state.workPackages}
              updateConfig={updateWorkPackages}
              teamSize={state.teamSize}
              updateTeamSize={updateTeamSize}
            ></Config>
          </div>
          <div style={{ marginBottom: "2em" }}>
            <StackedBarChart
              workPackages={state.workPackages}
            ></StackedBarChart>
          </div>
          {/*<hr />*/}
          <Team
            workPackages={state.workPackages}
            teamSize={state.teamSize}
          ></Team>
        </div>
      </div>
      <div>
        <div>
          <h3>Geplanter Projektverlauf</h3>
          <div className="block">
            <LineChart
              countPoints={countPoints}
              workPackages={state.workPackages}
              type={"linear"}
            ></LineChart>
            <p className="caption hug">Leider nicht real</p>
          </div>
          <h3>Realistischer Projektverlauf</h3>
          <div className="block">
            <LineChart
              countPoints={countPoints}
              workPackages={state.workPackages}
              type={"real"}
            ></LineChart>
            <p className="caption hug">Hoffentlich nicht ganz so real</p>
          </div>
          <h3>Arbeitspakete je Person je Gewerk im Verlauf</h3>
          <div className="block">
            <LineChart
              countPoints={countPoints}
              workPackages={state.workPackages}
              teamSize={state.teamSize}
              type={"real-per-person"}
            ></LineChart>
            <p className="caption hug">Nein, so etwas würde niemand tun</p>
          </div>
        </div>
      </div>

      {/*<h3>Ein Beispiel</h3>*/}
      {/*<figure>*/}
      {/*  <img src="current-state-blurred.jpg" />*/}
      {/*  <p className="caption">Eines der ersten Tickets in einem Projekt</p>*/}
      {/*</figure>*/}
    </div>
  );
};

export default Story;
