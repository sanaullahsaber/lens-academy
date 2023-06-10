// Add a students
export const addStudents = async (studentData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/addstudents`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(studentData),
  }); 

  const data = await response.json();
  return data;
};
