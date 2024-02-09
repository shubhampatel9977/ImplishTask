import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const redirectToRegister = () => {
    router.push('/');
  };

  const handleLogin =  async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/logIn", {
        email,
        password
      });
      // Reset form fields after successful submission
      if (response.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        setEmail("");
        setPassword("");
        router.push("/companys");
      }
    } catch (error: any) {
      // Handle error
      console.error("Error submitting form:", error.message);
    }
    
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            type="submit"
          >
            Login
          </button>
          <button
            onClick={redirectToRegister}
            style={{ width: '50%', marginTop:'15px', backgroundColor: '#007bff', padding: '10px', color: '#ffffff', border: '2px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;