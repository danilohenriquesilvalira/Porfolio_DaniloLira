'use client';  // ✅ JÁ TEM

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Componente para "voltar ao topo" com animações e detecção de scroll
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Manipulador de scroll
  const handleScroll = () => {
    // Mostrar o botão quando a página tiver rolado mais de 300px
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  // Função para voltar ao topo da página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Adicionar event listener de scroll
  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Resetar isVisible quando a rota muda
  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-tech-blue rounded-full flex items-center justify-center shadow-lg group"
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <FaArrowUp className="text-white text-xl group-hover:animate-bounce" />
          
          {/* Círculo pulsante ao redor do botão */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-tech-blue"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;