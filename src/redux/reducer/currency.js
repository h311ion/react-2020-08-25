import produce from 'immer';

const initialState = {
  entities: {
    USD: { name: 'USD', sign: '$' },
    RUB: { name: 'RUB', sign: '₽' },
    EUR: { name: 'EUR', sign: '$' },
  },
  selectedId: 'USD',
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    return draft;
  });
