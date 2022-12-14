import { createStore,applyMiddleware,compose } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';
import { setAuthorizotionHeader } from '../api/ApiCalls';

const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const hoaxAuth =  secureLS.get('hoax-auth');
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        password: undefined,
        image: undefined
    }
    if(hoaxAuth){
     return hoaxAuth;
    }
    return stateInLocalStorage;
}
const updateStateInStorage = (newState) => {
    secureLS.set('hoax-auth',newState);
}

const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizotionHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
     const store = createStore(authReducer,getStateFromStorage(),composeEnhancers(applyMiddleware(thunk)));
        store.subscribe(() => {
            updateStateInStorage(store.getState());
            setAuthorizotionHeader(store.getState());
        });
     return store;
}

export default configureStore;