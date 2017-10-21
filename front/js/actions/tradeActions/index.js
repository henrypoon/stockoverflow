export function sell(stockID, remainBalance) {
	return (dispatch, store) => {
		console.log(store().user.hold);
		dispatch({
			type: 'SELL_STOCK',
			remainBalance: remainBalance
		});
	};
}

export function buy() {
	return (dispatch, store) => {
		console.log(store().user.hold);
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
