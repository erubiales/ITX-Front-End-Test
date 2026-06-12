import { motion } from 'framer-motion';
import { Product } from '../../models/product/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div
      className="product-card"
      onClick={() => onClick(product.id)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
      <div className="product-card__info">
        <span className="product-card__brand">{product.brand}</span>
        <span className="product-card__model">{product.model}</span>
        <span className="product-card__price">{product.price} €</span>
      </div>
    </motion.div>
  );
}

export default ProductCard;