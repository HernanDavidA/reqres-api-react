

type Props = {
    props?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    showModal?: boolean;
}

const index = ({props, onClick}: Props) => {

    
  return (
    <button className="btn btn-primary " onClick={onClick}> {props} </button>

  )
}

export default index;