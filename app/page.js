import Link from "next/link"
import ButtonSignin from "@/components/ButtonSignin"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import Showcase from "@/components/Showcase"

export default function Page() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Hero />
        {/* <WithWithout /> */}
        <Showcase />
        <Pricing />
        <FAQ />
        <Footer />
      </main>
    </>
  )
}
