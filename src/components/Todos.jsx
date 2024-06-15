import React, { useState } from "react";
import axios from "axios";

const Todos = ({ todos, fetchTodos }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const handleEdit = (id, name, email, city, phone) => {
    setEditingId(id);
    setEditName(name);
    setEditEmail(email);
    setEditCity(city);
    setEditPhone(phone);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
    setEditCity("");
    setEditPhone("");
  };

  const handleUpdate = async (id) => {
    const updatedUser = {
      name: editName,
      email: editEmail,
      address: {
        city: editCity
      },
      phone: editPhone
    };

    try {
      await axios.put(`https://65e85ff24bb72f0a9c4f1aca.mockapi.io/User/${id}`, updatedUser);
      fetchTodos(); // Refresh the todo list after update
      handleCancelEdit(); // Reset editing state
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://65e85ff24bb72f0a9c4f1aca.mockapi.io/User/${id}`);
      fetchTodos(); // Refresh the todo list after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="b1">
      {todos.map((item) => (
        <div className="card" key={item.id}>
          {editingId === item.id ? (
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="editName" className="form-label">User Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="editName"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editEmail" className="form-label">User Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="editEmail"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editCity" className="form-label">User City</label>
                <input
                  type="text"
                  className="form-control"
                  id="editCity"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editPhone" className="form-label">User Mobile No</label>
                <input
                  type="text"
                  className="form-control"
                  id="editPhone"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleUpdate(item.id)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="card-header" style={{ backgroundColor: "green" }}>
                User Title : {item.name}
              </div>
              <div className="card-title">User Email : {item.email}</div>
              <div className="card-text">User City : {item.address.city}</div>
              <div className="card-text">User Mobile No : {item.phone}</div>
              <div className="but">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleEdit(item.id, item.name, item.email, item.address.city, item.phone)
                  }
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todos;
