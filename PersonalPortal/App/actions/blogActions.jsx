import { GET_POSTS_SUCCESS, GET_POSTS_ERROR, GET_TAGS_SUCCESS, GET_TAGS_ERROR } from '../constants/blogConstants.jsx'
import "isomorphic-fetch"

export function getPosts(pageIndex = 0, tag) {
    return (dispatch) => {
        let queryTrailer = '?pageIndex=' + pageIndex;
        if (tag) {
            queryTrailer += '&tag=' + tag;
        }
        fetch(constants.page + queryTrailer)
            .then((response) => {
                return response.json()
            }).then((data) => {
                dispatch({ type: GET_POSTS_SUCCESS, payload: data })
            }).catch((ex) => {
                dispatch({ type: GET_POSTS_ERROR, payload: ex })
            });
    }
}

export function getTags() {
    return (dispatch) => {
        fetch(constants.tags)
            .then((response) => {
                return response.json()
            }).then((data) => {
                dispatch({ type: GET_TAGS_SUCCESS, payload: data })
            }).catch((ex) => {
                dispatch({ type: GET_TAGS_ERROR, payload: ex })
            });
    }
}