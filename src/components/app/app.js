import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../header';
import Error from '../error';
import Success from '../success';
import Basket from '../basket';
import RestaurantsPage from '../../pages/restaurants-page';
import { UserProvider } from '../../contexts/user';
import { CurrencyProvider } from '../../contexts/currency';

const App = () => {
  const [name, setName] = useState('Igor');
  const [currency, setCurrency] = useState({ name: 'USD', sign: '$' });

  useEffect(() => {
    setInterval(() => {
      // setName(Math.random().toString());
    }, 3000);
  }, []);

  return (
    <div>
      <CurrencyProvider value={{ currency, setCurrency }}>
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
      </CurrencyProvider>
    </div>
  );
};

export default App;
