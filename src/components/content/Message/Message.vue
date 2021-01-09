<template>
  <div class="content">
    <div class="message-wrapper">
      <MessageHeader></MessageHeader>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import MessageHeader from './MessageHeader'
export default {
  name: 'Message',
  components: { MessageHeader }
}
</script>

<style lang="less">
.message-wrapper {
  height: 100%;
  display: flex;
}
.content {
  grid-area: page;
  height: 100%;
}
</style>
