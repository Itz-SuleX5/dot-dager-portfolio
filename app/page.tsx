import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Interests from '@/components/sections/Interests'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between w-full">
        <section id="hero" className="w-full"><Hero /></section>
        <section id="about" className="w-full"><About /></section>
        <section id="interests" className="w-full"><Interests /></section>
        <section id="contact" className="w-full"><Contact /></section>
        <Footer />
      </main>
    </>
  )
}
