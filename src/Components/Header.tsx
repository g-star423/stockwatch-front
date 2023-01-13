import React, { useState } from "react";

interface HeaderProps {
    loggedInUsername: string
    loggedInUserID: number
}

function Header({ loggedInUsername, loggedInUserID }: HeaderProps) {

    return (
        <header>
            <h1>STOCKWATCH</h1>
            {loggedInUsername === '' ? <p>Please Log in.</p> : <p>Welcome {loggedInUsername}, User Number: {loggedInUserID}</p>}
        </header>
    )
}

export default Header