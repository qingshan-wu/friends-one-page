<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  width: String,
  height: String,
})

const iconId = computed(() => `#${props.icon}`)
</script>

<template>
  <svg
    :width="width"
    :height="height"
  >
    <use :xlink:href="iconId" />
  </svg>
</template>
