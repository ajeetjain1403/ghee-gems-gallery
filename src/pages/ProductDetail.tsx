import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Leaf, Sparkles, Droplet, Zap, ShieldCheck, Truck, Star, ArrowRight, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { useCart } from "@/hooks/use-cart";
import { useProducts, type Product } from "@/hooks/use-products";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/ui/navbar";
import { FaWhatsapp } from "react-icons/fa6";

const PHONE = "+919512983111";
const WA_LINK = `https://wa.me/919512983111?text=${encodeURIComponent("Hi Mahaveer Marketing, I want to place an order")}`;

const BADGE_ICONS: Record<string, typeof Leaf> = {
  "Best Seller": Sparkles,
  "Cold Pressed": Droplet,
  "Chemical-Free": Leaf,
};

const getProductBadges = (p: Product) => {
  const labels: string[] = [];
  if (p.isBestSeller) labels.push("Best Seller");
  for (const b of p.badges) if (!labels.includes(b)) labels.push(b);
  return labels.slice(0, 3).map((label) => ({ label, icon: BADGE_ICONS[label] ?? Leaf }));
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { add } = useCart();
  const { data: products = [], isLoading } = useProducts();
  const [added, setAdded] = useState(false);

  const product = useMemo(() => {
    return products.find((p) => String(p.id) === id);
  }, [products, id]);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
      .slice(0, 4);
  }, [products, product]);

  const handleAdd = (p: Product) => {
    add({ id: p.id, name: p.name, brand: p.brand, size: p.size, price: p.price, img: p.img });
    toast({ title: "Added to cart", description: `${p.name} • ${p.size}` });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = (p: Product) => {
    add({ id: p.id, name: p.name, brand: p.brand, size: p.size, price: p.price, img: p.img });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Product not found.</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Store
        </Button>
      </div>
    );
  }

  const cardBadges = getProductBadges(product);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />


      {/* Product Hero */}
      <section className="container py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Images */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary shadow-card border border-border/40">
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold shadow-soft">
                <Sparkles className="h-3.5 w-3.5" /> Best Seller
              </span>
            )}
            <ProductImageCarousel images={product.images} alt={product.name} />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary bg-primary/10 px-3 py-1 rounded-full">
                {product.brand}
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                {product.size}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground flex items-start gap-2">
              <Leaf className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              {product.benefit}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {cardBadges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-3 py-1.5 text-xs font-medium border border-border/60"
                >
                  <b.icon className="h-3.5 w-3.5 text-primary" />
                  {b.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-baseline gap-4">
              <p className="font-display text-4xl md:text-5xl font-bold text-primary">{product.price}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <Zap className="h-4 w-4" /> In Stock
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                variant="hero"
                onClick={() => handleAdd(product)}
                className="flex-1 h-14 text-base"
              >
                {added ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" /> Added!
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Add to Cart
                  </>
                )}
              </Button>
              <CustomerDetailsDialog
                title={`Buy Now — ${product.name}`}
                description={`Enter your delivery details to place your order.\nDelivery is available within 5 km only. Additional delivery charges will apply and will be shared on WhatsApp.`}
                buildOrderLines={() => [
                  `1. ${product.name} (${product.size}) — 1 × ${product.price}`,
                  "",
                  `Subtotal: ${product.price}`,
                ]}
                trigger={
                  <Button variant="outline-hero" className="flex-1 h-14 text-base">
                    Buy Now <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                }
              />
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-4 py-2 text-sm font-medium border border-green-200 hover:bg-green-100 transition-colors"
              >
                <FaWhatsapp className="h-4 w-4" /> Order on WhatsApp
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium border border-border/60 hover:bg-secondary/80 transition-colors"
              >
                <Phone className="h-4 w-4" /> Call to Order
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, t: "100% Authentic", d: "Genuine branded products" },
                { icon: Truck, t: "Same Day Delivery", d: "Quick doorstep delivery" },
              ].map((f) => (
                <div key={f.t} className="flex gap-3 p-4 rounded-2xl bg-card shadow-card border border-border/40">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{f.t}</p>
                    <p className="text-xs text-muted-foreground">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold">You May Also Like</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group flex flex-col rounded-2xl bg-card p-4 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/40 cursor-pointer"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">{p.brand}</span>
                    <span className="text-[10px] font-medium text-muted-foreground">{p.size}</span>
                  </div>
                  <h4 className="mt-1 font-display text-base font-semibold leading-snug line-clamp-2 min-h-[2.75rem]">
                    {p.name}
                  </h4>
                  <p className="mt-2 font-display text-xl font-bold">{p.price}</p>
                  <Button
                    variant="hero"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(p);
                    }}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-16 container">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Need Help Choosing?</h2>
          <p className="mt-3 text-muted-foreground">
            Our team is happy to help you pick the right oil for your needs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="lg">
                <FaWhatsapp className="h-4 w-4 mr-2" /> Chat on WhatsApp
              </Button>
            </a>
            <Button variant="outline" size="lg" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Store
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
