import { Checkbox, List, Popover, Radio, RadioChangeEvent, Tabs, TabsProps, theme } from 'antd'
import { friendsEpisodeDesc, friendsSubtitles } from 'assets'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import StickyBox from 'react-sticky-box'

const S = 10
const E = 25

export type Sentence = {
  start: string
  end: string
  slices: string[]
}

export type Value = Sentence & {
  episode: string
}

type SubTitles = Record<string, Sentence[]>

type Desc = {
  总集数: string
  集数: string
  标题: string
  导演: string
  编剧: string
  首播日期: string
}

const height = 820
const seasonsPremiereDates = (() => {
  const desc: Record<string, string> = {}
  const t = friendsEpisodeDesc as Record<string, Desc[]>
  const S = Object.keys(t)
  for (const s of S) {
    const descList = t[s] as Desc[]
    const first = descList[0]
    const last = descList[descList.length - 1]
    desc[s] = `${first.首播日期}-${last.首播日期}`
  }
  return desc
})()

function Subtitle({ onChange }: { onChange: (s: Value[]) => void }) {
  const [cs, setCs] = useState('S01')
  const [ce, setCe] = useState('E01')
  const [vals, setVals] = useState<Value[]>([])

  // useEffect(() => {
  //   console.log({ friendsSubtitles, seasonsPremiereDates })
  // }, [])

  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox
      offsetBottom={20}
      style={{ zIndex: 1 }}
    >
      <DefaultTabBar
        {...props}
        style={{ background: colorBgContainer }}
      />
    </StickyBox>
  )

  function hdMultiChange(nextVals: Value[]) {
    const nextVal = nextVals[nextVals.length - 1]
    const nEpi = nextVal.episode
    const isCrossEpisodeMultiChange = nextVals.findLastIndex((v) => v.episode !== nEpi) !== -1
    if (isCrossEpisodeMultiChange) {
      setVals([nextVal])
      onChange([nextVal])
    } else {
      setVals(nextVals)
      onChange(nextVals)
    }
  }

  function hdRadioGroupChange(e: RadioChangeEvent) {
    const nextVals = [e.target.value]
    setVals(nextVals)
    onChange(nextVals)
  }
  const isMulti = vals.length > 1
  const items = useMemo(() => {
    const items = []
    for (let s = 1; s <= S; s++) {
      const currentSeason = `S${`${s}`.padStart(2, '0')}`
      const season = []
      for (let e = 1; e <= E; e++) {
        const currentEpisode = `E${`${e}`.padStart(2, '0')}`
        const t = friendsEpisodeDesc as Record<string, Desc[]>
        const desc = t[currentSeason][e - 1]
        const cep = `${currentSeason}${currentEpisode}`
        const dialogues = (friendsSubtitles as SubTitles)[cep]
        if (dialogues) {
          season.push({
            key: currentEpisode,
            label: (
              <Popover
                title={desc?.首播日期}
                content={desc?.标题}
              >
                {currentEpisode}
              </Popover>
            ),
            children: (
              <List
                header={<h2>{desc?.标题}</h2>}
                bordered
                size="small"
                className="h-[820px] overflow-auto"
              >
                {dialogues.map((dia) => {
                  const c = { ...dia, episode: `${currentSeason}-${currentEpisode}` }
                  const timeStamp = dayjs.utc(Number(dia.start) * 1000).format('HH:mm:ss')
                  return (
                    <List.Item actions={[<Checkbox value={c} />]}>
                      <List.Item.Meta
                        title={dia.slices[0]}
                        description={dia.slices[1]}
                      />
                      <Radio
                        value={c}
                        id={timeStamp}
                      >
                        <div>{timeStamp}</div>
                      </Radio>
                    </List.Item>
                  )
                })}
              </List>
            ),
          })
        }
      }
      items.push({
        key: currentSeason,
        label: (
          <Popover title={seasonsPremiereDates[currentSeason]}>
            <span>{currentSeason}</span>
          </Popover>
        ),
        children: (
          <Tabs
            tabPosition="left"
            items={season}
            activeKey={ce}
            onChange={setCe}
            animated={false}
            style={{ height }}
          />
        ),
      })
    }
    return items
  }, [ce])

  return (
    <Radio.Group
      onChange={hdRadioGroupChange}
      value={isMulti ? null : vals[0]}
    >
      <Checkbox.Group
        className="block"
        onChange={hdMultiChange}
        value={vals}
      >
        <Tabs
          centered
          items={items}
          activeKey={cs}
          onChange={setCs}
          style={{ width: 830 }}
          renderTabBar={renderTabBar}
        />
      </Checkbox.Group>
    </Radio.Group>
  )
}

export default Subtitle
