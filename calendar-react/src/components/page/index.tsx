import { useState } from 'react'
import style from './style.module.less'
import { screenshot } from 'assets'
import dayjs from 'dayjs'
import lunisolar from 'lunisolar'

function Page() {
  const [day, setDate] = useState(() => dayjs())
  const lsr = lunisolar(day.valueOf())
  const dd = Math.abs(day.diff('2026-01-01', 'day'))
  const acts = lsr.theGods.getActs()
  console.log(day.diff('2026-01-01', 'day'))
  console.log({ lsr })

  return (
    <div>
      <div className={style.box}>
        <p>
          <img
            src={screenshot}
            className={style.screenshot}
          />
        </p>
        <div className={style.dateContainer}>
          <div className="text-[80px]">{day.format('DD')}</div>
          <div>{day.format('YYYY年M月')}</div>
          <div>{day.format('dddd')}</div>
          <div>农历{lsr.format('lMlD')}</div>
        </div>
        <div>距离2026年还有{dd}天</div>
        <div>宜：{acts.good.slice(0, 4).join('，')}</div>
        <div>忌：{acts.bad.slice(0, 4).join('，')}</div>
      </div>
      {/* <input
        type="date"
        onChange={(e) => {
          console.log(e)
        }}
      /> */}
    </div>
  )
}

export default Page
