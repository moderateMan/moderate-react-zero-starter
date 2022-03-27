import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import requset from '@COMMON/reuqest'
import { Button, Layout, Card, Form, Row } from 'antd'
import { FormItem } from '@COMMON/components'
import toConfig from './config'
import { useNavigate } from 'react-router-dom'

interface PropsT {
  [key: string]: any
}

const Login: React.FC<PropsT> = () => {
  const navigate = useNavigate()
  const [config, setConfig] = useState<any>({})
  useEffect(() => {
    setConfig(toConfig())
  }, [])
  const fetchRegister = () => {
    console.log('123123')
    requset
      .post('/api/users/register', {
        username: 1,
        password: 2
      })
      .then((data: any) => {
        alert('ok' + data)
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
        <Row style={{ marginTop: 20 }} justify="center">
          <Button
            style={{ marginRight: 20 }}
            onClick={() => {
              navigate('/center')
            }}
          >
            登陆
          </Button>
          <Button
            onClick={() => {
              fetchRegister()
            }}
          >
            注册
          </Button>
        </Row>
      </Card>
    </Layout>
  )
}

export default Login
