import React, {  createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

/*
Käyttöönotto:

index.tsx sisältää osion <InspectProvider reducer={InspectReducer}> </>
tällä annetaan kaikille lapsi pääsy stateihin.
Import: import { useInspectValue } from "./inpsectState";
Käyttöönotto: const [{ patient }, dispatchInspect] = useInspectValue();

patientiin pääsee käsiksi ilman ongelmia
dispatchInspect({type:"SET_PATIENT", payload:patient});

Tämän homman selvittämisessä meni enemmän aikaa kuin laki sallii


OLISIN VOINUT YHDISTÄÄ TÄMÄN STATE.TSX MUTTA TÄMÄ OLI VÄLTTÄMÄTÖNTÄ OPPIMISEN KANNALTA
*/

/*
  Action tyypit => Millä eri tavoin voidaan muokata tietoa?
*/
export type ActionTypes = {
    type: "SET_PATIENT";
    payload: Patient;
} |{
  type: "REFRESH";
};

/*
  Actioneiden käsittelijät
*/
export const InspectReducer = (state: inspectState, action: ActionTypes): inspectState => {
  switch (action.type) {
    case "SET_PATIENT":
      return {
        patient: action.payload
      };
    default:
      return state;
  }
};

/*
  Määrritelmä sille, miltä staten eli tilan tulisi näyttää
  tässä siis se on joko null tai sisältää Patientin eli potilaan
*/
export type inspectState = {
  patient: Patient | null
};

/*
  Tilan alustaminen
*/
const inspectInitialState:inspectState = {
  patient: null
};

/*
  Luo kontekstin createContext -funktiolla
*/
export const InspectContext = createContext<[inspectState, React.Dispatch<ActionTypes>]>([
  inspectInitialState,
  () => inspectInitialState
]);

/*
  Providerin tyyppi, typescript valittaa jos tätä ei ole
*/
type InspectProviderProps = {
  reducer: React.Reducer<inspectState, ActionTypes>;
  children: React.ReactElement;
};

/*
  Ns. Provideri, jonka avulla reactin muut komponentit pääsevät käsiksi näihin mehukkaisiin komponentteihin
  inspectState ja inspectDispatch on ne millä on väliä
*/
export const InspectProvider: React.FC<InspectProviderProps> = ({reducer,children}: InspectProviderProps) => {
  const [inspectState, inspectDispatch] = useReducer(reducer, inspectInitialState);

  return (
    <InspectContext.Provider value={[inspectState, inspectDispatch]}>
      {children}
    </InspectContext.Provider>
  );
};

/*
  Exportataan vielä useInspectValue
*/
export const useInspectValue = () => useContext(InspectContext);
