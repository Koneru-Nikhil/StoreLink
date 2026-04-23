import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* LEFT SIDE IMAGE */}
      <div style={styles.left}>
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="grocery"
          style={styles.image}
        />

        <div style={styles.overlay}>
          <h1>Kirana Store 🛒</h1>
          <p>Fresh groceries at your doorstep</p>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div style={styles.right}>
        <form style={styles.card} onSubmit={handleLogin}>
          <h2 style={styles.heading}>Welcome Back 👋</h2>

          {error && <p style={styles.error}>{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <div style={styles.passwordBox}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
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

          <button style={styles.button}>Login</button>

          <p style={styles.bottomText}>
            Don’t have an account?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

//////////////////////////////////////////////////////////////////////////////////////
// 🎨 INLINE CSS
//////////////////////////////////////////////////////////////////////////////////////

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Poppins, sans-serif",
  },

  // LEFT SIDE
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

  // RIGHT SIDE
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

  error: {
    color: "red",
    marginBottom: "10px",
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