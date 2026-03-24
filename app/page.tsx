'use client'
import { useState, useEffect, useRef } from 'react'
import TopBar from '@/components/TopBarNew'
import Nav from '@/components/NavNew'
import Hero from '@/components/HeroNew'
import HowItWorks from '@/components/HowItWorksNew'
import Modules from '@/components/ModulesNew'
import WhyOrbitle from '@/components/WhyOrbitleNew'
import Testimonials from '@/components/TestimonialsNew'
import Pricing from '@/components/PricingNew'
import Contact from '@/components/ContactNew'
import Footer from '@/components/FooterNew'

export default function Home() {
  const [slots, setSlots] = useState(47)
  const [pricingUnlocked, setPricingUnlocked] = useState(false)
  const [barVisible, setBarVisible] = useState(true)
  const [barHeight, setBarHeight] = useState(48)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers = [32000, 85000, 150000, 240000].map((delay) =>
      setTimeout(() => setSlots(s => Math.max(43, s - 1)), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!barRef.current) return
    const ro = new ResizeObserver(() => {
      setBarHeight(barRef.current?.offsetHeight ?? 48)
    })
    ro.observe(barRef.current)
    return () => ro.disconnect()
  }, [])

  const handleFormSuccess = () => {
    setPricingUnlocked(true)
    setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 900)
  }

  return (
    <>
      <div ref={barRef}>
        <TopBar slots={slots} onClose={() => setBarVisible(false)} />
      </div>
      <Nav barVisible={barVisible} barHeight={barHeight} />
      <main>
        <Hero />
        <HowItWorks />
        <Modules />
        <WhyOrbitle />
        <Testimonials />
        <Pricing unlocked={pricingUnlocked} />
        <Contact slots={slots} onSuccess={handleFormSuccess} />
      </main>
      <Footer />
    </>
  )
}