const default_state = {
  stockID: '',
  price: 0
};

export default function reducer(state = default_state, action) {
    console.log(action.type);
    switch (action.type) {
			case 'SELL_STOCK': {
				return {
					...state,
					user: action.payload
				};
			}
      case 'BUY_STOCK': {
        return {
          ...state,
          user: action.payload
        };
      }
      case 'SET_PRICE': {
        return {
          ...state,
          price: action.price,
          stockID: action.stockID
        };
      }
    }
    return state;
}
