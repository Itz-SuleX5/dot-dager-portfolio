import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Interests from '@/components/sections/Interests'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Interests />
      <Contact />
      <Footer />
    </main>
  )
}

