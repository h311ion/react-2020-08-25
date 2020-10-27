import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './basket.module.css';
import './basket.css';
import BasketRow from './basket-row';
import BasketItem from './basket-item';
import Button from '../button';
import {
  orderProductsSelector,
  totalSelector,
  orderLoadingSelector,
} from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';
import { sendBasket } from '../../redux/actions';
import Loader from '../loader';
import { currencyContext } from '../../contexts/currency';

function Basket({
  title = 'Basket',
  sendBasket,
  match,
  total,
  orderProducts,
  orderLoadingSelector,
}) {
  const isOnCheckoutPage = Boolean(match && match.isExact);

  // const { name } = useContext(userContext);
  const { currency } = useContext(currencyContext);
  const { sign } = currency;

  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  const checkoutFunction = isOnCheckoutPage ? sendBasket : null;
  const buttonText = isOnCheckoutPage ? 'Place order' : 'Proceed to checkout';

  return (
    <div className={styles.basket}>
      <h4 className={styles.title}>
        {/* {`${name}'s basket`} */}
        <UserConsumer>{({ name }) => `${name}'s basket`}</UserConsumer>
      </h4>
      <TransitionGroup>
        {orderProducts.map(({ product, amount, subtotal, restaurantId }) => (
          <CSSTransition
            key={product.id}
            timeout={500}
            classNames="basket-item-animation"
          >
            <BasketItem
              product={product}
              amount={amount}
              subtotal={subtotal}
              restaurantId={restaurantId}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <hr className={styles.hr} />
      <BasketRow label="Sub-total" content={`${total} ${sign}`} />
      <BasketRow label="Delivery costs:" content="FREE" />
      <BasketRow label="total" content={`${total} ${sign}`} bold />
      <Link to="/checkout">
        <Button
          primary
          block
          onClick={checkoutFunction}
          disabled={orderLoadingSelector}
        >
          {orderLoadingSelector ? <Loader /> : buttonText}
        </Button>
      </Link>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    total: totalSelector,
    orderProducts: orderProductsSelector,
    orderLoadingSelector,
  }),
  { sendBasket }
)(Basket);
