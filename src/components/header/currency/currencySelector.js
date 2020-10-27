import React, { useContext } from 'react';
import { currencyContext } from '../../../contexts/currency';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { sendBasket } from '../../../redux/actions';

function CurrencySelector() {
  const { currency, setCurrency } = useContext(currencyContext);
  const { sign } = currency;

  function onChangeFunction({ target }) {
    const { value } = target;
    if (sign !== value) {
      console.log(sign, value);
      setCurrency(value);
    }
  }

  return (
    <select onChange={onChangeFunction}>
      <option name="USD" value="$">
        $
      </option>
      <option name="RUB" value="₽">
        ₽
      </option>
      <option name="EUR" value="€">
        €
      </option>
    </select>
  );
}

export default connect(createStructuredSelector({}))(CurrencySelector);
