import React from 'react';
import RouterList from "./routers";
import ApiList from "./api";

export const ApiContext = React.createContext(ApiList);

function App() {
	return (
		<ApiContext.Provider value={ApiList}>
			<RouterList/>
		</ApiContext.Provider>
	);
}

export default App;
