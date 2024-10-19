import React, { useState } from "react";
import { Link } from "react-router-dom";
import './App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

const Category = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        color: ""
    });

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
            const response = await fetch("http://localhost:8080/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Category added:", data);
                // Optionally, reset the form after successful submission
                setFormData({
                    name: "",
                    description: "",
                    color: ""
                });
            } else {
                console.error("Failed to add category:", response.statusText);
            }
        } catch (error) {
            console.error("There was an error adding the category!", error);
        }
    };

    return (
        <div className="parent-container">
            <div className="left-div">
                <h2 className="form-heading">Add Category</h2>
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
                    <tr>
                        <td><FontAwesomeIcon icon={faEdit} style={{color: 'blue'}}/></td>
                        <td>Salary</td>
                        <td>Monthly Income</td>
                        <td><FontAwesomeIcon icon={faTrash} style={{color: 'red'}}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEdit} style={{color: 'blue'}}/></td>
                        <td>Shopping</td>
                        <td>Groceries and Clean elements</td>
                        <td><FontAwesomeIcon icon={faTrash} style={{color: 'red'}}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEdit} style={{color: 'blue'}}/></td>
                        <td>Car</td>
                        <td>Insurance, Gas or Cleaning</td>
                        <td><FontAwesomeIcon icon={faTrash} style={{color: 'red'}}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
