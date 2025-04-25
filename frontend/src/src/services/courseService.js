const API_URL = 'https://api.example.com/courses';

export const fetchCourses = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return await response.json();
};

export const addCourse = async (courseData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    if (!response.ok) {
        throw new Error('Failed to add course');
    }
    return await response.json();
};

export const updateCourse = async (courseId, courseData) => {
    const response = await fetch(`${API_URL}/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    if (!response.ok) {
        throw new Error('Failed to update course');
    }
    return await response.json();
};

export const deleteCourse = async (courseId) => {
    const response = await fetch(`${API_URL}/${courseId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete course');
    }
    return await response.json();
};