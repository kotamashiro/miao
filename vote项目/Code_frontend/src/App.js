import { NavLink as Link, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import CreateVote from './CreateVote'
import ViewVote from './ViewVote'
import My from './My'
import UserContext from './UserContext'
import { Suspense, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { FundViewOutlined } from '@ant-design/icons'

function App() {
  const history = useHistory()
  const userInfo = useSelector(state => state.user)
  const dispatch = useDispatch()

  async function logout() {
    dispatch({ type: 'logout' })
  }

  useEffect(() => {
    dispatch({ type: 'get-user-info' })
  }, [])


  function goback() {
    history.go(-1)
  }

  return (

    <UserContext.Provider value={{ userInfo: userInfo }}>
      <div className="App">
        <div className="appheader">{userInfo
          ? <>
            <span>欢迎，{userInfo.name}</span>
            <div className="backout">
              <button onClick={goback}>返回</button>

              <button onClick={logout}>登出</button>
            </div>
          </>
          : <>
            <Link to="/login">登陆</Link>
            <Link to="/register">注册</Link>
          </>
        }</div>


        <Switch>
          <Route path="/" exact>
            <Redirect to="/home"></Redirect>
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/create" component={CreateVote} />
          <Route path="/my" component={My} />
          <Route path="/vote/:id" component={ViewVote} >
            <Suspense fallback={'loading...'}>
              <ViewVote />
            </Suspense>
          </Route>
        </Switch>

      </div>
    </UserContext.Provider>

  );
}//Switch里面默认只渲染第一个Route，y因此标签里需要写上exact

export default App;
