import React from "react";
import styles from "./index.module.scss";
import requset from '@COMMON/reuqest'
import { Button, Layout, Card } from "antd";
export default () => {
  const fetchRegister =()=>{
    requset.post('/api/users/register',{
      username:1,
      password:2
    }).then((data:any)=>{
      alert("ok")
    })
  }
  return (
    <Layout className={styles.layout}>
        <Card className={styles.login_table}>
          <Button>登陆</Button>
          <Button onClick={()=>{
            fetchRegister()
          }}>注册</Button>
        </Card>
    </Layout>
  );
};
