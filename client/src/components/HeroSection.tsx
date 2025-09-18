import bookImage from "@assets/Untitled design (10)_1752994221787-CDzxwOeS-min_1753701768839.png";

export default function HeroSection() {
  return (
    <section className="py-6 md:py-8 text-center">
      
      <div className="flex justify-center mb-0 md:mb-1">
        {/* Book Stack Image */}
        <img 
          src={bookImage} 
          alt="Book Stack" 
          className="w-48 h-32 md:w-56 md:h-40 object-cover object-top"
        />
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white md:mb-3 px-4 mt-[6px] mb-[6px]">
        Free Resources
      </h1>
      <p className="md:text-xl text-gray-300 max-w-2xl mx-auto px-6 text-[16px]">
        Free materials to help you{" "}
        <strong className="font-bold text-white">start, run and profit</strong>{" "}
        from Shadow Pages
      </p>
    </section>
  );
}
