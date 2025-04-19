
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Adjust path based on file structure

// function Courses() {
//     const [courses, setCourses] = useState([]);
//     const navigate = useNavigate();
//     const { isAuthenticated } = useAuth(); // Access the authentication status from AuthContext

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses`);
//                 setCourses(res.data);
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         };
//         fetchCourses();
//     }, []);

//     const handleLearnMore = (courseId) => {
//         if (!isAuthenticated) {
//             navigate('/signup'); // Redirect to signup if not authenticated
//         } else {
//             navigate(`/courses/${courseId}`); // Navigate to course details if authenticated
//         }
//     };

//     const handleAddCourse = () => {
//         if (!isAuthenticated) {
//             navigate('/signup'); // Redirect to signup if not authenticated
//         } else {
//             navigate('/add-course'); // Navigate to add course page if authenticated
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center mb-4">Available Courses</h1>
//             <button onClick={handleAddCourse} className="btn btn-success btn-lg mb-3">
//                 Add New Course
//             </button>
//             <div className="row">
//                 {courses.map(course => (
//                     <div key={course.id} className="col-md-4 mb-4">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{course.title}</h5>
//                                 <p className="card-text">{course.description}</p>
//                                 <button 
//                                     onClick={() => handleLearnMore(course.id)} 
//                                     className="btn btn-primary bg-red mb-4 ">
//                                     Start Learning
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Courses;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Courses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses`);
            setCourses(res.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleLearnMore = (courseId) => {
        if (!isAuthenticated) {
            navigate('/signup');
        } else {
            navigate(`/courses/${courseId}`);
        }
    };

    const handleAddCourse = () => {
        if (!isAuthenticated) {
            navigate('/signup');
        } else {
            navigate('/add-course');
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/courses/${courseId}`);
                fetchCourses(); // Refresh the list
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    const handleEditCourse = (courseId) => {
        if (!isAuthenticated) {
            navigate('/signup');
        } else {
            navigate(`/edit-course/${courseId}`);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Available Courses</h1>
            <button onClick={handleAddCourse} className="btn btn-success btn-lg mb-3">
                Add New Course
            </button>
            <div className="row">
                {courses.map(course => (
                    <div key={course.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <div className="mt-auto">
                                    <button 
                                        onClick={() => handleLearnMore(course.id)} 
                                        className="btn btn-primary me-2 mb-2">
                                        Start Learning
                                    </button>
                                    <button 
                                        onClick={() => handleEditCourse(course.id)} 
                                        className="btn btn-warning me-2 mb-2">
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteCourse(course.id)} 
                                        className="btn btn-danger mb-2">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;
