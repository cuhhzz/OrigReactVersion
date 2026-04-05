import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { ShoppingBag, Box, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { userAuth } from '../auth/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const Layout = () => {
  const { cart } = useStore();
  const { session, signOut } = userAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result?.success) {
      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none">
        <Link to="/" className="text-xl font-bold tracking-tighter uppercase pointer-events-auto">
          Originals Printing Co.
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide pointer-events-auto">
          <Link to="/shop" className="hover:text-emerald-400 transition-colors">SHOP</Link>
          <Link to="/tracking" className="hover:text-emerald-400 transition-colors">TRACKING</Link>
          <Link to="/cart" className="relative hover:text-emerald-400 transition-colors flex items-center gap-2">
            CART
            {cartItemCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-zinc-950">
                {cartItemCount}
              </span>
            )}
          </Link>
          {!session ? (
            <Link to="/signin" className="hover:text-emerald-400 transition-colors">
              SIGN IN
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleSignOut}
              className="hover:text-emerald-400 transition-colors"
            >
              SIGN OUT
            </button>
          )}
        </div>

        <button 
          className="md:hidden pointer-events-auto text-zinc-50"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-60 bg-zinc-950 flex flex-col items-center justify-center gap-8 text-2xl font-bold tracking-widest uppercase"
          >
            <button 
              className="absolute top-6 right-6 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <Link to="/" className="hover:text-emerald-400">Home</Link>
            <Link to="/shop" className="hover:text-emerald-400">Shop</Link>
            <Link to="/tracking" className="hover:text-emerald-400">Tracking</Link>
            <Link to="/cart" className="hover:text-emerald-400 relative">
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Link>
            {!session ? (
              <Link to="/signin" className="hover:text-emerald-400">Sign In</Link>
            ) : (
              <button
                type="button"
                onClick={handleSignOut}
                className="hover:text-emerald-400"
              >
                Sign Out
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 min-h-screen">
        <Outlet />
      </main>

      <footer className="py-12 px-6 md:px-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} NEXUS STUDIOS.</p>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-zinc-300">Instagram</Link>
          <Link to="#" className="hover:text-zinc-300">Twitter</Link>
          <Link to="#" className="hover:text-zinc-300">Terms</Link>
        </div>
      </footer>
    </div>
  );
};