

## Greg Notes

I'm building an app that will track employee trades, integrating with their bank accounts. It will also allow employees to ask permission to make future stock trades.

1/16/2023
Today I will be working on reading Plaid Link documentation, and getting it up and running on the front-end. Plaid Link will allow users to link their investment accounts to the app.

Steps: 
1. Get backend server talking to Plaid, where I will send a request that includes client id, etc to Plaid, where they will send me a link token.
2. This token will get sent to front-end, and fed into Plaid's plugin - the user will then complete signup. Plaid will send client a token, that then gets sent back down to my back-end.
3. Create API endpoint for public token to be passed to. (including data structure)
4. Have this endpoint, upon receipt, send token back to plaid, where data structure gets updated with persistant token from Plaid.

1/18/2023
Today spent lots of time diagnosing the "open()" function in the Plaid component.