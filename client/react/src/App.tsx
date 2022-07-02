import { Route, Routes } from 'react-router-dom'

import Navigation from '@/routes/navigation/navigation.component'
import Player from '@/routes/player/player.component'
import Musics from '@/routes/musics/musics.component'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Player />}></Route>
        <Route path="musics" element={<Musics />}></Route>
      </Route>
    </Routes>
  )
}

export default App
