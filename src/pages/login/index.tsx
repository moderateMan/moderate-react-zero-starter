import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import requset from '@COMMON/reuqest'
import { Button, Layout, Card, Form, Row } from 'antd'
import { FormItem } from '@COMMON/components'
import toConfig from './config'
import { useNavigate } from 'react-router-dom'
import Upload from './upload'

interface PropsT {
  [key: string]: any
}

const Login: React.FC<PropsT> = () => {
  const navigate = useNavigate()
  const [config, setConfig] = useState<any>({})
  const [isLogin, setIsLogin] = useState<boolean>(false)
  useEffect(() => {
    setConfig(toConfig())
  }, [])
  const fetchRegister = () => {
    requset
      .post('/api/users/register', {
        username: 1,
        password: 2
      })
      .then(() => {
        setIsLogin(true)
      })
      .catch(() => {
        setIsLogin(false)
      })
  }
  return (
    <Layout className={styles.layout}>
      <Card className={styles.login_table}>
        <Form>
          {config.formItems?.map((item: any, index: number) => {
            return <FormItem {...item} key={index}></FormItem>
          })}
        </Form>
        <div role={isLogin ? 'infoOk' : 'infoNologin'}>
          {isLogin ? '登陆成功' : '未登陆'}
        </div>
        <Row style={{ marginTop: 20 }} justify="center">
          <Button
            style={{ marginRight: 20 }}
            onClick={() => {
              navigate('/subReact')
            }}
          >
            登陆
          </Button>
          <Button
            role="register"
            onClick={() => {
              fetchRegister()
            }}
          >
            注册
          </Button>
          <Upload></Upload>
        </Row>
      </Card>
    </Layout>
  )
}

export default Login
