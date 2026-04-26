import { useEffect, useState } from "react";
import { Droplet, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "../CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div
          className={`flex items-center justify-between transition-all duration-300
          ${scrolled ? "py-2 px-5" : "py-3 px-6"}
          rounded-full backdrop-blur-xl bg-[#f5f1e9]/70 border border-[#e8e1d5]
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-700 text-white">
              <Droplet className="h-5 w-5" />
            </span>
            <span className="hidden sm:block text-sm font-semibold text-green-900">
              MAHAVEER
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-green-900">
            <a href="#home" className="hover:text-green-700 transition">Home</a>
            <a href="#products" className="hover:text-green-700 transition">Products</a>
            <a href="#about" className="hover:text-green-700 transition">About</a>
            <a href="#contact" className="hover:text-green-700 transition">Contact</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
           

            <CartDrawer />

            <a href="#products">
              <button className="hidden sm:inline-flex rounded-full bg-green-700 text-white px-4 py-2 text-sm hover:bg-green-800 transition">
                Shop Now
              </button>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden h-9 w-9 grid place-items-center rounded-full hover:bg-green-100"
            >
              <Menu className="h-5 w-5 text-green-900" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#f5f1e9] z-50 shadow-xl p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {/* Close */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold text-green-900">
                  Menu
                </span>
                <button onClick={() => setOpen(false)}>
                  <X className="h-6 w-6 text-green-900" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-5 text-green-900 text-base font-medium">
                <a href="#home" onClick={() => setOpen(false)}>Home</a>
                <a href="#products" onClick={() => setOpen(false)}>Products</a>
                <a href="#about" onClick={() => setOpen(false)}>About</a>
                <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* CTA */}
              <a href="#products" onClick={() => setOpen(false)}>
                <button className="w-full rounded-full bg-green-700 text-white py-3 text-sm font-medium hover:bg-green-800 transition">
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