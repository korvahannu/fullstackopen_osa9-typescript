import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { reducer, StateProvider } from "./state";
import { InspectProvider, InspectReducer} from './PatientListPage/inpsectState';

ReactDOM.render(
  <InspectProvider reducer={InspectReducer}>
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>
  </InspectProvider>,
  document.getElementById('root')
);
