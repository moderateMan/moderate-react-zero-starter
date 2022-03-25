module.exports= {
    '/api':{
        target:'http://localhost:3060',
        pathRewrite:{'/api':''} // 把/api 替换为空
    }
}