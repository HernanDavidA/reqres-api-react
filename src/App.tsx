import { useEffect, useState } from 'react'
import './App.css'
import Form from './assets/components/Form'
import Modal from './assets/components/Modal'
import List from './assets/components/List'

function App() {
  const [data, setData] = useState([])
  const [user, setUser] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  
  const registerUser = async (data : { first_name : string, last_name: string, email: string, avatar: string}) => {

    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const newUser = await response.json()
    setUser((prev: any ) => ({...prev, ...newUser.data}))
    setVisible(true)
  
    console.log("New user: ", newUser)
    
  }


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
