import { useState } from "react"
import axios from "axios"
import { Button, Form, Input } from 'antd';

interface NewUserProps {
    setLoggedInUsername: Function
    setLoggedInUserID: Function
    setSignup: Function
    setView: Function
}

function NewUser({ setLoggedInUserID, setLoggedInUsername, setSignup, setView }: NewUserProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
    const [usernameTaken, setUsernameTaken] = useState(false)

    function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }
    function handlePasswordCheck(event: React.ChangeEvent<HTMLInputElement>) {
        setPasswordCheck(event.target.value)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // event.preventDefault() on longer needed with antd form
        console.log(`Submitted form, username: ${username}, password: ${password}`);
        if (password !== passwordCheck) {
            setPasswordsDontMatch(true)
        } else {
            axios.post('https://boiling-crag-00382.herokuapp.com/api/useraccount', {
                'email': username,
                'password': password
            }).then(
                (response) => {
                    setLoggedInUsername(response.data.email)
                    setLoggedInUserID(response.data.id)
                    setSignup(false)
                    setView("holdings")
                }
            ).catch(
                (error) => {
                    console.log(error);
                    if (error.response.status === 400) {
                        setUsernameTaken(true)
                    }
                }
            )
        }
    }

    return (
        <div className="form-div">
            <h4>New User</h4>
            <Form labelCol={{ span: 5 }} onFinish={(event) => handleSubmit(event)}>
                {/* <form onSubmit={(event) => handleSubmit(event)}> */}
                {/* <Form.Item label="Username" name='username' /> */}
                <Form.Item label='Username' name="username">
                    <Input name="username" type="text" placeholder="username" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUsername(event)} />
                </Form.Item>
                <Form.Item label='Password' name="password">
                    <Input.Password placeholder="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePassword(event)} />
                </Form.Item>
                <Form.Item label='Confirm' name="confirm_password">
                    <Input.Password placeholder="confirm password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePasswordCheck(event)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">SUBMIT</Button><Button onClick={() => setSignup(false)}>CANCEL</Button>
                </Form.Item>
                {passwordsDontMatch ? <p>your passwords don't match</p> : null}
                {usernameTaken ? <p>username is taken</p> : null}
                {/* </form> */}
            </Form>
        </div>
    )

}

export default NewUser