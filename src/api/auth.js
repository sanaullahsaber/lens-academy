// save a user to database
export const saveUser = (user) => {
  const currentUser = {
    name: user.name,
    email: user.email,
  };
  fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// become a admin 
export const becomeAdmin = email => {
  const currentUser = {
    role: "admin",
  }
  return fetch(`${import.meta.env.VITE_API_URL}/users/$${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  }).then(res=> res.json())
}