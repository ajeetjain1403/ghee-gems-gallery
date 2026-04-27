import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Leaf, Droplet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const trustBadges = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Droplet, label: "Cold Pressed" },
  { icon: ShieldCheck, label: "No Chemicals" },
];

export const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero">
      <div className="relative h-[640px] md:h-[680px] lg:h-[720px]">
        {/* Background image with fade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.img}
              alt={slide.alt}
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
            {/* Strong left-to-right gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1d12]/85 via-[#0f1d12]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d12]/40 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="container relative z-10 h-full flex items-center">
          <div className="max-w-2xl text-background">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${index}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white">
                  <Leaf className="h-3.5 w-3.5" /> Premium · Organic · Pure
                </span>
                <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                  {slide.headline}{" "}
                  <span
                    className="block italic mt-2"
                    style={{
                      color: "#e6b450",
                      textShadow: "0 2px 18px rgba(0,0,0,0.35)",
                    }}
                  >
                    {slide.highlight}
                  </span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
                  {slide.subtext}
                </p>

                {/* Inline trust pills */}
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {trustBadges.map((b) => (
                    <span
                      key={b.label}
                      className="inline-flex items-center gap-2 rounded-full bg-white/12 backdrop-blur-md border border-white/25 px-3.5 py-1.5 text-xs md:text-sm font-medium text-white"
                    >
                      <b.icon className="h-3.5 w-3.5 text-[#e6b450]" />
                      {b.label}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={slide.href}>
                    <button
                      className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-[#1f1503] transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
                      style={{
                        background: "linear-gradient(135deg, #e6b450 0%, #c9962b 100%)",
                        boxShadow: "0 14px 40px -10px rgba(201, 150, 43, 0.6)",
                      }}
                    >
                      {slide.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Improved slide dots */}
        <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                i === index
                  ? "w-12 bg-[#e6b450] shadow-[0_0_14px_rgba(230,180,80,0.7)]"
                  : "w-2.5 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
