import { Button } from "antd";
import { useState } from "react";
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link"
import axios from "axios";

interface PlaidTokenResponse {
    expiration: string,
    link_token: string,
    request_id: string,
}

interface PlaidProps {
    loggedInUserID: number
}

function PlaidLinkComponent({ loggedInUserID }: PlaidProps) {
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
        "user_id": loggedInUserID
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
    function sendTokenForExchange() {
        const exchangeRequest = {
            "user_id": loggedInUserID,
            "public_token": public_token
        }
        axios.post('http://localhost:8000/api/exchangetoken', exchangeRequest).then(
            (response) => {
                console.log("response from sending token for exchange" + response.data);

            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }
    function updateHoldings() {
        const updateRequest = {
            "user_id": loggedInUserID
        }
        axios.post('http://localhost:8000/api/updateholdings', updateRequest).then(
            (response) => {

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
                <Button onClick={() => sendTokenForExchange()}>exchange token</Button>
                <Button onClick={() => updateHoldings()}>UPDATE HOLDINGS</Button>
                <p>Here is the public token we received: {public_token}</p>
            </div>
        </>
    )
}

export default PlaidLinkComponent