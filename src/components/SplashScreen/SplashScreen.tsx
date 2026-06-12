import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="splash"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="splash__title"
          initial={{ fontSize: '5rem' }}
          animate={{ fontSize: '1.25rem' }}
          transition={{ delay: 1.5, duration: 0.6, ease: 'easeInOut' }}
          onAnimationComplete={onComplete}
        >
          MobileShop
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}

export default SplashScreen;