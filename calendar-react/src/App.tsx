// import './App.css'
import Page from './components/page'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import theGods from 'lunisolar/plugins/theGods'
import lunisolar from 'lunisolar'
// import { useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
// 加载插件
lunisolar.extend(theGods)

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

function App() {
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
    <NextUIProvider>
      <Page />
    </NextUIProvider>
  )
}

export default App
