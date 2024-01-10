import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CookiesProvider} from "react-cookie";

const root = document.getElementById('root');
createRoot(root).render(
	// <React.StrictMode>
		<CookiesProvider>
			<Router>
				<App/>
			</Router>
		</CookiesProvider>
	// </React.StrictMode>,/
);

reportWebVitals();
