import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from 'react'

import './switch.styles.scss'

interface SwitchProps {
  value: boolean
  labelText?: string
  onText?: string // 开关文本
  offText?: string
  onLeverBgColor?: string // 杠杆背景色
  offLeverBgColor?: string
  onTextColor?: string // 开关文字颜色
  offTextColor?: string
  onBgColor?: string // 开关背景色
  offBgColor?: string
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const ON_COLOR = '#6bc30d'
const OFF_COLOR = '#fdfdfd'

const Switch: FC<SwitchProps> = ({ value, labelText, onText = '开', offText = '关', onLeverBgColor = ON_COLOR, offLeverBgColor = OFF_COLOR, onTextColor = ON_COLOR, offTextColor = ON_COLOR, onBgColor = OFF_COLOR, offBgColor = OFF_COLOR, disabled = false, onChange }) => {
  // state
  const [checked, setChecked] = useState(value)
  const [switchStyle, setSwitchStyle] = useState({})

  // handlers
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setChecked(event.target.checked)
    onChange && onChange(event)
  }

  // hooks
  useEffect(() => {
    setSwitchStyle({
      color: checked ? onTextColor : offTextColor,
      backgroundColor: checked ? onBgColor : offBgColor
    })
  }, [checked, onTextColor, offTextColor, onBgColor, offBgColor])

  return <div className="switch">
    <label>
      <span className="switch-text">
        {labelText}
      </span>
      <input
        v-model="checked"
        type="checkbox"
        defaultChecked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <div
        className="switch-lever"
        style={{ backgroundColor: checked ? onLeverBgColor : offLeverBgColor }}
      >
        <span
          className={checked ? 'switch-on' : 'switch-off'}
          style={switchStyle}
        >
          {checked ? onText : offText}
        </span>
      </div>
    </label >
  </div >
}

export default Switch
