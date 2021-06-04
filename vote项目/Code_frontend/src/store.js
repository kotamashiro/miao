import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { put, take, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

const saga = createSagaMiddleware()


const initialState = {
  user: null,
  votes: {},
  tryLogin: false,//尝试登陆但没成功为真
}

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case 'user-info':
      return {
        ...state,
        user: action.user,
      }
    case 'remove-user-info':
      return {
        ...state,
        user: null
      }
    case 'try-login-failed':
      return {
        ...state,
        tryLogin: true
      }
    default:
      return state
  }
}, applyMiddleware(saga))
export default store

function* getUserInfo(action) {
  try {
    var res = yield axios.get('/account/userinfo')
    yield put({ type: 'user-info', user: res.data })
  } catch (e) {
    yield put({ type: 'try-login-failed' })
  }
}
function* login(action) {
  try {//登陆可能失败
    var res = yield axios.post('/account/login', {
      name: action.name,
      password: action.password,
    })
    yield put({ type: 'user-info', user: res.data })
  } catch (e) {
    throw e
  }
}

function* logout(action) {
  var res = yield axios.get('/account/logout')
  yield put({ type: 'remove-user-info' })

}

function* rootSaga() {
  yield takeEvery('get-user-info', getUserInfo)
  yield takeEvery('login', login)
  yield takeEvery('logout', logout)
}
saga.run(rootSaga)