import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map(item => {
      if (item._id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Background Image URL - You can change this to any food/lifestyle image
  const bgImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000";

  if (cart.length === 0) {
    return (
      <div style={{...styles.pageWrapper, backgroundImage: `url(${bgImage})`}}>
        <div style={styles.overlay}>
          <div style={styles.emptyContainer}>
            <div style={{ fontSize: '5rem', marginBottom: '10px' }}>🍳</div>
            <h2 style={{ color: '#fff', fontSize: '28px' }}>Your cart is empty</h2>
            <p style={{ color: '#ddd', marginBottom: '20px' }}>Hungry? Let's add some delicious items!</p>
            <button style={styles.shopBtn} onClick={() => navigate("/")}>Browse Menu</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{...styles.pageWrapper, backgroundImage: `url(${bgImage})`}}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <header style={styles.headerSection}>
            <h1 style={styles.header}>Checkout</h1>
            <p style={styles.subHeader}>{cart.length} Items in your basket</p>
          </header>
          
          <div style={styles.itemList}>
            {cart.map(item => (
              <div key={item._id} style={styles.cartItem}>
                <div style={styles.itemInfo}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemPrice}>₹{item.price} per unit</span>
                </div>
                
                <div style={styles.counter}>
                  <button style={styles.counterBtn} onClick={() => updateQuantity(item._id, -1)}>−</button>
                  <span style={styles.qtyText}>{item.quantity}</span>
                  <button style={styles.counterBtn} onClick={() => updateQuantity(item._id, 1)}>+</button>
                </div>
              </div>
            ))}

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <div style={styles.footer}>
            <button style={styles.payBtn} onClick={() => navigate("/payment")}>
              <div style={styles.payBtnText}>
                <span style={{fontSize: '14px', opacity: 0.9}}>Total Amount</span>
                <span style={{fontSize: '18px'}}>₹{totalAmount}</span>
              </div>
              <span style={styles.payAction}>Proceed to Pay →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  overlay: {
    minHeight: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darkens background for readability
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '450px',
    marginTop: '40px',
    paddingBottom: '120px', // Space for fixed footer
  },
  headerSection: {
    marginBottom: '25px',
    color: '#fff',
  },
  header: { fontSize: '32px', fontWeight: '800', margin: 0 },
  subHeader: { fontSize: '16px', opacity: 0.8, marginTop: '5px' },
  itemList: { 
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: '20px', 
    padding: '20px', 
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(10px)'
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #eee'
  },
  itemInfo: { display: 'flex', flexDirection: 'column' },
  itemName: { fontSize: '18px', fontWeight: '700', color: '#333' },
  itemPrice: { fontSize: '13px', color: '#888', marginTop: '2px' },
  counter: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #28ad1d',
    borderRadius: '10px',
    backgroundColor: '#f0fff0'
  },
  counterBtn: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#28ad1d',
    padding: '8px 14px',
    fontSize: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.2s'
  },
  qtyText: { width: '24px', textAlign: 'center', fontWeight: '800', color: '#28ad1d', fontSize: '16px' },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '2px dashed #ddd',
    fontSize: '18px',
    fontWeight: '700',
    color: '#333'
  },
  footer: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 40px)',
    maxWidth: '450px',
  },
  payBtn: {
    width: '100%',
    backgroundColor: '#28ad1d',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '14px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(40, 173, 29, 0.4)',
    transition: 'transform 0.2s ease',
  },
  payBtnText: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  payAction: { fontWeight: '700', fontSize: '16px' },
  emptyContainer: { 
    textAlign: 'center', 
    marginTop: '20vh',
    padding: '40px',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: '30px',
    backdropFilter: 'blur(5px)'
  },
  shopBtn: { 
    padding: '12px 30px', 
    backgroundColor: '#e23744', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '12px', 
    fontSize: '16px', 
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(226, 55, 68, 0.4)'
  }
};

export default Cart;