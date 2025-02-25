"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GallerySection } from "@/components/gallery";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChefHat,
  Utensils,
  GraduationCap,
  Users,
  Star,
  Clock,
  Award,
} from "lucide-react";
import Link from "next/link";

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSendMessage = async () => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("Mensaje enviado con éxito");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Error al enviar el mensaje");
      }
    } catch (error) {
      setStatus("Error al enviar el mensaje");
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-screen" ref={targetRef}>
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Plato de mariscos"
            fill
            className="object-cover brightness-50"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">
              <span className="text-gradient">Arte Culinario</span>
              <br />
              del Mar
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto px-4">
              Experiencias gastronómicas exclusivas que despiertan los sentidos
            </p>
            <Button
              size="lg"
              className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={scrollToContact}
            >
              Contactar Ahora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-16 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="relative h-[350px] md:h-[600px] w-full">
                <Image
                  src="https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/4LFf3gNsrB5tbpd?file=/&fileId=1003&x=1920&y=1080&a=true&etag=053a358e109901214c95b4e7bf69de43"
                  alt="Jorge Martinez"
                  fill
                  loading="eager"
                  className="object-cover rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMz09QDMwMzM9RERQPjVBRkZQWkdHVFpoWlBQYmdoZ2pDQ1P/2wBDARUXFyAeIBoeID4mJSY+Q0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  placeholder="blur"
                  priority
                />
                <div className="absolute -bottom-8 -right-8 bg-primary/10 backdrop-blur-sm p-6 rounded-lg hidden md:block">
                  <div className="flex items-center space-x-4">
                    <Award className="h-12 w-12 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">25+ Años</p>
                      <p className="text-muted-foreground">de Excelencia</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8 mt-12 md:mt-0">
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-gradient">Sobre Jorge Martinez</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Con 25 años de experiencia en gastronomía internacional y
                  nacional, le ofrece una propuesta culinaria única. Disfrute de
                  los mejores sabores de la cocina italiana, francesa, española,
                  fusión, marina y colombiana, elaborados con pasión y
                  precisión. Formado en España y Colombia, pone a su disposición
                  servicios de catering, eventos exclusivos, clases de cocina y
                  menús personalizados. Su trayectoria incluye la participación
                  en producciones televisivas y eventos de talla internacional,
                  aportando su creatividad y excelencia en cada plato. Su
                  cocina, inspirada en aromas y ambientes únicos, se basa en
                  ingredientes frescos y especias que despiertan los sentidos.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Star className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-semibold">Premiado</h3>
                      <p className="text-sm text-muted-foreground">
                        Reconocimiento Local
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <GraduationCap className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-semibold">Formación Elite</h3>
                      <p className="text-sm text-muted-foreground">
                        Escuelas Europeas
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="especialidades" className="py-16 md:py-32 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Creaciones Signature</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubra nuestras especialidades marinas, elaboradas con los
                ingredientes más frescos y técnicas innovadoras
              </p>
            </div>
          </FadeInWhenVisible>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cazuela de Mariscos",
                image:
                  "https://www.tqma.com.ec/images/com_yoorecipe/banner_superior/18201_1.jpg",
                description:
                  "Cazuela de mariscos frescos en leche de coco con vegetales y especias",
                price: "$50.000 cop / persona",
              },
              {
                title: "Timbal de Marisco",
                image:
                  "https://okdiario.com/img/2019/07/19/receta-de-timbal-de-marisco-655x368.jpg",
                description:
                  "Mariscos frescos en timbal con vegetales, reducción de vino y especias",
                price: "$70.000 cop / persona",
              },
              {
                title: "Paella de Mariscos",
                image:
                  "https://images.unsplash.com/photo-1534080564583-6be75777b70a",
                description: "Arroz español tradicional con mariscos frescos",
                price: "$65.000 cop / persona",
              },
            ].map((dish, index) => (
              <FadeInWhenVisible key={index}>
                <Card className="group overflow-hidden bg-primary/5 border-primary/20 h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <CardContent className="p-6 relative">
                    <h3 className="text-xl font-semibold mb-2">{dish.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {dish.description}
                    </p>
                    <p className="text-primary font-semibold">{dish.price}</p>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Services Section */}
      <section id="servicios" className="py-16 md:py-32 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Nuestros Servicios</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Desde cenas privadas hasta talleres culinarios, ofrecemos una
                gama de servicios exclusivos
              </p>
            </div>
          </FadeInWhenVisible>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cenas Privadas",
                icon: <ChefHat className="h-10 w-10 text-primary" />,
                description:
                  "Experiencia gastronómica en su hogar. Disfrute de aromas y sabores únicos que harán de su ocasión un momento inolvidable",
                price: "desde $350.000 cop",
              },
              {
                title: "Clases de Cocina",
                icon: <Utensils className="h-10 w-10 text-primary" />,
                description:
                  "Aprenda los secretos de la comida Marina e internacional con el chef Jorge Martínez",
                price: "desde $50.000 cop / persona",
              },
              {
                title: "Catering para Eventos",
                icon: <Users className="h-10 w-10 text-primary" />,
                description:
                  "Déjenos acompañarlo con profesionalismo y sabores inolvidables, creando experiencias únicas e irrepetibles",
                price: "Presupuesto personalizado",
              },
            ].map((service, index) => (
              <FadeInWhenVisible key={index}>
                <Card className="group hover:bg-primary/5 transition-colors duration-300 border-primary/20 h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      className="flex justify-center mb-6"
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <p className="text-primary font-semibold">
                      {service.price}
                    </p>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-16 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Testimonios</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Lo que dicen nuestros clientes sobre sus experiencias
              </p>
            </div>
          </FadeInWhenVisible>
          <Carousel className="max-w-xl mx-auto">
            <CarouselContent>
              {[
                {
                  text: "Excelente sabor delicioso cóctel de bienvenida una hermosa presentación muchas gracias por sus servicios señor Jorge",
                  author: "Lorena",
                  role: "Matrimonio",
                },
                {
                  text: "Excelente conocimiento de comidas típicas internacionales  buen manejo de la cocina y de personal",
                  author: "José Arle Rivera",
                  role: "Evento Catering",
                },
                {
                  text: "Buena presentación buen desempeño manejo estupendo de los ingredientes a grado de los comensales hacia los platos preparados con un delicioso sabor y aroma de las preparaciones",
                  author: "Claudia Fadul",
                  role: "Evento Privado",
                },
              ].map((testimonial, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                          <Star className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-lg mb-6 italic">
                          &quot;{testimonial.text}&quot;
                        </p>
                        <p className="font-semibold text-lg">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary -left-12 hidden md:flex" />
            <CarouselNext className="text-primary -right-12 hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 md:py-32 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <FadeInWhenVisible>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-gradient">Contacto</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  ¿Interesado en nuestros servicios? Contáctenos para discutir
                  sus necesidades culinarias
                </p>
                <div className="space-y-6">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Horario de Atención</p>
                          <p className="text-muted-foreground">
                            Lunes a Sábado: 07:00 - 19:00
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="space-y-4">
                    <p className="flex items-center space-x-2">
                      <span className="font-semibold">Email:</span>
                      <span className="text-muted-foreground">
                        martinezchef.1106@gmail.com
                      </span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="font-semibold">Teléfono:</span>
                      <span className="text-muted-foreground">
                        +57 312 7815413
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
              <div className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Su Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 rounded-lg border bg-primary/5 border-primary/20 focus:border-primary focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Su Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 rounded-lg border bg-primary/5 border-primary/20 focus:border-primary focus:ring-primary"
                  />
                  <textarea
                    placeholder="Su Mensaje"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 rounded-lg border bg-primary/5 border-primary/20 focus:border-primary focus:ring-primary"
                  />
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleSendMessage}
                  >
                    Enviar Mensaje
                  </Button>
                  {status && <p className="mt-4 text-center">{status}</p>}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 mb-4 md:mb-0"
            >
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Jorge Martinez chef</span>
            </motion.div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Jorge Martinez chef. Todos los
              derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
