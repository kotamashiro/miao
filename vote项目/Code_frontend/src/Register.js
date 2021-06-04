import axios from 'axios'
import { useState } from 'react'
import { Form, Input, Button, Upload } from 'antd';

import { useHistory } from 'react-router'
import ImgCrop from 'antd-img-crop'


function Register() {
  const history = useHistory()

  async function onFinish(info) {
    try {
      await axios.post('/account/register', {
        name: info.name,
        password: info.password,
        gender: info.gender,
        email: info.email,
        avatar: fileList[0].response.url,
      })
      alert('注册成功')
      history.push('/login')
    } catch (e) {
      console.log(e.toString())
    }
  }


  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (

    <Form
      name="register"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"

      >
        <Input />
      </Form.Item>


      <Form.Item
        name="password"
        label="Password"

      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"

      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"

      >
        <Input />
      </Form.Item>

      <ImgCrop rotate>
        <Upload
          action="/upload"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && '+ 头像'}
        </Upload>
      </ImgCrop>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>

  )
}

export default Register