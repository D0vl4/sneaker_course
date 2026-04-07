import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import { AgentChat, createAgentChat } from "@21st-sdk/react"; // Will enable if dependencies resolve
// import { useChat } from "@ai-sdk/react";

import TextPressure from './components/reactbits/TextPressure';
import Dither from './components/reactbits/Dither';

const SNEAKERS = [
  { id: 1, name: 'Air Jordan 1 Retro', price: 180, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Nike Dunk Low', price: 115, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Adidas Yeezy 350', price: 230, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'New Balance 550', price: 120, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=400' },
];

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-premium-900 text-white font-bricolage relative flex flex-col items-center">
      <Dither color="#9333ea" />
      
      {/* Header */}
      <header className="w-full max-w-7xl p-6 flex justify-between items-center z-10 glass mt-4">
        <h1 className="text-2xl font-bold tracking-tighter text-gradient">SNEAKERS</h1>
        <div className="flex gap-6 items-center">
          <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition" />
          <Heart className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition" />
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition" />
            <span className="absolute -top-2 -right-2 bg-purple-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-7xl flex-1 flex flex-col items-center pt-24 px-6 z-10">
        <div className="text-center mb-16">
          <TextPressure 
            text="RE-ENGINEERED" 
            className="text-7xl md:text-9xl mb-4" 
            minWeight={200} 
            maxWeight={900} 
          />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the future of footwear with our AI-curated collection. 
            Premium fits for the modern collector.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            SHOP COLLECTION
          </motion.button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-32">
          {SNEAKERS.map((shoe) => (
            <motion.div 
              key={shoe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass p-4 group cursor-pointer"
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-xl">
                <img 
                  src={shoe.image} 
                  alt={shoe.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-semibold">{shoe.name}</h3>
              <p className="text-purple-400 font-bold mt-2">${shoe.price}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 p-12 text-center text-gray-500 z-10 glass">
        <p>© 2026 SNEAKERS PREMIER. POWERED BY 21ST.DEV & REACTBITS.</p>
      </footer>

      {/* AI Assistant Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl z-50 animate-pulse hover:animate-none"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.button>

      {/* AI Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-premium-800 z-[60] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-premium-900">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                SNEAKER EXPERT
              </h2>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-center items-center text-center">
              <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">How can I help you cop?</h3>
              <p className="text-gray-400 mb-8 max-w-xs">
                I'm your AI sneaker expert. Ask me about trends, fit, or release dates.
              </p>
              
              {/* Mock Chat Placeholder */}
              <div className="w-full glass p-4 text-left text-sm text-gray-500 mb-4 italic">
                The 21st.dev Chat UI will appear here after agent deployment.
              </div>
              
              <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                START CONVERSATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
