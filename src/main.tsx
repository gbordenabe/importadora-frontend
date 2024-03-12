import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

import { store } from "./store";
import { Provider } from "react-redux";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primereact/resources/primereact.min.css";

import 'primeicons/primeicons.css';
import { DocumentErrorsProvider } from "./hooks/contexts/errorsContext.tsx";
        

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
		<DocumentErrorsProvider>
			<App />
		</DocumentErrorsProvider>
		</Provider>
	</React.StrictMode>
);
