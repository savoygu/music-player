import { defineComponent } from 'vue'
import Audio from './components/audio/Audio'
import Footer from './layouts/footer/Footer'
import Header from './layouts/header/Header'

export default defineComponent({
  render () {
    return (
      <>
        <Header />
        <div class="relative w-full min-h-full px-4 pt-[60px] pb-10 sm:w-[800px] sm:m-auto">
          <router-view />
          <Footer />
        </div>
        <Audio />
      </>
    )
  }
})
