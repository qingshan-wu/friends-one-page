import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import lunisolar from 'lunisolar'
import theGods from 'lunisolar/plugins/theGods'
lunisolar.extend(theGods)

createApp(App).mount('#app')
