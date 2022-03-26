export default () => {
  return {
    formItems: [
      {
        dataIndex: "name",
        formConfig: {
          label: "姓名",
          rules: [
            {
              required: true,
              message: `请输入`
            },
            {
              max: 30,
              message: "最长为30"
            },
            {
              pattern: /^[0-9a-zA-z_-]+$/,
              message: "格式不对"
            }
          ],
          inputConfig: {
            placeholder: "请输入",
            maxLength: 30,
            size: "large"
          }
        }
      },
      {
        dataIndex: "password",
        formConfig: {
          label: "密码",
          rules: [{ required: true, message: "Please input your username!" }],
          inputConfig: {
            placeholder: "请输入"
          }
        }
      }
    ]
  }
}
