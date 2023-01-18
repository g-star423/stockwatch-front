import React, { useState } from "react"
import axios from "axios"
import { Button, Input } from 'antd';
import Password from "antd/es/input/Password";

interface UserLoginProps {
    setLoggedInUsername: Function
    setLoggedInUserID: Function
}


function UserLogin({ setLoggedInUserID, setLoggedInUsername }: UserLoginProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invalidLogin, setInvalidLogin] = useState(false)

    function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(`Submitted form, username: ${username}, password: ${password}`);
        axios.put('https://boiling-crag-00382.herokuapp.com/api/useraccount/login',
            {
                'email': username,
                'password': password
            }).then(
                (response) => {
                    if (response.data.email !== undefined) {
                        setLoggedInUsername(response.data.email)
                        setLoggedInUserID(response.data.id)
                    } else {
                        setInvalidLogin(true)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                    setInvalidLogin(true)
                }
            )
    }

    return (
        <div className="form-div">
            <h4>Login:</h4>
            <form onSubmit={(event) => handleSubmit(event)}>
                <Input type="text" placeholder="username" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUsername(event)} />
                <Password placeholder="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePassword(event)} />
                <Button type="primary" htmlType="submit">SUBMIT</Button>
                {invalidLogin ? <p>invalid login</p> : null}
            </form>
        </div>
    )
}

export default UserLogin