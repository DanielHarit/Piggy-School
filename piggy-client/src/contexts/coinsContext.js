import React, { useState } from 'react';

const CoinsContext = React.createContext({
	coins: 0,
	totalCoins: 0,
	setCoins: () => {},
	setTotalCoins: () => {},
});

const CoinsContextProvider = (props) => {
	const [coins, setCoins] = useState(0);
	const [totalCoins, setTotalCoins] = useState(0);

	const contextValue = {
		coins,
		totalCoins,
		setCoins,
		setTotalCoins,
	};

	return <CoinsContext.Provider value={contextValue}>{props.children}</CoinsContext.Provider>;
};

export default CoinsContext;
export { CoinsContextProvider };
