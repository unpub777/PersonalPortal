import { GET_POST_SUCCESS, GET_POST_ERROR, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, CHANGE_COMMENT_AUTHOR, CHANGE_COMMENT_TEXT } from '../constants/commentsConstants.jsx'
import "isomorphic-fetch"

export function changeAuthor(author) {
    return {
        type: CHANGE_COMMENT_AUTHOR,
        payload: author
    }
}

export function changeComment(comment) {
    return {
        type: CHANGE_COMMENT_TEXT,
        payload: comment
    }
}

export function getPost(postId) {
    return (dispatch) => {
        fetch(constants.post + '?postId=' + postId)
            .then((response) => {
                return response.json()
            }).then((data) => {
                dispatch({ type: GET_POST_SUCCESS, payload: data })
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: GET_POST_ERROR, payload: ex })
            });
    }
}

export function addComment(author, comment, postId) {
    return (dispatch) => {
        fetch(constants.addComment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author: author, comment: comment, postId: postId })
        }).then((response) => {
            if (response.ok) {
                dispatch({ type: ADD_COMMENT_SUCCESS });
                getPost(postId);
            } else {
                alert('Ошибка добавления комментария');
                dispatch({ type: ADD_COMMENT_ERROR, payload: 'Ошибка добавления комментария' });
            }
        }).catch((ex) => {
            alert(ex);
            dispatch({ type: ADD_COMMENT_ERROR, payload: ex });
        });
    }
}