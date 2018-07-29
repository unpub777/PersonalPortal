import { GET_POST_SUCCESS, GET_POST_ERROR, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, CHANGE_COMMENT_AUTHOR, CHANGE_COMMENT_TEXT } from './commentsConstants.jsx'

const initialState = {
    post: { tags: [], comments: [] },
    author: '',
    comment: '',
    error: ''
}

export default function comments(state = initialState, action) {
    switch (action.type) {
        case GET_POST_SUCCESS:
            return { ...state, post: action.payload, error: '' }

        case GET_POST_ERROR:
            return { ...state, error: action.payload }

        case ADD_COMMENT_SUCCESS:
            return { ...state, author: '', comment: '', error: '' }

        case ADD_COMMENT_ERROR:
            return { ...state, error: action.payload }

        case CHANGE_COMMENT_AUTHOR:
            return { ...state, author: action.payload }

        case CHANGE_COMMENT_TEXT:
			return { ...state, comment: action.payload }

        default:
            return state;
    }
}