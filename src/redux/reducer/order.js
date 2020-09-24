import {
  CLEAR_BASKET,
  DECREMENT,
  FAILURE,
  INCREMENT,
  REMOVE,
  REQUEST,
  SEND_BASKET,
  SUCCESS,
} from '../constants';
import produce from 'immer';

const initialState = {
  entities: {},
  loading: false,
  error: null,
};

// { [productId]: amount }
export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case INCREMENT:
        draft.entities[payload.id] = (draft.entities[payload.id] || 0) + 1;
        break;
      case DECREMENT:
        draft.entities[payload.id] = Math.max(
          (draft.entities[payload.id] || 0) - 1,
          0
        );
        break;
      case REMOVE:
        draft.entities[payload.id] = 0;
        break;
      case SEND_BASKET + REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case SEND_BASKET + SUCCESS:
        draft.loading = false;
        break;
      case SEND_BASKET + FAILURE:
        draft.loading = false;
        draft.error = payload;
        break;
      case CLEAR_BASKET:
        draft.entities = {};
        break;
      default:
        return draft;
    }
  });
