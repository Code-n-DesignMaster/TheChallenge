import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import ItemList from './components/ItemList';
import ItemListSort from './components/ItemListSort';

const store = configureStore();

render(
    <Provider store={store}>
        <div>
            <ItemList />
            <hr/>
            <ItemListSort/>
        </div>
    </Provider>,
    document.getElementById('app')
);
