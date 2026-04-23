import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Shop({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [showModal, setShowModal] = useState(false);

  const [tempAddress, setTempAddress] = useState({
    house: "", building: "", area: "", city: "", state: "", phone: ""
  });

  // Background Image URL (Fresh Groceries)
  const bgImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000";

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const saveAddress = () => {
    const { house, area, city, phone } = tempAddress;
    if (!house || !area || !city || !phone) {
      alert("Please fill required fields");
      return;
    }
    const fullAddress = `${tempAddress.house}, ${tempAddress.building}, ${tempAddress.area}, ${tempAddress.city}`;
    setAddress(fullAddress);
    localStorage.setItem("address", fullAddress);
    setShowModal(false);
  };

  return (
    <div style={{...styles.container, backgroundImage: `url(${bgImage})`}}>
      <div style={styles.overlay}>
        
        {/* NAVBAR */}
        <nav style={styles.navbar}>
          <div style={styles.navContent}>
            <h1 style={styles.logo}>
              🛒 <span style={{ color: "#2ecc71" }}>Kirana</span>Store
            </h1>

            <div style={styles.addressBox} onClick={() => setShowModal(true)}>
              <span style={{fontSize: '12px', color: '#7f8c8d', display: 'block'}}>Deliver to:</span>
              <span style={styles.addressText}>📍 {address ? address : "Select Address"}</span>
            </div>

            <div style={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search fresh groceries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.search}
              />
            </div>

            <div style={styles.navActions}>
              <Link to="/cart" style={{textDecoration: 'none'}}>
                <button style={styles.cartBtn}>
                  Cart <span>({cart.length})</span>
                </button>
              </Link>
              <button onClick={logout} style={styles.logoutBtn}>Logout</button>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div style={styles.main}>
          <div style={styles.glassHeader}>
            <h2 style={styles.heading}>Fresh Picks for You</h2>
            <p style={{color: '#fff', opacity: 0.9}}>Quality groceries delivered to your doorstep</p>
          </div>

          <div style={styles.grid}>
            {filteredProducts.map(p => (
              <div key={p._id} style={styles.card}>
                <div style={styles.imgWrapper}>
                    <img src={p.image || "https://via.placeholder.com/150"} alt={p.name} style={styles.image} />
                </div>
                <h3 style={styles.cardTitle}>{p.name}</h3>
                <p style={styles.price}>₹{p.price}</p>
                <button onClick={() => addToCart(p)} style={styles.addBtn}>
                  Add to Cart +
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2 style={{marginTop: 0, color: '#2c3e50'}}>Delivery Details</h2>
              <input placeholder="House No / Flat No" onChange={(e) => setTempAddress({ ...tempAddress, house: e.target.value })} style={styles.input} />
              <input placeholder="Building / Apartment" onChange={(e) => setTempAddress({ ...tempAddress, building: e.target.value })} style={styles.input} />
              <input placeholder="Area / Street" onChange={(e) => setTempAddress({ ...tempAddress, area: e.target.value })} style={styles.input} />
              <input placeholder="City" onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })} style={styles.input} />
              <input placeholder="Phone Number" onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })} style={styles.input} />
              <div style={styles.modalBtns}>
                <button onClick={saveAddress} style={styles.saveBtn}>Save Address</button>
                <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    fontFamily: "'Poppins', sans-serif",
  },
  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Darkens the BG for contrast
    backdropFilter: "blur(2px)",
  },
  navbar: {
    position: "sticky",
    top: 0,
    background: "rgba(255, 255, 255, 0.95)",
    padding: "12px 40px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    zIndex: 100,
  },
  navContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logo: { fontSize: "24px", fontWeight: "800", margin: 0 },
  addressBox: {
    cursor: "pointer",
    padding: "4px 12px",
    borderRadius: "8px",
    border: "1px solid #eee",
    transition: "0.3s",
    background: "#fff",
    minWidth: "180px"
  },
  addressText: { fontSize: "14px", fontWeight: "600", color: "#2c3e50", whiteSpace: "nowrap" },
  searchWrapper: { flex: 1, margin: "0 40px" },
  search: {
    width: "100%",
    padding: "12px 20px",
    borderRadius: "12px",
    border: "1px solid #dfe6e9",
    outline: "none",
    fontSize: "15px",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
  },
  navActions: { display: "flex", gap: "15px" },
  cartBtn: {
    background: "#2ecc71",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(46, 204, 113, 0.3)"
  },
  logoutBtn: {
    background: "transparent",
    color: "#e74c3c",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e74c3c",
    cursor: "pointer",
    fontWeight: "600"
  },
  main: { padding: "40px", maxWidth: "1200px", margin: "0 auto" },
  glassHeader: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)"
  },
  heading: { fontSize: "36px", color: "#fff", margin: "0 0 10px 0", textShadow: "0 2px 4px rgba(0,0,0,0.3)" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.98)",
    padding: "20px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease",
  },
  imgWrapper: { overflow: 'hidden', borderRadius: '15px', marginBottom: '15px' },
  image: { width: "100%", height: "180px", objectFit: "cover", transition: '0.5s' },
  cardTitle: { fontSize: '20px', margin: '10px 0', color: '#2c3e50' },
  price: { fontSize: '18px', fontWeight: '800', color: '#2ecc71', margin: '5px 0' },
  addBtn: {
    marginTop: "15px",
    width: '100%',
    background: "#2ecc71",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: '0.2s'
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: 'blur(4px)'
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "24px",
    width: "400px",
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  modalBtns: { marginTop: "25px", display: "flex", gap: "10px" },
  saveBtn: { flex: 2, background: "#2ecc71", color: "white", padding: "12px", border: "none", borderRadius: "10px", fontWeight: '700', cursor: 'pointer' },
  cancelBtn: { flex: 1, background: "#f1f2f6", color: "#57606f", padding: "12px", border: "none", borderRadius: "10px", fontWeight: '600', cursor: 'pointer' },
};

export default Shop;