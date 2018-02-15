import { combineReducers } from 'redux'
import blog from './blogReducer.jsx'
import header from './headerReducer.jsx'
import comments from './commentsReducer.jsx'
import newPost from './newPostReducer.jsx'

export default combineReducers({
    blog,
    header,
    comments,
    newPost
})