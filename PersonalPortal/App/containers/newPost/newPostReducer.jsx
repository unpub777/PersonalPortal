import { ADD_POST_SUCCESS, ADD_POST_ERROR, CHANGE_HEADER, CHANGE_BODY, CHANGE_TAGS } from './newPostConstants.jsx'

const initialState = {
    header: '',
    body: '',
    tags: '',
    error: ''
}

export default function newPost(state = initialState, action) {
    switch (action.type) {
        case ADD_POST_SUCCESS:
            return { ...state, header: '', body: '', tags: '', error: '' }

        case ADD_POST_ERROR:
            return { ...state, error: action.payload }

        case CHANGE_HEADER:
            return { ...state, header: action.payload }

        case CHANGE_BODY:
            return { ...state, body: action.payload }

        case CHANGE_TAGS:
            return { ...state, tags: action.payload }

        default:
            return state;
    }
}