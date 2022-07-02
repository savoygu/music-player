import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateEffect } from 'react-use'

import { selectPlayerReducer } from '@/store/selectors'

const useCd = () => {
  // selectors
  const { playing } = useSelector(selectPlayerReducer)

  // ref
  const cdRef = useRef(null)
  const cdCoverRef = useRef(null)

  // state
  const [cdClass, setCdClass] = useState('')

  // hooks
  useUpdateEffect(() => {
    if (!playing && cdRef.current && cdCoverRef.current) {
      syncTransform(cdRef.current, cdCoverRef.current)
    }
    setCdClass(playing ? 'playing' : '')
  }, [playing])

  function syncTransform(wrapper: HTMLDivElement, inner: HTMLImageElement) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform =
      wrapperTransform === 'none'
        ? innerTransform
        : innerTransform.concat(wrapperTransform) // 旋转角度叠加
  }

  return {
    cdRef,
    cdCoverRef,
    cdClass
  }
}

export default useCd
