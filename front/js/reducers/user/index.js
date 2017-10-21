const default_state = {
  balance: 10000,
  record: [],
  hold: {'AAPL': 50},
};

export default function reducer(state = default_state, action) {
    console.log(action.type);
    switch (action.type) {
			case 'SELL_STOCK': {
				return {
					...state,
					balance: action.remainBalance,
          record: action.record,
          hold: action.hold
				};
			}
      case 'BUY_STOCK':{
        return {
          ...state,
          balance: action.remainBalance,
          record: action.record,
          hold: action.hold
        };
      }
    }
    return state;
}
