import { GET_POST_SUCCESS, GET_POST_ERROR, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, CHANGE_COMMENT_AUTHOR, CHANGE_COMMENT_TEXT } from './commentsConstants.jsx'
import AuthHelper from '../../Utils/authHelper'
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
		fetch(window.constants.post + '?postId=' + postId)
            .then((response) => {
				return response.json();
			}).then((data) => {
		        dispatch({ type: GET_POST_SUCCESS, payload: data });
	        }).catch((ex) => {
                alert(ex);
		        dispatch({ type: GET_POST_ERROR, payload: ex });
	        });
    }
}

export function addComment(author, comment, postId) {
	return (dispatch) => {
		if (author && comment) {
			fetch(window.constants.comment,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ author: author, comment: comment, postId: postId })
				}).then((response) => {
				if (response.ok) {
					dispatch({ type: ADD_COMMENT_SUCCESS });
					getPost(postId)(dispatch);
				} else {
					alert('Ошибка добавления комментария');
					dispatch({ type: ADD_COMMENT_ERROR, payload: 'Ошибка добавления комментария' });
				}
			}).catch((ex) => {
				alert(ex);
				dispatch({ type: ADD_COMMENT_ERROR, payload: ex });
			});
		} else {
			alert('Необходимо заполнить имя автора и тело комментария');
			dispatch({ type: ADD_COMMENT_ERROR, payload: 'Ошибка добавления комментария' });
		}
	}
}

export function deleteComment(commentId, postId) {
	return (dispatch) => {
		let token = AuthHelper.getToken();
		fetch(window.constants.comment + '?commentId=' + commentId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		}).then((response) => {
			if (response.ok) {
				getPost(postId)(dispatch);
			} else {
				alert('Ошибка удаления комментария');
			}
		}).catch((ex) => {
			alert(ex);
		});
	}
}

export function deletePost(postId, historyObject) {
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
				historyObject.push('/');
			} else {
				alert('Ошибка удаления записи');
			}
		}).catch((ex) => {
			alert(ex);
		});
	}
}