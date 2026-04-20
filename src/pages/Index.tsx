import { motion } from "framer-motion";
import { ShieldCheck, Truck, Phone, MessageCircle, MapPin, Droplet, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroOil from "@/assets/hero-oil.jpg";
import store from "@/assets/store.jpg";
import pCotton from "@/assets/product-cottonseed.jpg";
import pGroundnut from "@/assets/product-groundnut.jpg";
import pCorn from "@/assets/product-corn.jpg";
import pSunflower from "@/assets/product-sunflower.jpg";
import pGhee from "@/assets/product-ghee.jpg";

const PHONE = "+919876543210";
const WA_LINK = `https://wa.me/919876543210?text=${encodeURIComponent("Hi Mahaveer Marketing, I want to place an order")}`;

const products = [
  { id: 1, name: "Tirupati Cotton Seed Oil", brand: "Tirupati", category: "Oils", size: "15 kg Tin", price: "₹2,250", img: pCotton },
  { id: 2, name: "Gulab Groundnut Oil", brand: "Gulab", category: "Oils", size: "5 L Jar", price: "₹950", img: pGroundnut },
  { id: 3, name: "Fortune Corn Oil", brand: "Fortune", category: "Oils", size: "1 L Bottle", price: "₹185", img: pCorn },
  { id: 4, name: "Tirupati Sunflower Oil", brand: "Tirupati", category: "Oils", size: "1 L Pouch", price: "₹160", img: pSunflower },
  { id: 5, name: "Pure Desi Ghee", brand: "Gulab", category: "Ghee", size: "1 kg Jar", price: "₹650", img: pGhee },
  { id: 6, name: "Premium Cow Ghee", brand: "Fortune", category: "Ghee", size: "500 g Jar", price: "₹360", img: pGhee },
];

const brands = ["All Brands", "Tirupati", "Gulab", "Fortune"];
const categories = ["All", "Oils", "Ghee"];

const Index = () => {
  const [cat, setCat] = useState("All");
  const [brand, setBrand] = useState("All Brands");

  const filtered = products.filter(
    (p) => (cat === "All" || p.category === cat) && (brand === "All Brands" || p.brand === brand),
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/60">
        <div className="container flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
              <Droplet className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold tracking-tight">MAHAVEER MARKETING</span>
              <span className="block text-xs text-muted-foreground">Live Healthy, Cook Healthier</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#products" className="hover:text-primary transition-colors">Products</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          <a href={WA_LINK} target="_blank" rel="noreferrer">
            <Button variant="whatsapp" size="lg" className="hidden sm:inline-flex">
              <MessageCircle className="h-4 w-4" /> Order via WhatsApp
            </Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-gradient-hero">
        <div className="container grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-sm font-medium text-primary shadow-card">
              <ShieldCheck className="h-4 w-4" /> 18+ Years of Trust
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
              Premium Quality{" "}
              <span className="text-primary italic">Edible Oils & Ghee</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Your trusted destination for premium cooking oils from top brands —
              Tirupati, Gulab, Fortune. Serving healthy homes since 18+ years.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#products"><Button size="lg" variant="hero">Shop Now <ArrowRight className="h-4 w-4" /></Button></a>
              <a href={`tel:${PHONE}`}><Button size="lg" variant="outline-hero"><Phone className="h-4 w-4" /> Call Us</Button></a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "18+", l: "Years Experience" },
                { v: "1000+", l: "Happy Customers" },
                { v: "15+", l: "Products" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl md:text-4xl font-bold text-primary">{s.v}</dt>
                  <dd className="text-xs text-muted-foreground mt-1">{s.l}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -top-6 -right-4 h-32 w-32 rounded-3xl bg-primary/15 animate-float" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl bg-accent/60 animate-float [animation-delay:1.5s]" />
            <img
              src={heroOil}
              alt="Golden cooking oil pouring into a container"
              width={1280}
              height={960}
              className="relative rounded-3xl shadow-elevated w-full aspect-[4/3] object-cover -rotate-2"
            />
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Our Products</h2>
            <p className="mt-4 text-muted-foreground">
              Choose from our wide range of premium quality edible oils and pure
              ghee from trusted brands.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === c
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card text-foreground hover:bg-secondary border border-border"
                }`}
              >
                {c}
              </button>
            ))}
            <span className="mx-2 hidden sm:block h-6 w-px bg-border" />
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  brand === b
                    ? "bg-foreground text-background"
                    : "bg-card text-foreground hover:bg-secondary border border-border"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-3xl bg-card p-5 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden rounded-2xl bg-secondary">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.brand}</span>
                    <h3 className="mt-1 font-display text-xl font-semibold leading-tight">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.size}</p>
                  </div>
                  <span className="font-display text-xl font-bold whitespace-nowrap">{p.price}</span>
                </div>
                <a
                  href={`${WA_LINK}%20-%20${encodeURIComponent(p.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block"
                >
                  <Button variant="whatsapp" className="w-full">
                    <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                  </Button>
                </a>
              </motion.article>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-16">
                No products found for this filter.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-28 bg-secondary/40">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={store}
              alt="Mahaveer Marketing store interior"
              loading="lazy"
              width={1024}
              height={1024}
              className="rounded-3xl shadow-elevated w-full aspect-square object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-elevated p-6 max-w-[200px]">
              <p className="font-display text-4xl font-bold text-primary">18+</p>
              <p className="text-sm text-muted-foreground mt-1">Years of Trust</p>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium">
              <Star className="h-4 w-4 text-primary" /> About Us
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-tight">
              Your Trusted Partner for Quality Oils
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Mahaveer Marketing has been serving households with premium quality
              edible oils and pure ghee for over 18 years. We are authorized
              retailers for top brands including Tirupati (Kadi, Kalol), Gulab,
              and Fortune.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, t: "100% Authentic", d: "Genuine branded products" },
                { icon: Truck, t: "Same Day Delivery", d: "Quick doorstep delivery" },
              ].map((f) => (
                <div key={f.t} className="flex gap-4 p-5 rounded-2xl bg-card shadow-card">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{f.t}</p>
                    <p className="text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Cotton Seed Oil", "Groundnut Oil", "Corn Oil", "Sunflower Oil", "Pure Ghee"].map((t) => (
                <span key={t} className="px-4 py-2 rounded-full bg-background border border-border text-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Get In Touch</h2>
            <p className="mt-4 text-muted-foreground">
              Ready to order? Contact us via WhatsApp or call us directly. Free
              delivery on orders above ₹500!
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp Order",
                desc: "Quick & easy ordering",
                cta: "Chat Now",
                href: WA_LINK,
                tone: "whatsapp",
              },
              {
                icon: Phone,
                title: "Call Us",
                desc: "+91 98765 43210",
                cta: "Call Now",
                href: `tel:${PHONE}`,
                tone: "primary",
              },
              {
                icon: MapPin,
                title: "Visit Store",
                desc: "Shop No. 12, Main Market, Gujarat, India",
                cta: "Get Directions",
                href: "https://maps.google.com/",
                tone: "outline",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-3xl bg-card p-8 shadow-card hover:shadow-elevated transition-shadow text-center">
                <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${c.tone === "whatsapp" ? "bg-whatsapp/15 text-whatsapp" : "bg-primary/10 text-primary"}`}>
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.desc}</p>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-5 inline-block">
                  <Button variant={c.tone === "whatsapp" ? "whatsapp" : c.tone === "primary" ? "hero" : "outline"}>
                    {c.cta}
                  </Button>
                </a>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            Free delivery on orders above ₹500 • Same day delivery available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/40 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <Droplet className="h-4 w-4" />
            </span>
            <span className="font-display font-bold text-foreground">Mahaveer Marketing</span>
          </div>
          <p>© {new Date().getFullYear()} Mahaveer Marketing. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default Index;
