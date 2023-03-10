<template>
  <view class="content">
    <h1>title</h1>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
onLoad(()=>{
  
})
const title = ref('my first uniapp')
</script>

<style lang="scss" scoped>
</style>
