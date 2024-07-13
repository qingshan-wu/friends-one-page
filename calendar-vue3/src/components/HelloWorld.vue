<script setup lang="ts">
import dayjs from 'dayjs'
import lunisolar from 'lunisolar'
import { ref } from 'vue'
import { screenshot } from 'assets'

const day = ref(dayjs())
const lsr = lunisolar(day.value.valueOf())
const acts = lsr.theGods.getActs()
console.log({ lsr })

const dd = Math.abs(day.value.diff('2026-01-01', 'day'))
console.log(day.value)
</script>

<template>
  <div>
    <div class="box">
      <p>
        <img
          :src="screenshot"
          class="screenshot"
        />
      </p>
      <div class="dateContainer">
        <div>{{ day.format('DD') }}</div>
        <div>{{ day.format('YYYY年M月') }}</div>
        <div>{{ day.format('dddd') }}</div>
        <div>农历{{ lsr.format('lMlD') }}</div>
      </div>
      <div>距离2026年还有{{ dd }}天</div>
      <div>宜：{{ acts.good.slice(0, 4).join('，') }}</div>
      <div>忌：{{ acts.bad.slice(0, 4).join('，') }}</div>
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 433px;
  height: 646px;
  box-shadow: 10px 5px 5px grey;
  margin: auto;
  border: 1px solid grey;
  padding-top: 74px;
}
.screenshot {
  width: 100%;
}
</style>
