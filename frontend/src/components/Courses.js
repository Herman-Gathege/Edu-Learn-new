// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Courses() {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/api/courses');
//                 setCourses(res.data);
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         };
//         fetchCourses();
//     }, []);

//     return (
        

//         <div className="container mt-5">
//             <h1 className="text-center mb-4">Available Courses</h1>
//             <Link to="/add-course" className="btn btn-success btn-lg mb-3">Add New Course</Link> {/* Link to Add Course page */}
//             <div className="row">
//                 {courses.map(course => (
//                     <div key={course.id} className="col-md-4 mb-4">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{course.title}</h5>
//                                 <p className="card-text">{course.description}</p>
//                                 <Link to={`/courses/${course.id}`} className="btn btn-primary">
//                                     Learn More
//                                 </Link>
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
import { useAuth } from '../context/AuthContext'; // Adjust path based on file structure

function Courses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Access the authentication status from AuthContext

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses`);
                setCourses(res.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleLearnMore = (courseId) => {
        if (!isAuthenticated) {
            navigate('/signup'); // Redirect to signup if not authenticated
        } else {
            navigate(`/courses/${courseId}`); // Navigate to course details if authenticated
        }
    };

    const handleAddCourse = () => {
        if (!isAuthenticated) {
            navigate('/signup'); // Redirect to signup if not authenticated
        } else {
            navigate('/add-course'); // Navigate to add course page if authenticated
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
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <button 
                                    onClick={() => handleLearnMore(course.id)} 
                                    className="btn btn-primary bg-red mb-4 ">
                                    Start Learning
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;
