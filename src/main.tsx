import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

import { store } from "./store";
import { Provider } from "react-redux";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";
import { ToggleExpandedProvider } from "./hooks/toggleExpandedContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<Provider store={store}>
		<ToggleExpandedProvider>
			<App />
		</ToggleExpandedProvider>
	</Provider>
	// </React.StrictMode>
);
