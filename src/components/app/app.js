import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../header';
import Error from '../error';
import Success from '../success';
import Basket from '../basket';
import RestaurantsPage from '../../pages/restaurants-page';
import { UserProvider } from '../../contexts/user';

const App = () => {
  const [name, setName] = useState('Igor');

  useEffect(() => {
    setInterval(() => {
      // setName(Math.random().toString());
    }, 3000);
  }, []);

  return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Switch>
          <Route path="/checkout" component={Basket} />
          <Route path="/restaurants" component={RestaurantsPage} />
          <Route path="/error" component={Error} />
          <Route path="/success" component={Success} />
          <Route path="/" component={RestaurantsPage} />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
