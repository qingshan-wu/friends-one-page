import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import lunisolar from 'lunisolar'
import theGods from 'lunisolar/plugins/theGods'
import 'dayjs/locale/zh-cn'

lunisolar.extend(theGods)

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const app = createApp(App)
app.mount('#app')
