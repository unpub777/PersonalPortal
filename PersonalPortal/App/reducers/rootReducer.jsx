import { combineReducers } from 'redux'
import blog from '../containers/blog/blogReducer.jsx'
import header from '../containers/header/headerReducer.jsx'
import comments from '../containers/comments/commentsReducer.jsx'
import newPost from '../containers/newPost/newPostReducer.jsx'

export default combineReducers({
    blog,
    header,
    comments,
    newPost
})