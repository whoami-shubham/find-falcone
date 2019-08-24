import {createStore,applyMiddleware} from 'redux'
import { default as thunk } from 'redux-thunk';
import appReducer from './components/reducers/appReducer'
const middleware = [thunk]
export default createStore(
                appReducer,
                applyMiddleware(...middleware)
            );