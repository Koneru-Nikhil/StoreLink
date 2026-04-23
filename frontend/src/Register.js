import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);

      // 🔥 AUTO LOGIN AFTER REGISTER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setMessage("Registration successful ✅");

      // 🚀 instant redirect
      navigate("/");

    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      
      {/* LEFT IMAGE */}
      <div style={styles.left}>
        <img
          src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
          alt="grocery"
          style={styles.image}
        />

        <div style={styles.overlay}>
          <h1>Join Kirana Store 🛒</h1>
          <p>Create your account and start shopping</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <form style={styles.card} onSubmit={handleRegister}>
          <h2 style={styles.heading}>Create Account ✨</h2>

          {message && (
            <p
              style={{
                ...styles.message,
                color: message.includes("successful") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <div style={styles.passwordBox}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              style={styles.input}
              required
            />
            <span
              style={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button style={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p style={styles.bottomText}>
            Already have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

//////////////////////////////////////////////////////////////////////////////////////
// 🎨 INLINE CSS
//////////////////////////////////////////////////////////////////////////////////////

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Poppins, sans-serif",
  },

  left: {
    flex: 1,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center",
    background: "rgba(0,0,0,0.5)",
    padding: "25px",
    borderRadius: "12px",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },

  card: {
    width: "360px",
    padding: "35px",
    borderRadius: "15px",
    background: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  heading: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },

  passwordBox: {
    position: "relative",
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "12px",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

  message: {
    marginBottom: "10px",
    fontWeight: "500",
  },

  bottomText: {
    marginTop: "15px",
    fontSize: "14px",
  },

  link: {
    color: "#4CAF50",
    cursor: "pointer",
    fontWeight: "bold",
  },
};