import React from 'react';
import {LineChart} from './Line-Chart';
import {StackedBarChart} from "./Stacked-Bar-Chart";
import {gewerkOptions, GewerkSettings} from "./config";

const Story = () => {

  const countPoints = 100;
  const [state, setState] = React.useState<{gewerke: GewerkSettings[]}>({gewerke: gewerkOptions})

  const update = (nameShort: string, value) => {

    const indexToUpdate = state.gewerke.findIndex(g => g.nameShort === nameShort);
    const newObj: GewerkSettings = {...state.gewerke[indexToUpdate], value};

    setState( {
      gewerke: [
        ...state.gewerke.slice(0, indexToUpdate),
        newObj,
        ...state.gewerke.slice(indexToUpdate+1)
      ]
    });
  }

  return (
    <div className="Story">
      <h2>In a nutshell</h2>
      <figure>
        <img src="current-state-blurred.jpg" />
        <p className="caption">Eines der ersten Tickets in einem Projekt</p>
      </figure>
      <p>
        Dieses ist ein Screenshot einer der ersten "User-Stories" aus dem damaligen "Werder-Ticketing"-Projekt.<br />
        Zu beachten ist hier, dass es eine "User-Story" ist, kein Epic o.ä. Die Beteiligten gingen also zumindest davon aus, dass dieses in einem Sprint sauber abgearbeitet wird.
      </p>
      <p>
        Offenbar waren selbst die für die Umsetzung dann zuständigen Kolleg:innen, also die "FAE-Entwickler:innen", der Ansicht, dass es so zu machen oder zumindest machbar sei.
      </p>
      <p>
        Meine These ist nun, dass genau diese Haltung, bzw. das hieraus resultierende Vorgehen, zu vielen Problemen in Projekten mittlerer und größerer Art führt.
        Tatsächlich hatte ich genau so einen "Projektstart" vermutet, nachdem ich in das "Ticketing"-Team eingetreten bin,
        welches zu diesem Zeitpunkt von massiven Problemen gerade im FE geplagt war.<br />
      </p>
      <p className="caption">
        <strong>Disclaimer:</strong> Es gab hierneben noch diverse andere Faktoren, warum in diesem Projekt imm FE solche massiven Probleme vorhanden waren.
        Interne wie Externe Faktoren, beeinflussbare, wie weniger beeinflussbare.
      </p>
      <p>Wie kommt es nun zu dieser "Haltung" und warum genau ist das ein Problem (bzw. was ist das Problem nochmal genau ;) ). Ein Erklärungsversuch.</p>
      <p className="caption">
        Ich arbeite im Folgenden mit starken Vereinfachungen und rein hypothetischen Zahlen. "Dev-OPs", "PO", "Scrum-Master", "Design" und andere an einem Projekt beteiligten Gewerke kommen erst einmal nicht vor.
      </p>
      <h3>In der Planung</h3>
      <p>Irgendwo und irgendwann im Kosmos unseres Unternehmens, gibt es Menschen, welche vor Start eines Projektes, grob die Anforderungen analysieren und dementsprechend ein Team zusammenstellen.</p>
      <p>Z.B. ist es eher ein "Eisberg-Projekt" (Begriff von Lars ;) ) mit sehr viel "unsichtbarer" BE-Logik und einer eher spartanischen Oberfläche (evtl. 0 individuelles "Design”).<br />
        Oder ist es ein B2C-Projekt, wo Frontend (FAE+UI) zumindest auch 50% ausmachen könnten.
      </p>
      <div className="block" style={{position: 'sticky', top: 0, zIndex: 1}}>
        { state.gewerke.map(option => {
          return (<div className="inline-form-el" key={option.nameShort}>
            <label htmlFor="be">{option.name}</label><br />
            <input id="be" type="number"  value={option.value} onChange={(element: React.ChangeEvent<HTMLInputElement>) => update(option.nameShort, element.target.valueAsNumber)}/>
          </div>);
        }) }

        <hr />
        <StackedBarChart workPackages={state.gewerke}></StackedBarChart>
      </div>
      {/*<div className="block">*/}

      {/*</div>*/}

      <h3>In der Umsetzung</h3>
      {/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda, dolore expedita illum ipsa nobis officiis provident quibusdam rem tempora.</p>*/}
      <div className="block">
        <LineChart countPoints={countPoints} workPackages={state.gewerke} linear={true}></LineChart>
        <p className="caption hug">Lorem ispum Dolor</p>
      </div>
      <h3>In der Realität jedoch</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda, dolore expedita illum ipsa nobis officiis provident quibusdam rem tempora.</p>
      <div className="block">
        <LineChart countPoints={countPoints} workPackages={state.gewerke} linear={false}></LineChart>
        <p className="caption hug">Lorem ispum Dolor</p>
      </div>
    </div>
  );
}

export default Story;
