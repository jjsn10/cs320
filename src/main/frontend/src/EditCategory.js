import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './App.css';
import { API_URL } from './config';

const EditCategory = () => {

    const { id } = useParams(); // getting id of category to update
    const navigate = useNavigate(); // use to redirect to the list of category after updating a category
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        color: ""
    });

    const [message, setMessage] = useState("");// store message getting from errors or successful update

    useEffect(() => {
        fetchCategory();
    }, []);

    /*
    Getting the category to update
    Parameter: id
     */
    const fetchCategory = async () => {
        try {
            const response = await fetch(`${API_URL}/api/categories/${id}`);
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /*
    Submitting the value of the form data to update the category
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setMessage("Category updated successfully!");
                navigate("/category"); // Redirect to the main category page
            } else {
                setMessage("Failed to update category.");
            }
        } catch (error) {
            setMessage("There was an error updating the category!");
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="left-div updateTx">
                <h2 className="form-heading">Edit Category</h2>
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
                    <button type="submit" className="form-button">Update Category</button>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;
