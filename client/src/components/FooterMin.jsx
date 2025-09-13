import React from 'react';
import { motion } from 'framer-motion';

// Este componente é a estrutura principal que usa o Footer.
const App = () => {
  return (
    <div className="bg-gray-0 text-gray-100 font-sans flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        {/* Adicione o conteúdo da sua página aqui */}
        
      </main>
      
      {/* Componente Footer com estilo minimalista */}
      <Footer />
    </div>
  );
};

// Componente Footer que corresponde ao design da imagem.
const Footer = () => {
  const hoverVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.1, opacity: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 }
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -2, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-[#121212] text-white">
      {/* Seção principal do rodapé - Layout da imagem */}
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        {/* Logo */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
                    src="/logo192.png" 
                    alt="V-Airon Logo" 
                    className="w-12 h-12 object-contain"
                />
        </motion.div>
        
        {/* Divisor cinza claro */}
        <div className='w-[90%] h-[0.5px] bg-gray-300/15 mb-8'></div>

        {/* Links de navegação */}
        <motion.div 
          className="flex flex-wrap justify-center space-x-6 sm:space-x-10 mb-8 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a 
            href="#" 
            className="hover:text-gray-400 transition-colors duration-200"
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
          >
            Home
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-gray-400 transition-colors duration-200"
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
          >
            Planos
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-gray-400 transition-colors duration-200"
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
          >
            AI Tools
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-gray-400 transition-colors duration-200"
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
          >
            About Us
          </motion.a>
        </motion.div>

        {/* Ícones de redes sociais */}
        <motion.div 
          className="flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* GitHub */}
          <motion.a 
            href="#" 
            aria-label="GitHub" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            variants={hoverVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.26.82-.577v-2.09c-3.338.724-4.042-1.61-4.042-1.61-.545-1.38-.133-1.09-.133-1.09 1.087.732 1.657 1.112 1.657 1.112.966 1.651 2.571 1.173 3.19.897.094-.698.375-1.173.681-1.436-2.438-.276-4.994-1.217-4.994-5.424 0-1.19.421-2.164 1.103-2.92-.11-.276-.481-1.385.103-2.88 0 0 .902-.292 2.962 1.101.859-.239 1.776-.358 2.693-.362.917.004 1.834.123 2.693.362 2.06-1.393 2.962-1.101 2.962-1.101.584 1.495.213 2.604.103 2.88.682.756 1.103 1.73 1.103 2.92 0 4.212-2.557 5.146-5.002 5.416.376.326.717.965.717 1.947v2.966c0 .317.219.69.82.577 4.771-1.587 8.207-6.085 8.207-11.387C24 5.373 18.627 0 12 0z"/>
            </svg>
          </motion.a>
          {/* Instagram */}
          <motion.a 
            href="#" 
            aria-label="Instagram" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            variants={hoverVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07c1.17.055 1.884.225 2.234.375.464.204.85.452 1.25.85.4.4.646.786.85 1.25.15.35.32 1.064.375 2.234.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.225 1.884-.375 2.234-.204.464-.452.85-.85 1.25-.4.4-.786.646-1.25.85-.35.15-1.064.32-2.234.375-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.884-.225-2.234-.375-.464-.204-.85-.452-.85-1.25-.4-.4-.646-.786-.85-1.25-.15-.35-.32-1.064-.375-2.234-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.055-1.17.225-1.884.375-2.234.204-.464.452-.85.85-1.25.4-.4.786-.646 1.25-.85.35-.15 1.064-.32 2.234-.375C8.416 2.175 8.796 2.163 12 2.163zm0 1.291c-3.197 0-3.586.012-4.83.07-1.107.052-1.65.226-1.99.375-.347.156-.635.358-.924.647-.289.289-.491.577-.647.924-.15.34-.323.883-.375 1.99-.058 1.244-.07 1.633-.07 4.83s.012 3.586.07 4.83c.052 1.107.226 1.65.375 1.99.156.347.358.635.647.924.289.289.577.491.924.647.34.15.883.323 1.99.375 1.244.058 1.633.07 4.83.07s3.586-.012 4.83-.07c1.107-.052 1.65-.226 1.99-.375.347-.156.635-.358.924-.647.289-.289.491-.577.647-.924.15-.34.323-.883.375-1.99.058-1.244.07-1.633.07-4.83s-.012-3.586-.07-4.83c-.052-1.107-.226-1.65-.375-1.99-.156-.347-.358-.635-.647-.924-.289-.289-.577-.491-.924-.647-.34-.15-.883-.323-1.99-.375-1.244-.058-1.633-.07-4.83-.07zM12 7.749c-2.346 0-4.251 1.905-4.251 4.251s1.905 4.251 4.251 4.251 4.251-1.905 4.251-4.251c0-2.346-1.905-4.251-4.251-4.251zm0 1.291c1.644 0 2.96 1.316 2.96 2.96s-1.316 2.96-2.96 2.96-2.96-1.316-2.96-2.96 1.316-2.96 2.96-2.96zM18.427 6.002c-.818 0-1.481.663-1.481 1.481s.663 1.481 1.481 1.481c.818 0 1.481-.663 1.481-1.481s-.663-1.481-1.481-1.481z" />
            </svg>
          </motion.a>
          {/* LinkedIn */}
          <motion.a 
            href="#" 
            aria-label="LinkedIn" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            variants={hoverVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.766s.784-1.766 1.75-1.766 1.75.79 1.75 1.766-.783 1.766-1.75 1.766zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.395-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Seção inferior do rodapé */}
      <div className="bg-[#0e0e0e] py-6 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto">
          {/* Logo e direitos autorais */}
            <motion.div 
                className="flex items-center space-x-2 text-sm mb-4 sm:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                >
                <img 
                    src="/logo192.png" 
                    alt="V-Airon Logo" 
                    className="w-6 h-6 object-contain"
                />
                <span className="text-gray-400">
                    Copyright 2024 &copy; V-Airon
                </span>
            </motion.div>

          {/* Ícones de redes sociais - Versão inferior */}
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {/* GitHub */}
            <motion.a 
              href="#" 
              aria-label="GitHub" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
              variants={hoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.26.82-.577v-2.09c-3.338.724-4.042-1.61-4.042-1.61-.545-1.38-.133-1.09-.133-1.09 1.087.732 1.657 1.112 1.657 1.112.966 1.651 2.571 1.173 3.19.897.094-.698.375-1.173.681-1.436-2.438-.276-4.994-1.217-4.994-5.424 0-1.19.421-2.164 1.103-2.92-.11-.276-.481-1.385.103-2.88 0 0 .902-.292 2.962 1.101.859-.239 1.776-.358 2.693-.362.917.004 1.834.123 2.693.362 2.06-1.393 2.962-1.101 2.962-1.101.584 1.495.213 2.604.103 2.88.682.756 1.103 1.73 1.103 2.92 0 4.212-2.557 5.146-5.002 5.416.376.326.717.965.717 1.947v2.966c0 .317.219.69.82.577 4.771-1.587 8.207-6.085 8.207-11.387C24 5.373 18.627 0 12 0z"/>
              </svg>
            </motion.a>
            {/* Instagram */}
            <motion.a 
              href="#" 
              aria-label="Instagram" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
              variants={hoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07c1.17.055 1.884.225 2.234.375.464.204.85.452 1.25.85.4.4.646.786.85 1.25.15.35.32 1.064.375 2.234.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.225 1.884-.375 2.234-.204.464-.452.85-.85 1.25-.4.4-.786.646-1.25.85-.35.15-1.064.32-2.234.375-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.884-.225-2.234-.375-.464-.204-.85-.452-.85-1.25-.4-.4-.646-.786-.85-1.25-.15-.35-.32-1.064-.375-2.234-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.055-1.17.225-1.884.375-2.234.204-.464.452-.85.85-1.25.4-.4.786-.646 1.25-.85.35-.15 1.064-.32 2.234-.375C8.416 2.175 8.796 2.163 12 2.163zm0 1.291c-3.197 0-3.586.012-4.83.07-1.107.052-1.65.226-1.99.375-.347.156-.635.358-.924.647-.289.289-.491.577-.647.924-.15.34-.323.883-.375 1.99-.058 1.244-.07 1.633-.07 4.83s.012 3.586.07 4.83c.052 1.107.226 1.65.375 1.99.156.347.358.635.647.924.289.289.577.491.924.647.34.15.883.323 1.99.375 1.244.058 1.633.07 4.83.07s3.586-.012 4.83-.07c1.107-.052 1.65-.226 1.99-.375.347-.156.635-.358.924-.647.289-.289.491-.577.647-.924.15-.34.323-.883.375-1.99.058-1.244.07-1.633.07-4.83s-.012-3.586-.07-4.83c-.052-1.107-.226-1.65-.375-1.99-.156-.347-.358-.635-.647-.924-.289-.289-.577-.491-.924-.647-.34-.15-.883-.323-1.99-.375-1.244-.058-1.633-.07-4.83-.07zM12 7.749c-2.346 0-4.251 1.905-4.251 4.251s1.905 4.251 4.251 4.251 4.251-1.905 4.251-4.251c0-2.346-1.905-4.251-4.251-4.251zm0 1.291c1.644 0 2.96 1.316 2.96 2.96s-1.316 2.96-2.96 2.96-2.96-1.316-2.96-2.96 1.316-2.96 2.96-2.96zM18.427 6.002c-.818 0-1.481.663-1.481 1.481s.663 1.481 1.481 1.481c.818 0 1.481-.663 1.481-1.481s-.663-1.481-1.481-1.481z" />
              </svg>
            </motion.a>
            {/* LinkedIn */}
            <motion.a 
              href="#" 
              aria-label="LinkedIn" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
              variants={hoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.766s.784-1.766 1.75-1.766 1.75.79 1.75 1.766-.783 1.766-1.75 1.766zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.395-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default App;
