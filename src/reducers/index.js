import { combineReducers } from 'redux';

// The initial state of the App
const initialState = {
    loading: false,
    error: false,
    currentUser: false,
    userData: {
      repositories: false,
    },
}

const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';;
  
function appReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_REPOS:
        return state
          .set('loading', true)
          .set('error', false)
          .setIn(['userData', 'repositories'], false);
      case LOAD_REPOS_SUCCESS:
        return state
          .setIn(['userData', 'repositories'], action.repos)
          .set('loading', false)
          .set('currentUser', action.username);
      case LOAD_REPOS_ERROR:
        return state.set('error', action.error).set('loading', false);
      default:
        return state;
    }
}

const rootReducer = combineReducers({
    appReducer
});
  
export default rootReducer;