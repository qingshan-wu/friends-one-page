import { useEffect, useState } from 'react'
import { screenshot } from 'assets'
import AngleSmallDown from './angle-small-down.svg'
import dayjs from 'dayjs'
import lunisolar from 'lunisolar'
import { DatePicker } from '@nextui-org/react'
import { parseDate, getLocalTimeZone } from '@internationalized/date'

const en = {
  subtitle: 'Welcome to the real world，it sucks. You’re gonna love it.',
  subtitleCn: '欢迎来到现实世界，它糟透了，你会喜欢的',
}

function Page() {
  const [day, setDay] = useState(() => dayjs())
  const lsr = lunisolar(day.valueOf())
  const dd = Math.abs(day.diff('2026-01-01', 'day'))
  const acts = lsr.theGods.getActs()

  const [pic, setPic] = useState(screenshot)
  const [subtitle, setSubtitle] = useState(en.subtitle)
  const [subtitleCn, setSubtitleCn] = useState(en.subtitleCn)
  const [good, setGood] = useState<string>(() => acts.good.slice(0, 4).join('，').substring(0, 4))

  useEffect(() => {
    fetch('/date/update', {
      method: 'POST',
    }).then(console.log)
  }, [])

  return (
    <div className="relative m-auto w-[132mm]">
      <div className="relative h-[213mm] w-[132mm] overflow-hidden shadow-2xl">
        <p className="mt-20 h-[340px] w-full">
          <img src={pic} />
        </p>
        <div className="mt-14 box-content grow px-6 text-right">
          <div
            className="text-l ml-auto w-[305px]"
            key={subtitle}
            contentEditable
            onBlur={(e) => {
              setSubtitle(e.target.textContent || '')
            }}
          >
            {subtitle}
          </div>
          <div
            className="text-l ml-auto mt-1 w-[305px]"
            key={subtitleCn}
            contentEditable
            onBlur={(e) => {
              setSubtitleCn(e.target.textContent || '')
            }}
          >
            {subtitleCn}
          </div>
        </div>
        <div className="absolute bottom-0 h-[56mm] w-full flex-col justify-between px-6">
          <div className="flex items-baseline justify-between">
            <div className="text-[80px]">{day.format('DD')}</div>
            <div>
              <span className="mr-2 text-2xl">宜</span>
              <span
                contentEditable
                key={good}
                onBlur={(e) => {
                  setGood(e.target.textContent || '')
                }}
              >
                {good}
              </span>
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
      <div className="absolute -left-24 top-0 z-20">
        <div>
          <label
            className="flex size-16 cursor-pointer select-none items-center justify-center rounded-full border-2 text-2xl"
            htmlFor="upload"
          >
            图
          </label>
          <input
            className="hidden"
            id="upload"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const imgFile = e.target.files?.[0]
              if (imgFile) {
                const url = URL.createObjectURL(imgFile)
                setPic(url)
              }
            }}
          />
        </div>
      </div>
      <div className="absolute -left-24 bottom-28 z-20">
        <div className="relative -left-20">
          <DatePicker
            label="日期"
            value={parseDate(day.format('YYYY-MM-DD'))}
            onChange={(value) => {
              setDay(dayjs(value.toDate(getLocalTimeZone())))
            }}
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setDay((prevDay) => prevDay.add(-1, 'day'))
          }}
        >
          <AngleSmallDown
            width="60"
            height="60"
            class="rotate-180"
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setDay((prevDay) => prevDay.add(1, 'day'))
          }}
        >
          <AngleSmallDown
            width="60"
            height="60"
          />
        </div>
        <button
          className="flex size-16 cursor-pointer select-none items-center justify-center rounded-full border-2 text-2xl"
          onClick={() => {
            setGood(acts.good.slice(0, 4).join('，').substring(0, 4))
          }}
        >
          宜
        </button>
      </div>
      <button
        className="relative m-auto mt-14 block w-[132mm] select-none border-2"
        onClick={() => {
          const date = {
            subtitle,
            subtitleCn,
            good,
            day,
          }
          console.log(date)
        }}
      >
        保存
      </button>
      <script type="module"></script>
    </div>
  )
}

export default Page
