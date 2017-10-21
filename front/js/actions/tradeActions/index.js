export function sell(stockID, remainBalance, quantity) {
	return (dispatch, store) => {
		console.log(store().user.hold);
		const record = {mode: 'sell', stockID: stockID, quantity: quantity};
		let hold = store().user.hold;
		hold[stockID] ? hold[stockID] = (hold[stockID] - quantity) : 0;
		dispatch({
			type: 'SELL_STOCK',
			remainBalance: remainBalance,
			record: store().user.record.concat(record),
			hold: hold
		});
	};
}

export function buy(stockID, remainBalance, quantity) {
	return (dispatch, store) => {
		console.log(store().user.hold);
		const record = {mode: 'buy', stockID: stockID, quantity: quantity};
		let hold = store().user.hold;
		hold[stockID] ? hold[stockID] = (hold[stockID] + quantity) : hold[stockID] = quantity;
		dispatch({
			type: 'BUY_STOCK',
			remainBalance: remainBalance,
			record: store().user.record.concat(record),
			hold: hold
		});
	};
}

export function setCurrPrice(stockID, price) {
	return (dispatch, store) => {
		console.log(store().user.hold);
		dispatch({
			type: 'SET_PRICE',
			price: price,
			stockID: stockID
		});
	};
}
