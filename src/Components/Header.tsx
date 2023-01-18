import React, { useState } from "react";

interface HeaderProps {
    loggedInUsername: string | undefined
    loggedInUserID: number | undefined
}

function Header({ loggedInUsername, loggedInUserID }: HeaderProps) {

    return (
        <header>
            <img src="https://i.imgur.com/QdQ14Fg.png" />
            {loggedInUsername === '' ? <p>Please Log in.</p> : <p>Welcome {loggedInUsername}, User Number {loggedInUserID}</p>}
        </header>
    )
}

export default Header