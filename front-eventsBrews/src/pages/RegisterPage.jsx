import React from 'react'
import {useForm} from 'react-hook-form'
import {registerRequest} from '../api/auth'


export const RegisterPage = () => {

    const {register, handleSubmit} = useForm()

  return (
    <>
        <div>
            <form onSubmit={handleSubmit( async (values) => {
                console.log(values);
                const res = await registerRequest(values)
                console.log(res);
            })} >
                <div>
                    <label htmlFor="">Name:</label>
                    <input type="text" {...register("name", {required: true})} />
                </div>
                <div>
                    <label htmlFor="">Email:</label>
                    <input type="email" {...register("email", {required: true})} />
                </div>
                <div>
                    <label htmlFor="">Phone:</label>
                    <input type="tel" {...register("tel", {required: true})} />
                </div>
                <div>
                    <label htmlFor="">Address:</label>
                    <input type="address" {...register("address", {required: true})} />
                </div>
                <div>
                    <label htmlFor="">Password:</label>
                    <input type="password" {...register("password", {required: true})}  />
                </div>
                <div>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    </>
  )

}

export default RegisterPage