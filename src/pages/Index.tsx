import { motion } from "framer-motion";
import { ShieldCheck, Truck, Phone, MessageCircle, MapPin, Droplet, Star, ArrowRight, Search, X, Plus, Leaf, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/CartDrawer";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { HeroSlider } from "@/components/HeroSlider";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/hooks/use-toast";
import store from "@/assets/store.jpg";
import pCotton from "@/assets/product-cottonseed.jpg";
import pGroundnut from "@/assets/product-groundnut.jpg";
import pCorn from "@/assets/product-corn.jpg";
import pSunflower from "@/assets/product-sunflower.jpg";
import pGhee from "@/assets/product-ghee.jpg";
import Navbar from "@/components/ui/navbar";

const PHONE = "+919512983111";
const WA_LINK = `https://wa.me/919512983111?text=${encodeURIComponent("Hi Mahaveer Marketing, I want to place an order")}`;

type Product = {
  id: number;
  name: string;
  brand: "Tirupati" | "Gulab" | "Fortune";
  category: "Oils" | "Ghee";
  type: string;
  size: string;
  price: string;
  img: string;
};

const products: Product[] = [
  // Tirupati (Kadi & Kalol units — known for cotton seed & groundnut)
  { id: 1, name: "Tirupati Kadi Cotton Seed Oil Tin", brand: "Tirupati", category: "Oils", type: "Cotton Seed", size: "15 kg Tin", price: "₹2,280", img: pCotton },
  { id: 2, name: "Tirupati Kalol Cotton Seed Oil Tin", brand: "Tirupati", category: "Oils", type: "Cotton Seed", size: "15 kg Tin", price: "₹2,260", img: pCotton },
  { id: 3, name: "Tirupati Cotton Seed Oil Pouch", brand: "Tirupati", category: "Oils", type: "Cotton Seed", size: "1 L Pouch", price: "₹165", img: pSunflower },
  { id: 4, name: "Tirupati Groundnut Oil Tin", brand: "Tirupati", category: "Oils", type: "Groundnut", size: "15 kg Tin", price: "₹3,150", img: pGroundnut },
  { id: 5, name: "Tirupati Sunflower Oil Pouch", brand: "Tirupati", category: "Oils", type: "Sunflower", size: "1 L Pouch", price: "₹155", img: pSunflower },

  // Gulab
  { id: 6, name: "Gulab Refined Groundnut Oil Jar", brand: "Gulab", category: "Oils", type: "Groundnut", size: "5 L Jar", price: "₹1,050", img: pGroundnut },
  { id: 7, name: "Gulab Filtered Groundnut Oil Tin", brand: "Gulab", category: "Oils", type: "Groundnut", size: "15 kg Tin", price: "₹3,100", img: pGroundnut },
  { id: 8, name: "Gulab Cotton Seed Oil Jar", brand: "Gulab", category: "Oils", type: "Cotton Seed", size: "5 L Jar", price: "₹820", img: pCotton },
  { id: 9, name: "Gulab Pure Cow Ghee Jar", brand: "Gulab", category: "Ghee", type: "Cow Ghee", size: "1 L Jar", price: "₹680", img: pGhee },
  { id: 10, name: "Gulab Pure Cow Ghee Tin", brand: "Gulab", category: "Ghee", type: "Cow Ghee", size: "5 L Tin", price: "₹3,300", img: pGhee },

  // Fortune (Adani Wilmar)
  { id: 11, name: "Fortune Sunlite Refined Sunflower Oil", brand: "Fortune", category: "Oils", type: "Sunflower", size: "1 L Pouch", price: "₹150", img: pSunflower },
  { id: 12, name: "Fortune Sunlite Sunflower Oil Jar", brand: "Fortune", category: "Oils", type: "Sunflower", size: "5 L Jar", price: "₹720", img: pSunflower },
  { id: 13, name: "Fortune Kachi Ghani Mustard Oil", brand: "Fortune", category: "Oils", type: "Mustard", size: "1 L Pouch", price: "₹175", img: pGroundnut },
  { id: 14, name: "Fortune Rice Bran Health Oil", brand: "Fortune", category: "Oils", type: "Rice Bran", size: "1 L Pouch", price: "₹165", img: pCorn },
  { id: 15, name: "Fortune Soya Health Refined Oil", brand: "Fortune", category: "Oils", type: "Soyabean", size: "1 L Pouch", price: "₹145", img: pCorn },
  { id: 16, name: "Fortune Xpert Pro Corn Oil", brand: "Fortune", category: "Oils", type: "Corn", size: "1 L Bottle", price: "₹190", img: pCorn },
  { id: 17, name: "Fortune Premium Cow Ghee Jar", brand: "Fortune", category: "Ghee", type: "Cow Ghee", size: "1 L Jar", price: "₹670", img: pGhee },
  { id: 18, name: "Fortune Premium Cow Ghee Pouch", brand: "Fortune", category: "Ghee", type: "Cow Ghee", size: "500 ml Pouch", price: "₹345", img: pGhee },
];

const brands = ["All Brands", "Tirupati", "Gulab", "Fortune"];
const categories = ["All", "Oils", "Ghee"];

const BEST_SELLER_IDS = new Set([1, 4, 9, 11, 13]);

const benefitByType: Record<string, string> = {
  "Cotton Seed": "Light & heart-friendly for daily cooking",
  "Groundnut": "Rich in MUFA & natural antioxidants",
  "Sunflower": "High in Vitamin E for healthy skin",
  "Mustard": "Boosts immunity • Rich in Omega-3",
  "Rice Bran": "Lowers cholesterol • Oryzanol rich",
  "Soyabean": "Plant protein & Omega-3 goodness",
  "Corn": "Heart-healthy with natural Vitamin E",
  "Cow Ghee": "Pure A2 nutrition • Rich in Vitamin A",
};

const getProductBadges = (p: Product) => {
  const badges: { label: string; icon: typeof Leaf }[] = [];
  if (BEST_SELLER_IDS.has(p.id)) badges.push({ label: "Best Seller", icon: Sparkles });
  if (p.category === "Oils" && (p.type === "Groundnut" || p.type === "Mustard" || p.type === "Cotton Seed"))
    badges.push({ label: "Cold Pressed", icon: Droplet });
  badges.push({ label: "Chemical-Free", icon: Leaf });
  return badges.slice(0, 3);
};

const Index = () => {
  const [cat, setCat] = useState("All");
  const [brand, setBrand] = useState("All Brands");
  const [query, setQuery] = useState("");
  const { add } = useCart();

  const handleAdd = (p: Product) => {
    add({ id: p.id, name: p.name, brand: p.brand, size: p.size, price: p.price, img: p.img });
    toast({ title: "Added to cart", description: `${p.name} • ${p.size}` });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (brand !== "All Brands" && p.brand !== brand) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.size.toLowerCase().includes(q)
      );
    });
  }, [cat, brand, query]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      {/* <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/60">
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
          <div className="flex items-center gap-3">
            <CartDrawer />
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="lg" className="hidden sm:inline-flex">
                <MessageCircle className="h-4 w-4" /> Order via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </header> */}

      <Navbar />
      {/* Hero */}
      <HeroSlider />

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

          {/* Search bar */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by brand, type or size — e.g. Tirupati 15 kg, Ghee, Mustard…"
              className="h-14 rounded-full pl-14 pr-14 text-base bg-card shadow-card border-border focus-visible:ring-primary"
              aria-label="Search products"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${cat === c
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
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${brand === b
                    ? "bg-foreground text-background"
                    : "bg-card text-foreground hover:bg-secondary border border-border"
                  }`}
              >
                {b}
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {products.length} products
          </p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => {
              const cardBadges = getProductBadges(p);
              const benefit = benefitByType[p.type] ?? "Pure & wholesome goodness";
              const isBestSeller = BEST_SELLER_IDS.has(p.id);
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group flex flex-col rounded-3xl bg-card p-5 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 border border-border/40"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                    {isBestSeller && (
                      <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[11px] font-semibold shadow-soft">
                        <Sparkles className="h-3 w-3" /> Best Seller
                      </span>
                    )}
                    <span className="absolute top-3 right-3 z-10 rounded-full bg-card/95 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-soft">
                      {p.size}
                    </span>
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">{p.brand}</span>
                    <span className="text-[11px] font-medium text-muted-foreground">{p.category}</span>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug line-clamp-2 min-h-[3.25rem]">
                    {p.name}
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Leaf className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="line-clamp-1">{benefit}</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cardBadges.map((b) => (
                      <span
                        key={b.label}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2.5 py-1 text-[10.5px] font-medium border border-border/60"
                      >
                        <b.icon className="h-3 w-3 text-primary" />
                        {b.label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-end justify-between border-t border-border/60 pt-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Price</p>
                      <p className="font-display text-2xl font-bold leading-none mt-1">{p.price}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      <Zap className="h-3.5 w-3.5" /> In Stock
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="hero" onClick={() => handleAdd(p)} className="w-full">
                      <Plus className="h-4 w-4" /> Add to Cart
                    </Button>
                    <CustomerDetailsDialog
                      title={`Buy Now — ${p.name}`}
                      description="Enter your delivery details and we'll send this order to WhatsApp."
                      buildOrderLines={() => [
                        `1. ${p.name} (${p.size}) — 1 × ${p.price}`,
                        "",
                        `Subtotal: ${p.price}`,
                      ]}
                      trigger={
                        <Button variant="outline-hero" className="w-full">
                          Buy Now <ArrowRight className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </motion.article>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground">No products match your search or filters.</p>
                <button
                  onClick={() => { setQuery(""); setCat("All"); setBrand("All Brands"); }}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
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
                desc: "+91 ${PHONE}",
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
