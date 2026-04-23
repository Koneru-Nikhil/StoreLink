import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment({ cart, setCart }) {
  const navigate = useNavigate();

  // 📍 GET SAVED ADDRESS
  const address = localStorage.getItem("address");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    // ❗ VALIDATION
    if (!address) {
      alert("Please add delivery address first");
      navigate("/");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const order = {
      customerName: "Nikhil",
      address,
      items: cart,
      totalAmount,
    };

    // ✅ SAVE ORDER IN DB
    await axios.post("http://localhost:5000/api/orders/place", order);

    // 📲 WHATSAPP MESSAGE (FIXED)
    const message = `
🛒 *New Grocery Order*

📦 Items:
${cart.map(i => `• ${i.name} x ${i.quantity}`).join("\n")}

💰 Total: ₹${totalAmount}

📍 Address:
${address}
`;

    const phone = "919398650761"; // 🔥 PUT YOUR REAL NUMBER

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    alert("✅ Order Placed Successfully!");

    setCart([]);
    navigate("/"); // go back to shop
  };

  return (
    <div style={styles.container}>
      <h1>💳 Payment</h1>

      {/* ADDRESS BOX */}
      <div style={styles.addressBox}>
        <h3>Delivery Address</h3>
        <p>{address || "No address added"}</p>
      </div>

      {/* CART SUMMARY */}
      <div style={styles.summary}>
        <h3>Order Summary</h3>

        {cart.map(item => (
          <div key={item._id} style={styles.item}>
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr />

        <h2>Total: ₹{totalAmount}</h2>
      </div>

      {/* BUTTON */}
      <button onClick={placeOrder} style={styles.payBtn}>
        Pay & Place Order
      </button>
    </div>
  );
}

export default Payment;

//////////////////////////////////////////////////////////////////////////////////////
// 🎨 STYLES
//////////////////////////////////////////////////////////////////////////////////////

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  addressBox: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
  },

  summary: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  payBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "15px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};