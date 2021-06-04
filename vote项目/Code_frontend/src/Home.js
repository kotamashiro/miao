import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons';


export default function Home() {
  var history = useHistory()
  var user = useSelector(state => state.user)
  var tried = useSelector(state => state.tryLogin)

  var dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if (user) {
        return
      }
      if (tried) {
        history.push('/login')
      }
      if (!user) {
        dispatch({ type: 'get-user-info' })
      }
    })()
  }, [user, tried])


  return (
    <div className="chice">
      <section >

        <div className="singleChice">
          <img src='signal.png' className="imga" />
          <Link to="/create"> <Button type="primary" block>创建单选</Button></Link></div>
        <div className="multiChice">
          <img src='mult.png' className="imgb" />
          <Link to="/create?multiSelect"><Button type="primary" block>创建多选</Button></Link></div>
      </section>
      <div className="footer">

        <div className="footleft" >

          <FileTextOutlined style={{ color: '#1890ff' }} />
          <Link to="/home">创建</Link>
        </div>
        <div className="footright">
          <UserOutlined />
          <Link to="/my">我的</Link>
        </div>
      </div>
    </div>
  )
}