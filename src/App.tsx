import { useEffect, useState } from 'react'
import './App.css'
import List from './assets/components/List'
import Modal from './assets/components/Modal'

function App() {
  const [data, setData] = useState([])
  const [user, setUser] = useState<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
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


  console.log("Data: ", data)

  return (

    <div className="App">
      <h1>Register user API</h1>
        <h3>List of users</h3>
        <List data={data} moreAbout={moreAbout} showModal={visible} />
        <Modal data={user} showModal={visible} setVisible={setVisible} />
    </div>
  )
}

export default App
