import axios from 'axios';
import {
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_RESET,
    COMMENT_CREATE_SUCCESS,

    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,

    COMMENT_LIST_FAIL,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
} from "../Constants/CommentConstants";
// import { logout } from './UserActions';

import {URL} from "../Url";

export const commentListAction = (anime_id) => async (dispatch) => {
    try {
        dispatch({ type: COMMENT_LIST_REQUEST });
        const { data } = await axios.get(`${URL}/api/v1/comment/${anime_id}`);
        dispatch({
            type: COMMENT_LIST_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: COMMENT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
