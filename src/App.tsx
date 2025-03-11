import { useEffect, useState } from 'react'
import './App.css'
import Form from './assets/components/Form'
import Modal from './assets/components/Modal'
import List from './assets/components/List'


type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

function App() {
  const [data, setData] = useState<User[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [visible, setVisible] = useState(false)
  
  const registerUser = async (data: { first_name: string, last_name: string, email: string, avatar: string }) => {
    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      const newUser = { ...data, id: result.id || Date.now() }; // Si la API no devuelve ID, usamos `Date.now()`
      
      addUser(newUser); // Guardamos en `localStorage` y en `setData`
      setUser(newUser); // Mostramos el usuario en el modal
      setVisible(true);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const getLocalUsers = () => {
    const savedUsers = localStorage.getItem('users')
    return savedUsers ? JSON.parse(savedUsers) : []
  }

  useEffect(()=> {
  const storedUsers = getLocalUsers();
  setData((prev) => [...prev, ...storedUsers])
  }, []);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      setData(JSON.parse(savedUsers))
    }
    fetch('https://reqres.in/api/users?page=2')
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch(err => console.log("ERROR FETCHING DATA", err))
  },[])

  const moreAbout = (id: number) => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then(res => res.json())
      .then(user => {
        setUser(user.data),
        setVisible(true)})
      .catch(err => console.log("ERROR FETCHING USER", err))
      console.log("User: ", user)
  }
  const addUser = (newUser: User) => {
    const updatedUsers = [...getLocalUsers(), newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setData((prev) => [...prev, newUser]); // Lo agregamos a la pantalla
  };

  return (

    <>
    <div className="App">

      <h1>Register user API</h1>
        <h3>List of users</h3>
        <List data={data} moreAbout={moreAbout} showModal={visible} />
        <Modal data={user} showModal={visible} setVisible={setVisible} />

        
    </div>
    
    <div className="register">
      <h1>Register user</h1>
      <Form  onRegister={registerUser} />
    </div>
    </>
  )
}

export default App
