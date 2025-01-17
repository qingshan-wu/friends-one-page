import { useMemo, useRef, useState } from 'react'
import { screenshot } from 'assets'
import AngleSmallDown from './angle-small-down.svg?react'
import dayjs from 'dayjs'
import lunisolar from 'lunisolar'
// import { DatePicker } from '@nextui-org/react'
// import { parseDate, getLocalTimeZone } from '@internationalized/date'
import html2canvas from 'html2canvas'
import { DatePicker } from 'antd'
import Holidays from 'date-holidays'
import { Value } from '../../Subtitle'

const hd = new Holidays('CN')
hd.getHolidays(2025)
hd.getHolidays(2024)

function Page({ subs }: { subs: Value[] }) {
  const [day, setDay] = useState(() => dayjs())
  const lsr = useMemo(() => lunisolar(day.valueOf()), [day])
  const dd = useMemo(() => Math.abs(day.diff('2026-01-01', 'day')), [day])
  const acts = useMemo(() => lsr.theGods.getActs(), [lsr])
  const [pic, setPic] = useState(screenshot)
  const [good, setGood] = useState(generateGoodStr)
  const subtitleCn = subs.map((s) => s.slices[0]).join(' ')
  const subtitle = subs.map((s) => s.slices[1]).join(' ')
  const currentEpisode = subs[0]?.episode
  const pageRef = useRef<HTMLDivElement>(null)
  const holiday = useMemo(() => hd.isHoliday(day.toDate()), [day])
  const holidayName = useMemo(() => {
    if (holiday) {
      const name = holiday[0].name
      if (name.length > 2) {
        return holiday[0].name.replace('节', '')
      }
      return name
    }
  }, [holiday])

  function generateGoodStr() {
    return acts.good.slice(0, 4).join('，').substring(0, 4)
  }

  function updateGood() {
    console.log(acts.good.join('\n'))
    setGood(generateGoodStr)
  }

  function saveAsImg() {
    const pageNode = pageRef.current
    if (!pageNode) {
      return
    }
    html2canvas(pageNode).then((canvas) => {
      const name = `${day.format('YYYY-MM-DD ddd')}【${subtitleCn}】【${currentEpisode}】.png`
      const imgData = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = imgData
      a.download = name
      a.click()
    })
  }

  function uploadImg(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files?.[0]
    if (imgFile) {
      const url = URL.createObjectURL(imgFile)
      setPic(url)
    }
  }

  // useEffect(() => {
  //   fetch('/date/update', {
  //     method: 'POST',
  //   }).then(console.log)
  // }, [])

  return (
    <div className="relative ml-64 w-[132mm]">
      <div className="shadow-2xl">
        <div
          ref={pageRef}
          className="relative h-[213mm] w-[132mm] overflow-hidden bg-white"
        >
          <p className="mt-20 h-[340px] w-full">
            <img src={pic} />
          </p>
          <div className="mt-14 box-content grow px-6 text-right">
            <div className="text-l ml-auto w-[305px]">{subtitle}</div>
            <div className="text-l ml-auto mt-1 w-[305px]">{subtitleCn}</div>
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
              <div>{holiday && holidayName}</div>
              {lsr.solarTerm?.toString()}
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
              <div>{currentEpisode}</div>
            </div>
            {/* <div>忌：{acts.bad.slice(0, 4).join('，')}</div> */}
          </div>
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
            onChange={uploadImg}
          />
        </div>
      </div>
      <div className="absolute -left-24 bottom-28 z-20">
        <div className="relative -left-20">
          <DatePicker
            value={day}
            onChange={setDay}
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
            className="rotate-180"
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
          onClick={updateGood}
        >
          宜
        </button>
      </div>
      <button
        className="relative m-auto mt-14 block w-[132mm] select-none border-2"
        onClick={saveAsImg}
      >
        保存
      </button>
      <script type="module"></script>
    </div>
  )
}

export default Page
