"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChefHat, Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const menuItems = [
    { href: "#sobre-mi", label: "Sobre Mí" },
    { href: "#especialidades", label: "Especialidades" },
    { href: "#galeria", label: "Galería" },
    { href: "#servicios", label: "Servicios" },
    { href: "#testimonios", label: "Testimonios" },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleMenuItemClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b border-primary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Jorge Martinez chef</span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleMenuItemClick(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors hover-underline"
                >
                  {item.label}
                </button>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={scrollToContact}
              >
                Contactar
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden"
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { 
            height: "auto", 
            opacity: 1,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.2 }
            }
          },
          closed: { 
            height: 0, 
            opacity: 0,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.2 }
            }
          }
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              variants={{
                open: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                },
                closed: { opacity: 0, y: -10 },
              }}
            >
              <button
                onClick={() => handleMenuItemClick(item.href)}
                className="block w-full px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors text-left"
              >
                {item.label}
              </button>
            </motion.div>
          ))}
          <motion.div
            variants={{
              open: {
                opacity: 1,
                y: 0,
                transition: { delay: menuItems.length * 0.1 },
              },
              closed: { opacity: 0, y: -10 },
            }}
            className="px-3 py-2"
          >
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={scrollToContact}
            >
              Contactar
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}