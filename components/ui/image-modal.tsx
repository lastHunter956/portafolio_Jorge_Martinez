"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageModalProps) {
  const [direction, setDirection] = useState<"left" | "right">("left");

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[800px] px-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ 
              opacity: 0,
              x: direction === "left" ? 20 : -20
            }}
            animate={{ 
              opacity: 1,
              x: 0
            }}
            exit={{ 
              opacity: 0,
              x: direction === "left" ? -20 : 20
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 80,
              duration: 0.8
            }}
            className="relative aspect-square w-full bg-black rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={images[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              fill
              className="object-cover"
              quality={100}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Botón izquierdo */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setDirection("left");
            onNavigate(
              currentIndex === 0 ? images.length - 1 : currentIndex - 1
            );
          }}
          className="absolute left-0 top-1/2 bg-white/20 p-4 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </motion.button>

        {/* Botón derecho */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setDirection("right");
            onNavigate(
              currentIndex === images.length - 1 ? 0 : currentIndex + 1
            );
          }}
          className="absolute right-0 top-1/2 bg-white/20 p-4 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}
