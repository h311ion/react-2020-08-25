import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Restaurants from '../components/restaurants';
import Loader from '../components/loader';
import {
  restaurantsListSelector,
  restaurantsLoadingSelector,
  restaurantsLoadedSelector,
} from '../redux/selectors';
import { loadRestaurants } from '../redux/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

function RestaurantsPage({
  restaurants,
  loadRestaurants,
  loading,
  loaded,
  match,
  history,
}) {
  useEffect(() => {
    if (!loading && !loaded) loadRestaurants();
  }, []); // eslint-disable-line

  if (loading || !loaded) return <Loader />;

  if (match.isExact) {
    const id = restaurants[0].id;

    return (
      <Redirect
        exact
        from="/restaurants/:restId"
        to={`/restaurants/${id}/menu`}
      />
    );
  }

  return <Route path="/restaurants/:restId" component={Restaurants} />;
}

export default connect(
  createStructuredSelector({
    restaurants: restaurantsListSelector,
    loading: restaurantsLoadingSelector,
    loaded: restaurantsLoadedSelector,
  }),
  { loadRestaurants }
)(RestaurantsPage);
