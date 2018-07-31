import { GET_POSTS_SUCCESS, GET_POSTS_ERROR, GET_TAGS_SUCCESS, GET_TAGS_ERROR, DELETE_POST_SUCCESS, DELETE_POST_ERROR } from './blogConstants.jsx'
import AuthHelper from '../../Utils/authHelper'
import "isomorphic-fetch"

export function getPosts(pageIndex = 0, tag) {
    return (dispatch) => {
        let queryTrailer = '?pageIndex=' + pageIndex;
        if (tag) {
            queryTrailer += '&tag=' + tag;
        }
        fetch(window.constants.page + queryTrailer)
            .then((response) => {
		        return response.json();
	        }).then((data) => {
                dispatch({ type: GET_POSTS_SUCCESS, payload: data });
            }).catch((ex) => {
                dispatch({ type: GET_POSTS_ERROR, payload: ex });
            });
    }
}

export function getTags() {
    return (dispatch) => {
        fetch(window.constants.tags)
            .then((response) => {
                return response.json();
            }).then((data) => {
                dispatch({ type: GET_TAGS_SUCCESS, payload: data });
            }).catch((ex) => {
                dispatch({ type: GET_TAGS_ERROR, payload: ex });
            });
    }
}

export function deletePost(postId, returnPageIndex, returnTag) {
    return (dispatch) => {
        let token = AuthHelper.getToken();
        fetch(window.constants.post + '?postId=' + postId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if (response.ok) {
                dispatch({ type: DELETE_POST_SUCCESS });
                getPosts(returnPageIndex, returnTag)(dispatch);
            } else {
                alert('Ошибка удаления записи');
                dispatch({ type: DELETE_POST_ERROR, payload: 'Ошибка удаления записи' });
            }
        }).catch((ex) => {
            dispatch({ type: DELETE_POST_ERROR, payload: ex });
        });
    }
}