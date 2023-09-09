<!--
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-09-05 19:29:39
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-09-09 23:21:29
-->
<template>
  <!-- <span>{{socketTest_EventBackData}}</span> -->
  <div class="content">
    <div class="left">
      <ul>
        <li @click="join('111')">test1</li>
        <li @click="join('222')">test2</li>
      </ul>
    </div>
    <div class="right">
      <div class="content">
        <li v-for="item in messageList" >{{item}}</li>
      </div>
      <div class="contentInput">
        <el-input style="height: 30px;" v-model="input" placeholder="Please input" />
        <el-button type="primary" @click="sss">提交</el-button>
      </div>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, Ref } from 'vue';

import { Socket } from 'socket.io-client';
const input = ref('')
const socket = inject('socket') as Socket;

const checkRoomId = ref('')

const messageList: Ref<string[]> = ref([])


const join = (roomId: string) => {
  console.log('输出',  roomId)
  checkRoomId.value = roomId
  socket.emit('joinRoom', { id: roomId });

}

const sss = () => {
  console.log('输出',  input.value)
  socket.emit('sendMessage', { id: checkRoomId.value, message: input.value });
}

socket.on('message', (data: string) => {
    console.log('输出', data);
    messageList.value.push(data)
  });

onMounted(() => {
  socket.connect();
  // socket.emit('socketTest', {a:1});


  // socket.emit('socketTest_Event', { test: '转发示例' })
  // socket.emit('socketTest_Event', { test: '转发示例2' })
});

onMounted(() => {});
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  width: 200px;
  height: 100%;
  border: 1px solid #cccccc;
  display: flex;
  flex-direction: column;

}
.left li {
  height: 40px;
  cursor: pointer;
  border-bottom: 1px solid #cccccc;
}
.right {
  height: 100%;
  display: flex;
  width: calc(100% - 200px);
  flex-direction: column;
}
.right .content {
  width: 100%;
  height: 80%;
  border-bottom: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
}
.right .contentInput {
  width: 100%;
  height: 20%;
  display: flex;
}
</style>
