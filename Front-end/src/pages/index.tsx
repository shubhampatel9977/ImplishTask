import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleRagister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/signIn", {
        name,
        email,
        password,
      });
      // Reset form fields after successful submission
      if (response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        router.push("/login");
      }
    } catch (error: any) {
      // Handle error
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1>Register</h1>
        <form onSubmit={handleRagister}>
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="submit"
          >
            Register
          </button>
          <button
            onClick={redirectToLogin}
            style={{
              width: "50%",
              marginTop: "15px",
              backgroundColor: "#007bff",
              padding: "10px",
              color: "#ffffff",
              border: "2px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
