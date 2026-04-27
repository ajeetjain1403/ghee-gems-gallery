import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "../CartDrawer";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = `text-[14px] font-medium transition-colors duration-200 ${
    scrolled ? "text-white/90 hover:text-white" : "text-green-900 hover:text-green-700"
  }`;

  return (
    <>
      {/* Full-width Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          backgroundColor: scrolled ? "rgba(26,26,15,0.92)" : "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "0.5px solid rgba(255,255,255,0.12)"
            : "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="flex items-center justify-between transition-all duration-300"
          style={{ padding: "18px 48px" }}
        >
          {/* Logo on left + leaf */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span
              className="grid place-items-center h-7 w-7 rounded-full"
              style={{ backgroundColor: "rgba(74,140,63,0.15)" }}
            >
              <Leaf className="h-4 w-4" style={{ color: "#4a8c3f" }} />
            </span>
            <img src={logo} width={90} height={36} className="object-contain" alt="Logo" />
          </a>

          {/* Centered nav links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a href="#home" className={linkClass}>Home</a>
            <a href="#products" className={linkClass}>Products</a>
            <a href="#about" className={linkClass}>About</a>
            <a href="#contact" className={linkClass}>Contact</a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div
              className={`grid place-items-center h-10 w-10 rounded-full transition-colors duration-300 ${
                scrolled
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-black/5 hover:bg-black/10 text-green-900"
              }`}
            >
              <CartDrawer />
            </div>

            <a href="#products" className="hidden sm:inline-flex">
              <button
                className="rounded-full text-white text-[14px] font-medium px-5 py-2.5 transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                style={{ backgroundColor: "#4a8c3f", fontFamily: '"DM Sans", system-ui, sans-serif' }}
              >
                Shop Now
              </button>
            </a>

            {/* Mobile menu */}
            <button
              onClick={() => setOpen(true)}
              className={`md:hidden h-10 w-10 grid place-items-center rounded-full transition-colors ${
                scrolled ? "text-white hover:bg-white/10" : "text-green-900 hover:bg-black/5"
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#f5f1e9] z-50 shadow-xl p-6 flex flex-col"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold text-green-900">Menu</span>
                <button onClick={() => setOpen(false)}>
                  <X className="h-6 w-6 text-green-900" />
                </button>
              </div>
              <div className="flex flex-col gap-5 text-green-900 text-base font-medium">
                <a href="#home" onClick={() => setOpen(false)}>Home</a>
                <a href="#products" onClick={() => setOpen(false)}>Products</a>
                <a href="#about" onClick={() => setOpen(false)}>About</a>
                <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
              </div>
              <div className="flex-1" />
              <a href="#products" onClick={() => setOpen(false)}>
                <button
                  className="w-full rounded-full text-white py-3 text-sm font-medium transition hover:opacity-90"
                  style={{ backgroundColor: "#4a8c3f" }}
                >
                  Shop Now
                </button>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
