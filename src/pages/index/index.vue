<template>
  <view :class="ns.b()">
  </view>
</template>

<script setup lang="ts">
import { useNamespace } from '@/core/hooks/useNameSpace'
const ns = useNamespace('home');
</script>

<style lang="scss" scoped>
$ns: home;

@include block($ns) {
  width: 750rpx;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
