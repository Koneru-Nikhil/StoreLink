import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  // ================= FETCH =================
  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  };

  const fetchOrders = () => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data));
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // ================= FORM =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/products/${editingId}`,
        form
      );
      alert("✏️ Product Updated");
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/products/add", form);
      alert("✅ Product Added");
    }

    setForm({ name: "", price: "", category: "", stock: "", image: "" });
    fetchProducts();
  };

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    alert("🗑️ Product Deleted");
    fetchProducts();
  };

  // ================= EDIT =================
  const editProduct = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>👨‍💼 Admin Dashboard</h1>

      {/* ================= PRODUCT FORM ================= */}
      <div style={styles.formCard}>
        <h2>{editingId ? "Edit Product ✏️" : "Add Product ➕"}</h2>

        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} style={styles.input} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} style={styles.input} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} style={styles.input} />
        <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} style={styles.input} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={styles.input} />

        <button onClick={handleSubmit} style={styles.button}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* ================= PRODUCTS ================= */}
      <h2 style={{ marginTop: 30 }}>Products</h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p._id} style={styles.card}>
            <img
              src={p.image || "https://via.placeholder.com/150"}
              alt={p.name}
              style={styles.image}
            />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>

            <div style={styles.btnGroup}>
              <button onClick={() => editProduct(p)} style={styles.editBtn}>
                Edit
              </button>

              <button onClick={() => deleteProduct(p._id)} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ORDERS ================= */}
      <h2 style={{ marginTop: 40 }}>Orders 📦</h2>

      <div style={styles.orderBox}>
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map(order => (
            <div key={order._id} style={styles.orderCard}>
              <p><b>Name:</b> {order.customerName}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>Total:</b> ₹{order.totalAmount}</p>

              <div>
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Admin;

//////////////////////////////////////////////////////////////////////////////////////
// 🎨 STYLES
//////////////////////////////////////////////////////////////////////////////////////

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Poppins, sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "20px",
  },

  formCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    maxWidth: "400px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "8px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  btnGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  editBtn: {
    flex: 1,
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
  },

  deleteBtn: {
    flex: 1,
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
  },

  orderBox: {
    marginTop: "20px",
  },

  orderCard: {
    background: "white",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
  },
};