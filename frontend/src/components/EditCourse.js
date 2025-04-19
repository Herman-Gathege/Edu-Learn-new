import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCourse() {
    const { id } = useParams(); // Get course ID from the URL
    console.log("Course ID from URL:", id); // 🔍 Should NOT be undefined

    const navigate = useNavigate();

    const [course, setCourse] = useState({
        title: '',
        description: '',
        content: ''
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/${id}`);
                setCourse(res.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/courses/${id}`, course);
            navigate('/courses'); // Redirect back to course list
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        value={course.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Update Course</button>
            </form>
        </div>
    );
}

export default EditCourse;
