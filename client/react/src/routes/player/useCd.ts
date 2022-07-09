import { useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

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
  useLayoutEffect(() => {
    function syncTransform(wrapper: HTMLDivElement, inner: HTMLImageElement) {
      const wrapperTransform = getComputedStyle(wrapper).transform
      const innerTransform = getComputedStyle(inner).transform
      wrapper.style.transform =
        wrapperTransform === 'none'
          ? innerTransform
          : innerTransform.concat(wrapperTransform) // 旋转角度叠加
    }

    if (!playing) {
      syncTransform(cdRef.current!, cdCoverRef.current!)
    }
    setCdClass(playing ? 'playing' : '')
  }, [playing])

  return {
    cdRef,
    cdCoverRef,
    cdClass
  }
}

export default useCd
