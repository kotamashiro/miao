import { useContext } from 'react'
import axios from 'axios'
import UserContext from './UserContext'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd';


function Login({ history }) {//这些use要放在下方函数的外层
  var history = useHistory()
  var userCtx = useContext(UserContext)
  var dispatch = useDispatch()

  async function login(FormData) {
    var username = FormData.username
    var password = FormData.password
    axios.post('/account/login', {
      name: username,
      password: password,
    }).then(res => {
      dispatch({
        type: 'user-info',
        user: res.data
      })
      history.push('/home')
    }).catch(e => {
      alert(e.toString())
    })
  }


  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={login}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input

          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
      </Button>

      </Form.Item>
    </Form>

    // Username:<input type="text" ref={usernameRef} />
    // Password:<input type="text" ref={passwordRef} />


  )
}

export default Login