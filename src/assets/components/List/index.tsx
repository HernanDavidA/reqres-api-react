import Button from '../Button'

type User = {
  id: number;
  first_name: string;
  last_name: string; 
  avatar: string;
  email: string;
}
type Props = {
    data: User[];
    moreAbout: (id: number) => void;
    showModal: boolean;
}
const List = ({ data, moreAbout}: Props)=> {

  return (
  
    <ul className="list-group flex-row flex-wrap">
      {
        data.map((user) => (
          <li className="list-group-item align-items-start" key={user.id}>
            <img src={user.avatar} className="rounded-circle" alt={user.first_name} />
            <p>{user.first_name}</p>
            <Button onClick={() => moreAbout(user.id)} props='More about' showModal={true}/>
            </li>
        ))
      }
      {
        data.length === 0 && <li className="list-group-item align-items-start">No users</li>
      }
    </ul>
  )
}

export default List