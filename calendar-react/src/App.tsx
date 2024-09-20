// import './App.css'
import Page from './components/page'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import theGods from 'lunisolar/plugins/theGods'
import lunisolar from 'lunisolar'
// import { useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import Subtitle, { Value } from './Subtitle'
import { useState } from 'react'

import locale from 'antd/locale/zh_CN'

import 'dayjs/locale/zh-cn'
import { ConfigProvider } from 'antd'
dayjs.locale('zh-cn')
// 加载插件
lunisolar.extend(theGods)

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.locale('zh-cn')

// const en = {
//   subtitle: 'Welcome to the real world，it sucks. You’re gonna love it.',
//   subtitleCn: '欢迎来到现实世界，它糟透了，你会喜欢的',
// }

function App() {
  const [subtitle, setSubtitle] = useState<Value>()
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('sw.js', {
  //         scope: './',
  //       })
  //       .then((registration) => {
  //         console.log({ registration })
  //       })
  //   }
  // }, [])
  return (
    <ConfigProvider locale={locale}>
      <NextUIProvider>
        <div className="flex">
          <div className="ml-10">
            <Subtitle onChange={setSubtitle} />
          </div>
          <Page
            subtitleCn={subtitle?.slices[0]}
            subtitle={subtitle?.slices[1]}
            currentEpisode={subtitle?.episode}
          />
        </div>
      </NextUIProvider>
    </ConfigProvider>
  )
}

export default App
