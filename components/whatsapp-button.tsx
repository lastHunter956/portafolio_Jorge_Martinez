"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";

export function WhatsAppButton() {
  const [name, setName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const phoneNumber = "573127815413";

  const handleSendMessage = () => {
    let message = "Hola, Sr. Jorge. Vengo desde su página web y me gustaría obtener más información acerca de sus servicios.";
    if (name.trim() !== "") {
      message += ` Mi nombre es ${name}.`;
    }
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 20); // Espera de 20 milisegundos antes de abrir WhatsApp
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isHovered && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isHovered]);

  return (
    <div className="fixed bottom-8 left-8 z-50 flex items-center">
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="flex items-center"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#25D366] p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={handleSendMessage}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.button>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10, transition: { duration: 2 } }} // Ajusta la duración de la animación de salida a 2 segundos
            transition={{ duration: 0.5 }} // Ajusta la duración de la animación de entrada
            className="ml-4 bg-background p-2 shadow-lg flex items-center"
          >
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border p-2 w-full mr-2 bg-gray-800 text-white"
              placeholder="Tu nombre"
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#25D366] text-white p-2 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}