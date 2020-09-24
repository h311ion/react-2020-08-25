import { replace } from 'connected-react-router';

import {
  INCREMENT,
  DECREMENT,
  REMOVE,
  ADD_REVIEW,
  LOAD_RESTAURANTS,
  LOAD_REVIEWS,
  LOAD_PRODUCTS,
  LOAD_USERS,
  REQUEST,
  SUCCESS,
  FAILURE,
  SEND_BASKET,
  CLEAR_BASKET,
} from './constants';
import {
  usersLoadingSelector,
  usersLoadedSelector,
  reviewsLoadingSelector,
  reviewsLoadedSelector,
  basketSelector,
  orderLoadingSelector,
} from './selectors';

export const increment = (id) => ({ type: INCREMENT, payload: { id } });
export const decrement = (id) => ({ type: DECREMENT, payload: { id } });
export const remove = (id) => ({ type: REMOVE, payload: { id } });

export const addReview = (review, restaurantId) => ({
  type: ADD_REVIEW,
  payload: { review, restaurantId },
  generateId: ['reviewId', 'userId'],
});

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  CallAPI: '/api/restaurants',
});

export const loadProducts = (restaurantId) => ({
  type: LOAD_PRODUCTS,
  CallAPI: `/api/products?id=${restaurantId}`,
  restaurantId,
});

export const loadReviews = (restaurantId) => async (dispatch, getState) => {
  const state = getState();
  const loading = reviewsLoadingSelector(state, { restaurantId });
  const loaded = reviewsLoadedSelector(state, { restaurantId });

  if (loading || loaded) return;
  dispatch({ type: LOAD_REVIEWS + REQUEST, restaurantId });
  try {
    const response = await fetch(
      `/api/reviews?id=${restaurantId}`
    ).then((res) => res.json());
    dispatch({ type: LOAD_REVIEWS + SUCCESS, response, restaurantId });
  } catch (error) {
    dispatch({ type: LOAD_REVIEWS + FAILURE, error, restaurantId });
    dispatch(replace('/error'));
  }
};

export const loadUsers = (restaurantId) => async (dispatch, getState) => {
  const state = getState();
  const loading = usersLoadingSelector(state);
  const loaded = usersLoadedSelector(state);

  if (loading || loaded) return;

  dispatch({ type: LOAD_USERS, CallAPI: '/api/users' });
};

export const sendBasket = () => async (dispatch, getState) => {
  const state = getState();
  const loading = orderLoadingSelector(state);

  if (loading) return;

  const postData = {
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(basketSelector(state)),
    method: 'POST',
  };

  dispatch({ type: SEND_BASKET + REQUEST });
  try {
    const resp = await fetch('/api/order', postData);
    const ok = resp.ok;
    const response = await resp.json();

    if (!ok) {
      dispatch({ type: SEND_BASKET + FAILURE, error: response });
      dispatch(replace('/error', { error: response }));
      return;
    }

    dispatch({ type: SEND_BASKET + SUCCESS, response });
    dispatch({ type: CLEAR_BASKET });
    dispatch(replace('/success'));
  } catch (error) {
    dispatch({ type: SEND_BASKET + FAILURE, error });
    dispatch(replace('/error', { error }));
  }
};
