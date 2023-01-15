import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link"

const config: PlaidLinkOptions = {
    onSuccess: (public_token, metadata) => { },
    onExit: (err, metadata) => { },
    onEvent: (eventName, metadata) => { },
    token: 'GENERATED_LINK_TOKEN',
    //required for OAuth; if not using OAuth, set to null or omit:
    receivedRedirectUri: window.location.href,
};

function PlaidLinkComponent() {
    return (
        <>
        </>
    )
}

export default PlaidLinkComponent