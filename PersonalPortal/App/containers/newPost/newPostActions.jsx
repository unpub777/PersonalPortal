import { ADD_POST_SUCCESS, ADD_POST_ERROR, CHANGE_HEADER, CHANGE_BODY, CHANGE_TAGS } from './newPostConstants.jsx'
import AuthHelper from '../../Utils/authHelper'
import "isomorphic-fetch"

export function changeHeader(text) {
    return {
        type: CHANGE_HEADER,
        payload: text
    }
}

export function changeBody(text) {
    return {
        type: CHANGE_BODY,
        payload: text
    }
}

export function changeTags(text) {
    return {
        type: CHANGE_TAGS,
        payload: text
    }
}

export function addPost(header, body, tags, historyObject) {
    return (dispatch) => {
        let token = AuthHelper.getToken();
        if (header && body && token) {
            fetch(constants.post, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ header: header, body: body, tags: tags ? tags.split(',').map((tag) => tag.trim()) : null })
            }).then((response) => {
                if (response.ok) {
                    dispatch({ type: ADD_POST_SUCCESS });
                    historyObject.push('/');
                } else {
                    alert('Ошибка добавления записи');
                    dispatch({ type: ADD_POST_ERROR, payload: 'Ошибка добавления записи' });
                }
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: ADD_POST_ERROR, payload: ex });
            });
        } else {
            if (!token) {
                alert('Необходимо залогиниться');
                dispatch({ type: ADD_POST_ERROR, payload: 'Необходимо залогиниться' });
            }
            else if (!header || !body) {
                alert('Необходимо заполнить заголовок и тело новой записи');
                dispatch({ type: ADD_POST_ERROR, payload: 'Необходимо заполнить заголовок и тело новой записи' });
            }
        }
    }
}
