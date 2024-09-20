import { Button, List, Popover, Tabs, TabsProps, theme } from 'antd'
import { friendsEpisodeDesc, friendsSubtitles } from 'assets'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
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

// const subtitles: SubTitles = JSON.parse(friendsSubtitles as string)

// function genTabsItems() {
//   const items = []
//   for (let s = 1; s <= S; s++) {
//     const currentSeason = `S${`${s}`.padStart(2, '0')}`
//     const season = []
//     for (let e = 1; e <= E; e++) {
//       const currentEpisode = `E${`${e}`.padStart(2, '0')}`
//       const episode = `${currentSeason}${currentEpisode}`
//       const dialogues = (friendsSubtitles as SubTitles)[episode]
//       if (dialogues) {
//         season.push({
//           key: currentEpisode,
//           label: currentEpisode,
//           children: dialogues.map((dia) => {
//             return (
//               <List>
//                 <List.Item.Meta
//                   title={dia.slices[0]}
//                   description={dia.slices[1]}
//                 />
//                 <div>{dia.start}</div>
//               </List>
//             )
//           }),
//         })
//       }
//     }
//     items.push({
//       key: currentSeason,
//       label: currentSeason,
//       children: (
//         <Tabs
//           tabPosition="left"
//           items={season}
//         />
//       ),
//     })
//   }
//   return items
// }

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

function Subtitle({ onChange }: { onChange: (s: Value) => void }) {
  const [cs, setCs] = useState('S01')
  const [ce, setCe] = useState('E01')

  useEffect(() => {
    console.log({ friendsSubtitles, seasonsPremiereDates })
  }, [])

  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox
      // offsetTop={64}
      offsetBottom={20}
      style={{ zIndex: 1 }}
    >
      <DefaultTabBar
        {...props}
        style={{ background: colorBgContainer }}
      />
    </StickyBox>
  )

  const items = useMemo(() => {
    const items = []
    for (let s = 1; s <= S; s++) {
      const currentSeason = `S${`${s}`.padStart(2, '0')}`
      // console.log({ currentSeason, x: seasonsPremiereDates[currentSeason] })
      const season = []
      for (let e = 1; e <= E; e++) {
        const currentEpisode = `E${`${e}`.padStart(2, '0')}`
        const t = friendsEpisodeDesc as Record<string, Desc[]>
        const desc = t[currentSeason][e - 1]
        const episode = `${currentSeason}${currentEpisode}`
        const dialogues = (friendsSubtitles as SubTitles)[episode]
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
            // forceRender: true,
            children: (
              <List
                bordered
                size="small"
                className="h-[820px] overflow-auto"
              >
                {dialogues.map((dia) => {
                  return (
                    <List.Item
                      actions={[
                        <Button
                          onClick={() => {
                            onChange({ ...dia, episode: `${currentSeason}-${currentEpisode}` })
                          }}
                        >
                          ✔️
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={dia.slices[0]}
                        description={dia.slices[1]}
                      />
                      <div>{dayjs.utc(Number(dia.start) * 1000).format('HH:mm:ss')}</div>
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
    <Tabs
      centered
      items={items}
      activeKey={cs}
      onChange={setCs}
      style={{ width: 830 }}
      renderTabBar={renderTabBar}
    />
  )
}

export default Subtitle
