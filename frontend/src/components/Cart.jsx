import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart ({cart.length} items)</h2>
        <button onClick={clearCart} className="btn-clear-cart">
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.images?.[0] || item.image || 'https://placehold.co/100x100/94a3b8/white?text=No+Image'} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)} each</p>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="btn-quantity"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="btn-quantity"
                >
                  +
                </button>
              </div>

              <p className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
        <button className="btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
