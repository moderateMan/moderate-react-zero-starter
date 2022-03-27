import React, { useState } from 'react'
import styles from './index.module.scss'
import { Layout, Card, Button, Row, Input, Form } from 'antd'
import { useAppSelector } from '@STORE/hooks'
import { useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount
} from '@STORE/slices/login'

interface PropsT {
  [key: string]: any
}

interface FcStateT {
  amount1: number
  amount2: number
}

const TYPES = {
  increment: 'increment',
  decrement: 'decrement',
  handThunk: 'handThunk',
  incrementByAmount: 'incrementByAmount',
  apiThunk: 'apiThunk'
}

const Center: React.FC<PropsT> = () => {
  const [fcState, setFcState] = useState<FcStateT>({
    amount1: 0,
    amount2: 0
  })
  const setState = (data: Partial<FcStateT>) => {
    setFcState({
      ...fcState,
      ...data
    })
  }
  const count = useAppSelector(selectCount)
  const dispatch = useDispatch()
  const handleClick = (type: string, payload?: any) => {
    let action
    if (type === TYPES.decrement) {
      action = increment()
    } else if (type === TYPES.increment) {
      action = decrement()
    } else if (type === TYPES.incrementByAmount) {
      action = incrementByAmount(payload)
    } else if (type === TYPES.handThunk) {
      action = incrementIfOdd(payload)
    } else if (type === TYPES.apiThunk) {
      action = incrementAsync(payload)
    }
    dispatch(action)
  }
  return (
    <Layout className={styles.layout}>
      <Card className={styles.login_table}>{count}</Card>
      <Row>
        <Card title={'reducer'}>
          <Form.Item label="变量">
            <Input
              value={fcState.amount1}
              onChange={e => {
                setState({ amount1: Number(e.target.value) })
              }}
            />
          </Form.Item>
          <Button
            onClick={() => {
              handleClick('increment')
            }}
          >
            +
          </Button>
          <Button
            onClick={() => {
              handleClick('decrement')
            }}
          >
            -
          </Button>
          <Button
            onClick={() => {
              handleClick('incrementByAmount', fcState.amount1)
            }}
          >
            传值的action
          </Button>
        </Card>
        <Card title={'thunk'}>
          <Form.Item label="变量">
            <Input
              value={fcState.amount2}
              onChange={e => {
                setState({ amount2: Number(e.target.value) })
              }}
            />
          </Form.Item>
          <Button
            onClick={() => {
              handleClick('incrementByAmount', fcState.amount2)
            }}
          >
            手写
          </Button>
          <Button
            onClick={() => {
              handleClick('incrementByAmount', fcState.amount2)
            }}
          >
            api创建
          </Button>
        </Card>
      </Row>
    </Layout>
  )
}

export default Center
