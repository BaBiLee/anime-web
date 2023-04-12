import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    commentListReducer,
    commentCreateReducer,
    commentDeleteReducer,
} from './Reducers/CommentReducers';

const reducer = combineReducers({
    commentList: commentListReducer,
    commentCreate: commentCreateReducer,
    commentDelete: commentDeleteReducer,
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;