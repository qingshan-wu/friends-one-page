import { useState } from 'react'
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
    <div className="relative m-auto h-[213mm] w-[132mm] overflow-hidden shadow-2xl">
      <p className="mt-20 h-[340px] w-full">
        <img src={screenshot} />
      </p>
      <div className="mt-14 w-full grow px-6 text-right">
        <div className="text-l">Welcome to the real world，it sucks.</div>
        <div className="text-l">You’re gonna love it.</div>
        <div className="text-l mt-1">欢迎来到现实世界，它糟透了，你会喜欢的</div>
      </div>
      <div className="absolute bottom-0 h-[56mm] w-full flex-col justify-between px-6">
        <div className="flex items-baseline justify-between">
          <div className="text-[80px]">{day.format('DD')}</div>
          <div>
            <span className="mr-2 text-2xl">宜</span>
            <span>{acts.good.slice(0, 4).join('，').substring(0, 4)}</span>
          </div>
          <div>元旦</div>
        </div>
        <div className="flex items-end justify-between">
          <div className="">
            <div>
              <span>{day.format('YYYY年M月')}</span>
              <span>{day.format('dddd')}</span>
            </div>
            <div>农历{lsr.format('lMlD')}</div>
          </div>
          <div>距离2026年还有{dd}天</div>
          <div>SEASON1-01</div>
        </div>
        {/* <div>忌：{acts.bad.slice(0, 4).join('，')}</div> */}
      </div>
    </div>
  )
}

export default Page
