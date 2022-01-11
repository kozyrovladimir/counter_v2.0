import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {counterReducer} from "./reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>;

let preloadedState;
const presistedState = localStorage.getItem('state');
if (presistedState) {
    preloadedState = JSON.parse(presistedState);
}

const rootReducer = combineReducers({
    counter: counterReducer
});

export const store = createStore(rootReducer, preloadedState ,applyMiddleware(thunk));
//debugger
store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
})