import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProduct(id);

      if (response.data.success) {
        setProduct(response.data.data);
      } else {
        setError('Failed to load product');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-message">Product not found</div>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate('/products')} className="btn-back">
        ← Back to Products
      </button>

      <div className="product-detail">
        <div className="product-image-section">
          <img src={product.images?.[0] || product.image || 'https://placehold.co/800x600/94a3b8/white?text=No+Image'} alt={product.name} />

          {product.images && product.images.length > 1 && (
            <div className="product-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="thumbnail"
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <div className="product-header">
            <h1>{product.name}</h1>
            {product.featured && <span className="featured-badge">Featured</span>}
          </div>

          <div className="product-pricing">
            <div className="price-group">
              <p className="product-price">${product.price.toFixed(2)}</p>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="product-compare-price">${product.compareAtPrice.toFixed(2)}</p>
              )}
            </div>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="savings-badge">
                Save ${(product.compareAtPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="product-rating">
              <span className="stars">{'⭐'.repeat(Math.round(product.rating))}</span>
              <span className="rating-text">{product.rating.toFixed(1)}</span>
              {product.reviewCount && (
                <span className="review-count">({product.reviewCount} reviews)</span>
              )}
            </div>
          )}

          <p className="product-description">{product.description}</p>

          {product.sku && (
            <p className="product-sku">
              SKU: <span>{product.sku}</span>
            </p>
          )}

          {product.stock !== undefined && (
            <p className="product-stock">
              Stock: <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </p>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="product-tags">
              {product.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="product-specifications">
              <h3>Specifications</h3>
              <div className="specs-grid">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock || 99}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-primary"
              disabled={product.stock === 0 || quantity > product.stock}
            >
              {product.stock === 0
                ? 'Out of Stock'
                : quantity > product.stock
                ? 'Insufficient Stock'
                : 'Add to Cart'}
            </button>

            {quantity > product.stock && product.stock > 0 && (
              <div className="error-message">Only {product.stock} available in stock</div>
            )}

            {addedToCart && (
              <div className="success-message">Added to cart!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
