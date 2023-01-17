import { Button } from "antd";
import { useState } from "react";
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link"
import axios from "axios";

interface plaidTokenResponse {
    expiration: string,
    link_token: string,
    request_id: string,
}

function PlaidLinkComponent() {
    const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null)
    const [public_token, setPublicToken] = useState<string | null>(null)

    const config: PlaidLinkOptions = {
        onSuccess: (public_token, metadata) => {
            setPublicToken(public_token)
        },
        onExit: (err, metadata) => { },
        onEvent: (eventName, metadata) => { },
        token: plaidLinkToken,
        //required for OAuth; if not using OAuth, set to null or omit:
        // receivedRedirectUri: window.location.href,
    };
    const request = {
        "token_status": "blank, requesting token",
        "user_id": 1
    }
    const { open, exit, ready } = usePlaidLink(config);
    function getToken() {
        axios.post('http://localhost:8000/api/firsttoken', request).then(
            (response) => {
                setPlaidLinkToken(response.data.link_token)
                console.log(response.data.link_token)
            }
        ).catch(
            (error) => {
                console.log(error);

            }
        )
    }

    return (
        <>
            <div>
                <Button onClick={() => getToken()}>GET TOKEN</Button>
                <Button onClick={() => open()}>LINK PLAID ACCOUNT</Button>
                <p>Here is the public token we received: {public_token}</p>
            </div>
        </>
    )
}

export default PlaidLinkComponent