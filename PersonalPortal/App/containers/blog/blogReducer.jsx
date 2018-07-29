import { GET_POSTS_SUCCESS, GET_POSTS_ERROR, GET_TAGS_SUCCESS, GET_TAGS_ERROR, DELETE_POST_SUCCESS, DELETE_POST_ERROR } from './blogConstants.jsx'

const initialState = {
    data: { currentPage: 0, totalPages: 0, pageSize: 0, records: [] },
    tags: [],
    error: ''
}

export default function blog(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            return {...state, data: action.payload, error: '' }

        case GET_POSTS_ERROR:
            return {...state, error: action.payload }

        case GET_TAGS_SUCCESS:
            return {...state, tags: action.payload, error: '' }

        case GET_TAGS_ERROR:
            return { ...state, error: action.payload }

        case DELETE_POST_SUCCESS:
            return { ...state }

        case DELETE_POST_ERROR:
            return { ...state, error: action.payload }

        default:
            return state;
    }
}