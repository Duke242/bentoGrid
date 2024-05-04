import ButtonSignin from "./ButtonSignin"

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-col items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Simple Bento Grid Building in Minutes
        </h1>
        <p className="text-center mt-8 text-2xl text-gray-500"></p>
      </div>
      <div className="w-1/2 h-64 relative">
        <div className="absolute inset-0 bg-[#87D8F5] filter blur-3xl opacity-80 rounded-lg"></div>
        <iframe
          className="w-full h-full relative z-10 rounded-lg"
          src="https://www.youtube.com/embed/85NfEoOCu1c?rel=0&autoplay=1&mute=1"
          title="YouTube video player"
          allowFullScreen
          allow="autoplay"
        />
      </div>
      <ButtonSignin extraStyle="btn btn-wide bg-[#87D8F5] hover:bg-[#2fbbee] mx-auto" />
    </section>
  )
}

export default Hero
