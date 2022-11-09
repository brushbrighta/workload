import { GewerkSettings } from "../data";
import React from "react";

export const Config = ({
  workPackages,
  updateConfig,
  teamSize,
  updateTeamSize,
}: {
  workPackages: GewerkSettings[];
  teamSize: number;
  updateConfig: (gewerke: GewerkSettings[]) => void;
  updateTeamSize: (teamSize: number) => void;
}) => {
  const _updateWorkPackages = (nameShort: string, value: number) => {
    const indexToUpdate = workPackages.findIndex(
      (g) => g.nameShort === nameShort
    );
    const newObj: GewerkSettings = {
      ...workPackages[indexToUpdate],
      value: !isNaN(value) ? value : 0,
    };
    const updatedPackages = [
      ...workPackages.slice(0, indexToUpdate),
      newObj,
      ...workPackages.slice(indexToUpdate + 1),
    ];
    updateConfig(updatedPackages);
  };

  const _updateTeamSize = (value: number) => {
    updateTeamSize(value);
  };

  return (
    <>
      <div style={{ marginBottom: "1em" }}>
        <strong>Vermutete Arbeitspakete im Projekt</strong>
      </div>
      <div className={"configuration"}>
        <div>
          {workPackages.map((option) => (
            <div className="inline-form-el" key={option.nameShort}>
              <label htmlFor={option.nameShort}>{option.name}</label>
              <br />
              <input
                min={0}
                id={option.nameShort}
                type="number"
                value={option.value}
                onChange={(element: React.ChangeEvent<HTMLInputElement>) =>
                  _updateWorkPackages(
                    option.nameShort,
                    element.target.valueAsNumber
                  )
                }
              />
            </div>
          ))}
        </div>
        <div>
          <div className="inline-form-el">
            <label htmlFor="teamSize">Team Größe</label>
            <br />
            <input
              min={3}
              id="teamSize"
              type="number"
              value={teamSize}
              onChange={(element: React.ChangeEvent<HTMLInputElement>) =>
                _updateTeamSize(element.target.valueAsNumber)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
