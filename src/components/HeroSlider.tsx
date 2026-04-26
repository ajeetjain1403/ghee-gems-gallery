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
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/45 to-foreground/10" />
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
                <span className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 backdrop-blur-md px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]">
                  <Leaf className="h-3.5 w-3.5" /> Premium · Organic · Pure
                </span>
                <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
                  {slide.headline}{" "}
                  <span className="block text-accent italic mt-2">{slide.highlight}</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-background/85 max-w-xl leading-relaxed">
                  {slide.subtext}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={slide.href}>
                    <Button size="lg" variant="hero" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      {slide.cta} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-10 bg-accent" : "w-6 bg-background/50 hover:bg-background/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust badges bar */}
      <div className="relative z-10 border-t border-border/40 bg-background/95 backdrop-blur">
        <div className="container grid grid-cols-3 gap-4 py-5">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center justify-center gap-3 text-center">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary shrink-0">
                <b.icon className="h-5 w-5" />
              </span>
              <span className="font-display text-sm md:text-base font-semibold tracking-tight">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
