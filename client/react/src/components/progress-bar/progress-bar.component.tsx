import {
  FC,
  MouseEvent,
  MouseEventHandler,
  TouchEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { useEvent, useUpdateEffect } from 'react-use'

import './progress-bar.styles.scss'

type ProgressBarProps = {
  progress: number
  barColor?: string
  hasBtn?: boolean
  onProgressChanging: (progress: number) => void
  onProgressChanged: (progress: number) => void
}

const progressBarWidth = 16
const touch = { x1: 0, beginWidth: 0 }
let touching = false

const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  barColor = '',
  hasBtn = true,
  onProgressChanging,
  onProgressChanged
}) => {
  // refs
  const barRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // state
  const [offset, setOffset] = useState(0)
  const [btnStyle, setBtnStyle] = useState({})
  const [progressStyle, setProgressStyle] = useState({})

  // handlers
  const onTouchStart = (e: MouseEvent | TouchEvent) => {
    touching = true
    touch.x1 = 'touches' in e ? e.touches[0].pageX : e.pageX // 鼠标开始位置
    touch.beginWidth = progressRef.current?.clientWidth ?? 0 // 进度条当前进度
  }
  const onTouchMove = (e: MouseEvent | TouchEvent) => {
    if (!touching) return
    const delta = ('touches' in e ? e.touches[0].pageX : e.pageX) - touch.x1 // 鼠标移动距离
    const endWidth = touch.beginWidth + delta // 进度条最终进度
    const barWidth = barRef.current!.clientWidth - (hasBtn ? progressBarWidth : 0)
    const progress = Math.min(1, Math.max(endWidth / barWidth, 0))
    setOffset(barWidth * progress)

    onProgressChanging(progress)
  }
  const onTouchEnd = (e: MouseEvent | TouchEvent) => {
    if (!touching) return
    touching = false

    const barWidth = barRef.current!.clientWidth - (hasBtn ? progressBarWidth : 0)
    const progress = progressRef.current?.clientWidth! / barWidth
    onProgressChanged(progress)
  }
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!barRef.current) return

    const rect = barRef.current.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    const barWidth = barRef.current.clientWidth - (hasBtn ? progressBarWidth : 0)
    const progress = Math.min(1, Math.max(offsetWidth / barWidth, 0))

    onProgressChanged(progress)
  }

  // hooks
  useUpdateEffect(() => {
    setBtnStyle({
      transform: `translate3d(${offset}px,0,0)`
    })
  }, [offset])
  useUpdateEffect(() => {
    setProgressStyle({
      width: `${offset}px`,
      backgroundColor: barColor
    })
  }, [offset, barColor])
  useEffect(() => {
    if (!barRef.current) return

    const barWidth = barRef.current.clientWidth - (hasBtn ? progressBarWidth : 0)
    setOffset(barWidth * progress)
  }, [progress, hasBtn])

  useEvent('mouseup', onTouchEnd)
  useEvent('mouseup', onTouchEnd)

  return (
    <div ref={barRef} className="progress-bar" onClick={onClick}>
      <div className="bar-inner">
        <div ref={progressRef} className="progress" style={progressStyle} />
        <div
          className="progress-btn-wrapper"
          style={btnStyle}
          onMouseDown={onTouchStart}
          onMouseMove={onTouchMove}
          onMouseUp={onTouchEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="progress-btn" style={{ backgroundColor: barColor }} />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
