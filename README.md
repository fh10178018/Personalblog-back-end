## 介绍
该项目是个人博客后端，基于Vue3.0，本人认为学习前端，还有一个重要的部分，就是组件化开发，如果只是单单的使用第三方组件，在遇到复杂的业务情况下，往往会无从下手。

同时理解的越深入，也能够理解和学习他人在构造通用组件的逻辑思维，就比如子组件的 Input value 数据更新，通常不是直接去修改,而是同过`emit`方式修改父组件的值，子组件再去监听该值变化，进而去修改，个人认为这种单向数据更新操作，减少了数据操作的错误几率。当然有很多，就不一一列举了。

所以本着学习和实践的态度去做，不用任何第三方组件，同时也做一下单元测试，方便理解。

接口数据来源于我做的一个后端express项目，链接为：<https://github.com/fh10178018/backend-services.git>

前端项目为React项目，链接为：<https://github.com/fh10178018/persnoal-frontage.git>
  
本项目链接为：<https://github.com/fh10178018/Personalblog-back-end.git>


## 本项目参考内容
* 通用组件样式学习，源于element组件

* icon来源于fontawesome

## 安装依赖
`npm install`

## 启动
`npm run serve`
