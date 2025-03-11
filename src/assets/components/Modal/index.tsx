import Button from '../Button'

type User = {
  first_name: string;
  last_name: string; 
  avatar: string;
  email: string;
}
type Props = {
    data: User;
    showModal: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const index = ({data, showModal, setVisible}: Props) => {

    if (!data) return null
  return (
    <div className={`card ${showModal ? 'd-block' : 'd-none'} position-absolute top-50 start-50 translate-middle`}>
    <img src={data.avatar} className="card-img-top " style={{width: '100px'}} alt={data.first_name} />
  <div className="card-body">
    <h5 className="card-title">{data.first_name} {data.last_name}</h5>
    <p className="card-text">{data.email}</p>
    <Button  onClick={() => setVisible(false)} props='Close'></Button>
  </div>
    </div>

    )
  
  
}

export default index
