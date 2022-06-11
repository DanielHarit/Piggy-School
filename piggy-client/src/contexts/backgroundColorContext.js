import React, { useState } from 'react';

const BackgroundColorContext = React.createContext({
	backgroundColor: "",
	setBackgroundColor: () => {}
});

const BackgroundColorContextProvider = (props) => {
	const [backgroundColor, setBackgroundColor] = useState(0);

	const contextValue = {
		backgroundColor,
		setBackgroundColor,
	};

	return <BackgroundColorContext.Provider value={contextValue}>{props.children}</BackgroundColorContext.Provider>;
};

export default BackgroundColorContext;
export { BackgroundColorContextProvider };
