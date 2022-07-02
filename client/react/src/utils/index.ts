export const shuffle = <T>(source: T[]) => {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandom(i)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function getRandom (max: number): number {
  return Math.floor(Math.random() * (max + 1))
}

export const formatTime = (interval: number = 0) => {
  interval = interval | 0
  const minute = ((interval / 60 | 0) + '').padStart(2, '0')
  const second = (interval % 60 + '').padStart(2, '0')
  return `${minute}:${second}`
}

export const equals = (a: any, b: any): boolean => {
  if (a === b) return true

  if (a instanceof Date && b instanceof Date) { return a.getTime() === b.getTime() }

  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) { return a === b }

  if (a.prototype !== b.prototype) return false

  const keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false

  return keys.every(k => equals(a[k], b[k]))
}
