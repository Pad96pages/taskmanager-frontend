import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} />
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
