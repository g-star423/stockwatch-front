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

    function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(`Submitted form, username: ${username}, password: ${password}`);
        axios.put('http://localhost:8000/api/useraccount/login',
            {
                'email': username,
                'password': password
            }).then(
                (response) => {
                    console.log(response.data);
                    setLoggedInUsername(response.data.email)
                    setLoggedInUserID(response.data.id)
                }
            ).catch(
                (error) => {
                    console.log(error);
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
            </form>
        </div>
    )
}

export default UserLogin