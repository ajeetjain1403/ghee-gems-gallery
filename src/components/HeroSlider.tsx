import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import slideOil from "@/assets/hero-slide-oil.jpg";
import slideGhee from "@/assets/hero-slide-ghee.jpg";
import slideFamily from "@/assets/hero-slide-family.jpg";

type Slide = {
  img: string;
  alt: string;
  headline: string;
  highlight: string;
  subtext: string;
  cta: string;
  href: string;
};

const slides: Slide[] = [
  {
    img: slideOil,
    alt: "Golden cold-pressed oil pouring into a glass jar",
    headline: "Pure. Traditional.",
    highlight: "Chemical-Free Oils",
    subtext: "Cold-pressed oils sourced directly from farms for your family's health.",
    cta: "Shop Now",
    href: "#products",
  },
  {
    img: slideGhee,
    alt: "Rustic glass jar of pure desi cow ghee",
    headline: "Authentic",
    highlight: "Desi Ghee",
    subtext: "Made using the traditional bilona method for rich taste and nutrition.",
    cta: "Explore Ghee",
    href: "#products",
  },
  {
    img: slideFamily,
    alt: "Happy family cooking together with pure oils",
    headline: "Trusted by",
    highlight: "10,000+ Families",
    subtext: "No chemicals, no preservatives — just pure, wholesome goodness.",
    cta: "View Products",
    href: "#products",
  },
];

const trustBadges = ["100% Natural", "Cold Pressed", "No Chemicals"];

export const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero">
      <div className="relative h-[640px] md:h-[700px] lg:h-[760px]">
        {/* Background image with fade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.img}
              alt={slide.alt}
              width={1600}
              height={1200}
              className="h-full w-full object-cover scale-[1.02]"
            />
            {/* Softer, more cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1a10]/80 via-[#0c1a10]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a10]/55 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="container relative z-10 h-full flex items-center">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${index}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/75"
                >
                  <Leaf className="h-3 w-3 text-[#e6b450]" />
                  Premium · Organic · Pure
                </span>

                <h1 className="mt-7 font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.04] text-balance text-white">
                  {slide.headline}
                  <span
                    className="block italic font-light mt-2"
                    style={{ color: "#e6b450" }}
                  >
                    {slide.highlight}
                  </span>
                </h1>

                <p className="mt-7 text-base md:text-lg text-white/80 max-w-lg leading-relaxed font-light">
                  {slide.subtext}
                </p>

                <div className="mt-10 flex items-center gap-6 flex-wrap">
                  <a href={slide.href}>
                    <button
                      className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium text-[#1f1503] transition-all duration-500 hover:scale-[1.02]"
                      style={{
                        background: "linear-gradient(135deg, #e6b450 0%, #c9962b 100%)",
                        boxShadow: "0 10px 30px -12px rgba(201, 150, 43, 0.55)",
                      }}
                    >
                      {slide.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </button>
                  </a>

                  {/* Subtle inline trust line — no pills, no boxes */}
                  <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-white/65">
                    {trustBadges.map((b, i) => (
                      <span key={b} className="flex items-center gap-4">
                        {i > 0 && <span className="h-1 w-1 rounded-full bg-white/30" />}
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Refined slide indicators */}
        <div className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[2px] rounded-full transition-all duration-700 ease-out ${
                i === index
                  ? "w-10 bg-[#e6b450]"
                  : "w-5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
