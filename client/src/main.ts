/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-09-05 19:29:39
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-09 22:42:31
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Socketio from "./plugins/Socket.io";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App);

app.use(Socketio, {
  connection: "http://localhost:8000",
  options: {
    autoConnect: false, //关闭自动连接
    // ...其它选项
  },
});

app.use(ElementPlus)

app.mount('#app')
