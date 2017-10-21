import { actionTypes } from '../../actions/home';

const default_state = {
  loading: false,
};

export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.TEST:
      return {
        ...state,
        loading: true
      };
  }
  return state;
};
