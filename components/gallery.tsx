"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/ui/image-modal";
import { FadeInWhenVisible } from "@/components/fade-in-when-visible";

const allImages = [
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/jTEdjrgcmdcHSPM?file=/&fileId=1074&x=1920&y=1080&a=true&etag=2db1de3e4eaf701a23e7f3177eb7f72c",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/T8EGmS56eo3NQR4?file=/&fileId=1065&x=1920&y=1080&a=true&etag=e634f05c78502a3eb634a3aa6a4b7e63",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/x2s67oRPZ3wiXDs?file=/&fileId=1064&x=1920&y=1080&a=true&etag=a566ac8b6dfcc78888fef83088e4683c",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/XDrYyQrR2TKM3DP?file=/&fileId=1054&x=1920&y=1080&a=true&etag=5bd42b320a8c831ed3fac61a4ec9bb05",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/HRNofzQqMeG55sQ?file=/&fileId=1051&x=1920&y=1080&a=true&etag=4f149c58ff8b81170472b7fc122bd9ed",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/fjYLqno3yQ8XrfF?file=/&fileId=1050&x=1920&y=1080&a=true&etag=cd8fe1dcef674e254541f06dac736bef",
    // Imágenes adicionales
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/Q7RMrNfDZ5Xk5iM?file=/&fileId=1035&x=1920&y=1080&a=true&etag=f5899cc8680025067af73b31b6358f35",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/nt2B4fGzHRLwN52?file=/&fileId=1034&x=1920&y=1080&a=true&etag=54e8dd789f96f67bd8314f24a62eec5c",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/AxkFinSwgc2HFKf?file=/&fileId=1033&x=1920&y=1080&a=true&etag=bb2588f16592d696a640033102fa0000",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/ZoWrKBk3bnfkEHr?file=/&fileId=1031&x=1920&y=1080&a=true&etag=bff774ecf6f8aa8dbb61f74a48b40f30",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/883EAb9JD7j5FFZ?file=/&fileId=1032&x=1920&y=1080&a=true&etag=d40aade8ada351e4bd3db24957bac209",
    "https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/tT2bbt2mTJFQaG5?file=/&fileId=1030&x=1920&y=1080&a=true&etag=93a2292ad3b195d2d1130f3f48f208fd"
  ];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedImages = showAll ? allImages : allImages.slice(0, 6);

  return (
    <section id="galeria" className="py-16 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient">Galería Culinaria</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un vistazo a nuestras creaciones más destacadas
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedImages.map((image, index) => (
            <FadeInWhenVisible key={index}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-xl"
              >
                <Image
                  src={image}
                  alt={`Plato gourmet ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="bg-primary/5 hover:bg-primary/10 border-primary/20"
          >
            {showAll ? "Ver menos" : "Ver más"}
          </Button>
        </motion.div>

        <AnimatePresence>
          {selectedImage !== null && (
            <ImageModal
              images={allImages}
              currentIndex={selectedImage}
              isOpen={selectedImage !== null}
              onClose={() => setSelectedImage(null)}
              onNavigate={setSelectedImage}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}