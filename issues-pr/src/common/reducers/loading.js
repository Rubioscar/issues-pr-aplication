import { LOADING } from "../actions/index";

const initialState = false;

const Loading = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return action.payload.value;

    default:
      return state;
  }
};

export default Loading;
