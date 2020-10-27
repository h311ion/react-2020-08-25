import { createContext } from 'react';

export const currencyContext = createContext({
  currency: {},
  setCurrency: () => {},
});
export const CurrencyConsumer = currencyContext.Consumer;
export const CurrencyProvider = currencyContext.Provider;
