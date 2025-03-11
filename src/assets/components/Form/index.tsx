import {useForm} from 'react-hook-form'
type FormData = {
    first_name: string
    last_name: string
    email: string
    avatar: string
}

const index = ({ onRegister }: { onRegister: (data: FormData) => void }) => {

    const { register, handleSubmit, reset } = useForm<FormData>()

    const onSubmit = (data: FormData) => {
        onRegister(data)
        reset()
    }
    return (
        <div className="mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label" htmlFor="first_name">First name</label>
                <input type="text" className="form-control" {...register("first_name", { required: true })} placeholder="John" />
                <label className="form-label" htmlFor="last_name">Last name</label>
                <input type="text" className="form-control" {...register("last_name", { required: true })} placeholder="Doe" />
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="email" className="form-control" {...register("email", { required: true })} placeholder="name@example.com" />
                <label className="form-label" htmlFor="avatar">Avatar</label>
                <input type="text" className="form-control" {...register("avatar", { required: true })} placeholder="https://example.com/image.jpg" />
                <button > Submit </button>
            </form>
        </div>
    )
}


export default index