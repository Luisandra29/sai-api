import { applyMiddleware, combineReducers, compose, createStore  } from 'redux';
import { routerMiddleware, connectRouter  } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork  } from 'redux-saga/effects';
import {
  adminReducer,
  adminSaga,
} from 'react-admin';
import {
  notificationsReducer,
  fetchReducer,
  errorsReducer,
  userReducer
} from './reducers';  
import customSagas from './sagas';

export default ({
  dataProvider,
  history,
}) => {
  const reducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    user: userReducer, 
    fetch: fetchReducer, 
    notifications: notificationsReducer,
    errors: errorsReducer
  });

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider),
        customSagas
      ].map(fork)
    );
  };
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;

  const store = createStore(reducer, {}, composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        // add your own middlewares here
      ),
      // add your own enhancers here
    ),        
  );

  sagaMiddleware.run(saga);
  return store;
};
