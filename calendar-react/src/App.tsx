// import './App.css'
import Page from './components/page'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import theGods from 'lunisolar/plugins/theGods'
import lunisolar from 'lunisolar'
// 加载插件
lunisolar.extend(theGods)

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

function App() {
  return (
    <div>
      <Page />
    </div>
  )
}

export default App
