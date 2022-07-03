import { GithubOne } from '@icon-park/react'
import { FC } from 'react'

import './footer.styles.scss'

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="footer">
      <a
        href="https://github.com/savoygu/music-player"
        target="_blank"
        title="Create by @savoygu"
        rel="noreferrer"
      >
        <GithubOne theme="outline" size="24" fill="3" />
      </a>
    </div>
  )
}

export default Footer
