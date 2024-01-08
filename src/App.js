import React from 'react';
import RouterList from "./routers";

function App() {
	return (
		<React.Router.BrowserRouter>
			<RouterList/>
		</React.Router.BrowserRouter>
	);
}

export default App;
