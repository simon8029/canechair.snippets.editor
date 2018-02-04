import rootReducer from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import Thunk from 'redux-thunk';

export default function Store() {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(
                Thunk,
                reduxImmutableStateInvariant()
            ),
            (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
        )
    );
}
