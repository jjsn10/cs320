import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import { API_URL } from './config';

const Category = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        color: ""
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/api/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                setMessage("Category added successfully!");
                setFormData({
                    name: "",
                    description: "",
                    color: ""
                });
                fetchCategories(); // Refresh the list
            } else {
                setMessage("Failed to add category.");
            }
        } catch (error) {
            setMessage("There was an error adding the category!");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/categories/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setMessage("Category deleted successfully!");
                fetchCategories(); // Refresh the list
            } else {
                setMessage("Failed to delete category.");
            }
        } catch (error) {
            setMessage("There was an error deleting the category!");
            console.error(error);
        }
    };

    return (
        <div className="parent-container">
            <div className="left-div">
                <h2 className="form-heading">Add Category</h2>
                {message && <p>{message}</p>}
                <form className="category-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-input"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="color" className="form-label">Color</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            className="form-input"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="form-button">Add New Category</button>
                </form>
            </div>
            <div className="right-div">
                <h2 className="form-heading">List of Categories</h2>
                <table>
                    <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>
                                <Link to={`/edit-category/${category.id}`}>
                                    <FontAwesomeIcon icon={faEdit} style={{color: 'blue', cursor: 'pointer'}}/>
                                </Link>
                            </td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{color: 'red', cursor: 'pointer'}}
                                    onClick={() => handleDelete(category.id)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
