

interface HeaderProps {
    loggedInUsername: string | undefined
    loggedInUserID: number | undefined
}

function Header({ loggedInUsername, loggedInUserID }: HeaderProps) {

    return (
        <header>
            <img src="https://i.imgur.com/QdQ14Fg.png" alt="stock watch logo" />
            <div className="button-div">
                {!loggedInUsername ? null : <p>Welcome {loggedInUsername}, User Number {loggedInUserID}</p>}
            </div>
        </header>
    )
}

export default Header