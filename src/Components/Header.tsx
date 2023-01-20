import { Button } from "antd"


interface HeaderProps {
    loggedInUsername: string | undefined
    loggedInUserID: number | undefined
    logout: Function
}

function Header({ loggedInUsername, loggedInUserID, logout }: HeaderProps) {

    return (
        <header>
            <img src="https://i.imgur.com/QdQ14Fg.png" alt="stock watch logo" />
            <div className="button-div">
                {!loggedInUsername ? null : <><p>Welcome {loggedInUsername}, User Number {loggedInUserID} </p> <Button onClick={() => logout()} style={{ float: 'right' }}>LOG OUT</Button></>}
            </div>
        </header>
    )
}

export default Header