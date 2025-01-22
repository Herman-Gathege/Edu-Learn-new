// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';

// function CourseDetail() {
//     const { courseId } = useParams();
//     const [course, setCourse] = useState(null);

//     useEffect(() => {
//         const fetchCourse = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/courses/${courseId}`);
//                 setCourse(res.data);
//             } catch (error) {
//                 console.error('Error fetching course:', error);
//             }
//         };
//         fetchCourse();
//     }, [courseId]);

//     if (!course) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div className="container mt-5">
//             <h1>{course.title}</h1>
//             <p>{course.description}</p>
//             <div>{course.content}</div>
//             <Link to="/courses" className="btn btn-secondary mb-4">
//                 Back to Courses
//             </Link>
//         </div>
//     );
// }

// export default CourseDetail;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CourseDetail() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
                setCourse(res.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
    }, [courseId]);

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-5">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            
            <h2>Course Content</h2>
            <div className="course-content">
                {course.content.split('\n').map((section, index) => {
                    if (section.startsWith('Module')) {
                        return <h3 key={index}>{section}</h3>;
                    } else if (section.startsWith('Lesson')) {
                        return <h4 key={index}>{section}</h4>;
                    } else if (section.startsWith('```')) {
                        return (
                            <SyntaxHighlighter language="python" style={solarizedlight} key={index}>
                                {section.replace(/```/g, '')}
                            </SyntaxHighlighter>
                        );
                    } else {
                        return <p key={index}>{section}</p>;
                    }
                })}
            </div>

            <h3>Course Features</h3>
            <ul>
                <li>Total Duration: {course.duration}</li>
                <li>Skill Level: {course.skillLevel}</li>
                <li>Prerequisites: {course.prerequisites}</li>
                <li>Resources Provided: {course.resources}</li>
            </ul>

            <h3>Course Project</h3>
            <p>{course.projectTitle}</p>
            <p>{course.projectObjective}</p>

            <Link to="/courses" className="btn btn-secondary mb-4">
                Back to Courses
            </Link>
        </div>
    );
}

export default CourseDetail;
