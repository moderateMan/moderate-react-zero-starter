import React from "react";
import styles from "./index.module.scss";
import { Button, Layout, Card } from "antd";
export default () => {
  return (
    <Layout className={styles.layout}>
        <Card >
            <Button>登陆</Button>
            <Button>注册</Button>
        </Card>
    </Layout>
  );
};
