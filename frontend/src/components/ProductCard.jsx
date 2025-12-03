import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleViewDetails}>
      <div className="product-image">
        {product.featured && <span className="featured-badge-card">Featured</span>}
        <img src={product.images?.[0] || product.image || 'https://placehold.co/400x300/94a3b8/white?text=No+Image'} alt={product.name} />
        {product.stock !== undefined && product.stock <= 10 && product.stock > 0 && (
          <span className="low-stock-badge">Only {product.stock} left!</span>
        )}
        {product.stock === 0 && (
          <span className="out-of-stock-badge">Out of Stock</span>
        )}
      </div>
      <div className="product-card-content">
        <h3>{product.name}</h3>

        <div className="product-card-pricing">
          <p className="product-card-price">${product.price.toFixed(2)}</p>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <p className="product-card-compare-price">${product.compareAtPrice.toFixed(2)}</p>
          )}
        </div>

        {product.rating && (
          <div className="product-card-rating">
            <span className="stars-small">{'⭐'.repeat(Math.round(product.rating))}</span>
            <span className="rating-text-small">{product.rating.toFixed(1)}</span>
            {product.reviewCount && (
              <span className="review-count-small">({product.reviewCount})</span>
            )}
          </div>
        )}



        {product.tags && product.tags.length > 0 && (
          <div className="product-card-tags">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag-small">{tag}</span>
            ))}
          </div>
        )}

        <div className="product-card-actions">
          <button
            onClick={handleAddToCart}
            className="btn-add-to-cart"
            disabled={addedToCart || product.stock === 0}
          >
            {addedToCart ? 'Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button onClick={handleViewDetails} className="btn-view-details">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
