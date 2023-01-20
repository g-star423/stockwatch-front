import { Button } from "antd";
import { useEffect, useState } from "react";
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link"
import axios from "axios";

interface PlaidTokenResponse {
    expiration: string,
    link_token: string,
    request_id: string,
}

interface PlaidProps {
    loggedInUserID: number | undefined
}

function PlaidLinkComponent({ loggedInUserID }: PlaidProps) {
    const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null)
    const [publicToken, setPublicToken] = useState<string | null>(null)
    const [plaidSuccess, setPlaidSuccess] = useState(false)

    const config: PlaidLinkOptions = {
        onSuccess: (public_token, metadata) => {
            setPublicToken(public_token)
            sendTokenForExchange()
        },
        onExit: (err, metadata) => { },
        onEvent: (eventName, metadata) => { },
        token: plaidLinkToken,
        //required for OAuth; if not using OAuth, set to null or omit:
        // receivedRedirectUri: window.location.href,
    };
    useEffect(() => {
        if (publicToken) {
            sendTokenForExchange()
        }
    }, [publicToken])
    const request = {
        "token_status": "blank, requesting token",
        "user_id": loggedInUserID
    }
    const { open, exit, ready } = usePlaidLink(config);
    function getToken() {
        axios.post('https://boiling-crag-00382.herokuapp.com/api/firsttoken', request).then(
            (response) => {
                setPlaidLinkToken(response.data.link_token)
            }
        ).catch(
            (error) => {
                console.log(error);

            }
        )
    }
    useEffect(() => {
        if (ready) {
            open()
        }
    }, [ready, plaidLinkToken])

    function sendTokenForExchange() {
        const exchangeRequest = {
            "user_id": loggedInUserID,
            "public_token": publicToken
        }
        axios.post('https://boiling-crag-00382.herokuapp.com/api/exchangetoken', exchangeRequest).then(
            (response) => {
                updateHoldings()
                setPlaidSuccess(true)
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    const [loadingHoldings, setLoadingHoldings] = useState(false)

    function updateHoldings() { // this function asks the server to refresh the client's holdings, which deletes all old holdings and pulls in fresh holdings from plaid
        setLoadingHoldings(true)
        const updateRequest = {
            "user_id": loggedInUserID
        }
        axios.post('https://boiling-crag-00382.herokuapp.com/api/updateholdings', updateRequest).then(
            (response) => {
                setLoadingHoldings(false)
            }
        ).catch(
            (error) => {
                console.log(error);
                setLoadingHoldings(false)
            }
        )
    }

    return (
        <>
            <div className="button-div">
                <h3>Link your investment accounts:</h3>
            </div>
            <div className="button-div">
                <Button onClick={() => { getToken() }}>LINK INVESTMENT ACCOUNTS</Button>
                {/* <Button onClick={() => open()}>LINK PLAID ACCOUNT</Button>LEAVING THESE FOR FUTURE TESTING */}
                {/* <Button onClick={() => sendTokenForExchange()}>exchange token</Button> */}
                <Button loading={loadingHoldings} onClick={() => updateHoldings()}>REFRESH HOLDINGS FROM PLAID</Button>
                {/* <p>Here is the public token we received: {publicToken}</p> */}
                {plaidSuccess ? <p>Account connected! Please UPDATE HOLDINGS.</p> : null}
            </div>
        </>
    )
}

export default PlaidLinkComponent