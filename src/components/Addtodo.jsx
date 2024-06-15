import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = ({ fetchTodos }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      address: {
        city: city
      },
      phone: phone
    };

    try {
      const response = await axios.post('https://65e85ff24bb72f0a9c4f1aca.mockapi.io/User', newUser);
      console.log('User successfully added:', response.data);

      // Clear the form fields after successful submission
      setName('');
      setEmail('');
      setCity('');
      setPhone('');

      // Call fetchTodos to refresh the todo list
      fetchTodos();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Title</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">User Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">User City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">User Mobile No</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};

export default AddTodo;
