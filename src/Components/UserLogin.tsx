import React, { useState } from "react"
import axios from "axios"
import { Button, Input, Space, Form } from 'antd';
import Password from "antd/es/input/Password";

interface UserLoginProps {
    setLoggedInUsername: Function
    setLoggedInUserID: Function
    setLogin: Function
    setView: Function
}


function UserLogin({ setLoggedInUserID, setLoggedInUsername, setLogin, setView }: UserLoginProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invalidLogin, setInvalidLogin] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)

    function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // event.preventDefault() no longer  need this with antd form
        console.log(`Submitted form, username: ${username}, password: ${password}`);
        setLoginLoading(true)
        axios.put('https://boiling-crag-00382.herokuapp.com/api/useraccount/login',
            {
                'email': username,
                'password': password
            }).then(
                (response) => {
                    setLoginLoading(false)
                    if (response.data.email !== undefined) {
                        setLoggedInUsername(response.data.email)
                        setLoggedInUserID(response.data.id)
                        setLogin(false)
                        setView("holdings")
                    } else {
                        setInvalidLogin(true)
                    }
                }
            ).catch(
                (error) => {
                    setLoginLoading(false)
                    console.log(error);
                    setInvalidLogin(true)
                }
            )
    }

    return (
        <div className="form-div">
            <h4>Login:</h4>
            <Form labelCol={{ span: 5 }} onFinish={(event) => handleSubmit(event)}>
                {/* <form onSubmit={(event) => handleSubmit(event)}> */}
                <Form.Item label='Username' name="username">
                    <Input type="text" placeholder="username" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUsername(event)} />
                </Form.Item>
                <Form.Item label='Password' name="password">
                    <Password placeholder="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePassword(event)} />
                </Form.Item>
                <Form.Item>
                    <Button loading={loginLoading} type="primary" htmlType="submit">SUBMIT</Button><Button onClick={() => setLogin(false)}>CANCEL</Button>
                </Form.Item>
                {invalidLogin ? <p>invalid login</p> : null}
                {/* </form> */}
            </Form>
        </div>
    )
}

export default UserLogin