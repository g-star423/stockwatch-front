import { useState } from "react"
import axios from "axios"
import { Button, Form, Input } from 'antd';
import Password from "antd/es/input/Password";

interface NewUserProps {
    setLoggedInUsername: Function
    setLoggedInUserID: Function
    setSignup: Function
}

function NewUser({ setLoggedInUserID, setLoggedInUsername, setSignup }: NewUserProps) {
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
        event.preventDefault()
        console.log(`Submitted form, username: ${username}, password: ${password}`);
        if (password != passwordCheck) {
            setPasswordsDontMatch(true)
        } else {
            axios.post('https://boiling-crag-00382.herokuapp.com/api/useraccount', {
                'email': username,
                'password': password
            }).then(
                (response) => {
                    setLoggedInUsername(response.data.email)
                    setLoggedInUserID(response.data.id)
                }
            ).catch(
                (error) => {
                    console.log(error);
                    if (error.response.status == 400) {
                        setUsernameTaken(true)
                    }
                }
            )
        }
    }

    return (
        <div className="form-div">
            <h4>New User</h4>
            <form onSubmit={(event) => handleSubmit(event)}>
                {/* <Form.Item label="Username" name='username' /> */}
                <Input name="username" type="text" placeholder="username" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUsername(event)} />
                <Input.Password placeholder="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePassword(event)} />
                <Input.Password placeholder="confirm password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePasswordCheck(event)} />
                <Button type="primary" htmlType="submit">SUBMIT</Button><Button onClick={() => setSignup(false)}>CANCEL</Button>
                {passwordsDontMatch ? <p>your passwords don't match</p> : null}
                {usernameTaken ? <p>username is taken</p> : null}
            </form>
        </div>
    )

}

export default NewUser