import { motion, Variants } from 'framer-motion';
import { ProductDetail as ProductDetailModel } from '../../models/product/productDetail';
import ProductActions from '../ProductActions/ProductActions';
import './ProductDetail.css';

interface ProductDetailProps {
  product: ProductDetailModel;
}

function toArray(value: string | string[] | undefined): string {
  if (!value) return '-';
  return Array.isArray(value) ? value.join(', ') : value;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.4, ease: 'easeOut' as const }
  })
};

function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="product-detail">
      <motion.div
        className="product-detail__image"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
      </motion.div>

      <div className="product-detail__info">
        <motion.div
          className="product-detail__description"
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeInUp}
        >
          <h2>{product.brand} {product.model}</h2>
          <ul>
            {[
              ['Precio', product.price ? `${product.price} €` : 'Sin precio'],
              ['CPU', product.cpu],
              ['RAM', product.ram],
              ['Sistema Operativo', product.os],
              ['Resolución', product.displayResolution],
              ['Batería', product.battery],
              ['Cámara principal', toArray(product.primaryCamera)],
              ['Cámara secundaria', toArray(product.secondaryCmera)],
              ['Dimensiones', product.dimentions],
              ['Peso', `${product.weight} g`],
            ].map(([label, value], i) => (
              <motion.li
                key={label}
                initial="hidden"
                animate="visible"
                custom={0.3 + i * 0.05}
                variants={fadeInUp}
              >
                <strong>{label}:</strong> {value}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.9}
          variants={fadeInUp}
        >
          <ProductActions product={product} />
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetail;