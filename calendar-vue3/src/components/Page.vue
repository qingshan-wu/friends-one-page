<script setup lang="ts">
import dayjs from 'dayjs'
import lunisolar from 'lunisolar'
import { computed, onMounted, ref } from 'vue'
import { screenshot } from 'assets'

const en = {
  subtitle: 'Welcome to the real world，it sucks. You’re gonna love it.',
  subtitleCn: '欢迎来到现实世界，它糟透了，你会喜欢的',
}

const day = ref(dayjs())
const subtitle = ref(en.subtitle)
const subtitleCn = ref(en.subtitleCn)
const lsr = computed(() => lunisolar(day.value.valueOf()))
const acts = computed(() => lsr.value.theGods.getActs())
const good = computed(() => acts.value.good.slice(0, 4).join('，').substring(0, 4))
const dd = computed(() => Math.abs(day.value.diff('2026-01-01', 'day')))
const pic = ref(screenshot)

function handleSave() {
  const values = {
    day: day.value.toISOString(),
    subtitle: subtitle.value,
    subtitleCn: subtitleCn.value,
    good: good.value,
    pic: pic.value,
  }
  console.log({ values })
}

function handleFileInputChange(e: Event) {
  const imgFile = (e.target as HTMLInputElement).files?.[0]
  if (imgFile) {
    const url = URL.createObjectURL(imgFile)
    pic.value = url
  }
}

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>

<template>
  <div class="relative m-auto w-[132mm]">
    <div class="relative h-[213mm] w-[132mm] overflow-hidden shadow-2xl">
      <p class="mt-20 h-[340px] w-full">
        <img :src="pic" />
      </p>
      <div class="mt-14 box-content grow px-6 text-right">
        <div
          class="text-l ml-auto w-[305px]"
          contenteditable
          :key="subtitle"
          @blur.stop="subtitle = ($event.target as HTMLDivElement).textContent || ''"
        >
          {{ subtitle }}
        </div>
        <div
          className="text-l ml-auto mt-1 w-[305px]"
          :key="subtitleCn"
          contenteditable
          @blur.stop="subtitleCn = ($event.target as HTMLDivElement).textContent || ''"
        >
          {{ subtitleCn }}
        </div>
      </div>
      <div class="absolute bottom-0 h-[56mm] w-full flex-col justify-between px-6">
        <div class="flex items-baseline justify-between">
          <div class="text-[80px]">{{ day.format('DD') }}</div>
          <div>
            <span class="mr-2 text-2xl">宜</span>
            <span
              contenteditable
              :key="good"
              @blur.stop="good = ($event.target as HTMLSpanElement).textContent || ''"
            >
              {{ good }}
            </span>
          </div>
          <div>元旦</div>
        </div>
        <div class="flex items-end justify-between">
          <div class="">
            <div>
              <span>{{ day.format('YYYY年M月') }}</span>
              <span>{{ day.format('dddd') }}</span>
            </div>
            <div>农历{{ lsr.format('lMlD') }}</div>
          </div>
          <div>距离2026年还有{{ dd }}天</div>
          <div>SEASON1-01</div>
        </div>
      </div>
    </div>
    <div class="absolute -left-24 top-0 z-20">
      <div>
        <label
          class="flex size-16 cursor-pointer select-none items-center justify-center rounded-full border-2 text-2xl"
          htmlFor="upload"
        >
          图
        </label>
        <input
          class="hidden"
          id="upload"
          type="file"
          accept="image/png, image/jpeg"
          @change="handleFileInputChange"
        />
      </div>
    </div>
    <div class="absolute -left-24 bottom-28 z-20">
      <div
        class="angle-small-down h-14 w-14 rotate-180 cursor-pointer"
        @click="day = day.add(-1, 'day')"
      ></div>
      <div
        class="angle-small-down h-14 w-14 cursor-pointer"
        @click="day = day.add(1, 'day')"
      ></div>
    </div>
    <button
      class="relative m-auto mt-14 block w-[132mm] border-2"
      @click="handleSave"
    >
      保存
    </button>
  </div>
</template>

<style scoped>
.angle-small-down {
  background: url('./angle-small-down.svg');
  background-size: cover;
}
</style>
