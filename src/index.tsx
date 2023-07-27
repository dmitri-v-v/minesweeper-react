import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

import Minesweeper from 'components/Minesweeper';
import rootReducer from 'store/rootReducer'

import './index.scss';

const store = configureStore({
  reducer: rootReducer,
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <Minesweeper />
  </Provider>
);
