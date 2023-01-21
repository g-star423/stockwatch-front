

## Greg's Project Notes

I'm building an app that will track employee trades, integrating with their bank accounts. It will also allow employees to ask permission to make future stock trades, which is a required for employees with what's known in the finance industry as "material non-public information."

Summarized, this app would be a compliance department tool to prevent insider trading at investment companies.

This app was built using Typescript / React for the front-end, and a Python Django backend plus a Postgres SQL database. This stack was chosen purely because of demand for Python, SQL, Typescript, and React in job descriptions.

What I learned during the development of this project is that Django is a poor choice for an API backend - I would use Typescript + Express if I did this again. Django has great features for other types of websites, and I would use it again for projects where it is a good fit.

I did learn quite a bit about working with Python + PostgreSQL, as this project required more than just CRUD functionality between front-end and back-end. The back-end had to also make requests to a 3rd party API (Plaid), and get tokens back to the client. These same tokens had to be stored / exchanged with Plaid. The server also had to request holdings from Plaid, and update the database with holdings in the correct format. I ended up using some raw SQL for some of my views!

For front-end challenges, there weren't any major hiccups, other than learning to use "Ant Design." This was a great lesson in reading documents before choosing a component library - the components generally worked as expected, but there is a reason Material UI is #1.

The other goal of this project was to learn how to integrate a larger 3rd party service, such as Plaid. Doing so strengthened my ability to interact with APIs, as well as learn what's required server-side to update databases "behind the scenes" without the client knowing. Shout-out to my friend Stephen who used to work at Plaid for showing me the Plaid Sandbox - it's been fun to play in!


Daily Notes:
1/10/2023
Created app via create-react-app

1/11/2023
Uploaded wireframes / user story.

1/12/2023
Added test component

1/13/2023
Completed user log-in components for new and existing users

1/14/2023
Completed component to POST request for a user holding. Learned about antd tables, added display table.

1/15/2023
Can edit holdings via PUT request, as well as DELETE. Added Plaid Link component, started working through Plaid Link documentation

1/16/2023
Today I will be working on reading Plaid Link documentation, and getting it up and running on the front-end. Plaid Link will allow users to link their investment accounts to the app.

Steps: 
1. Get backend server talking to Plaid, where I will send a request that includes client id, etc to Plaid, where they will send me a link token.
2. This token will get sent to front-end, and fed into Plaid's plugin - the user will then complete sign-up. Plaid will send client a token, that then gets sent back down to my back-end.
3. Create API endpoint for public token to be passed to. (including data structure)
4. Have this endpoint, upon receipt, send token back to plaid, where data structure gets updated with persistent token from Plaid.

This was completed today.

1/17/2023
Updated URLs to deployed heroku backend
Added ability to refresh data.
Completed Plaid Link token exchange from front-end.

1/18/2023
Today spent lots of time diagnosing the "open()" function in the Plaid component, getting it to work with less user interaction.

1/19/2023
Added trade ticket creation modal
Added success notification for holdings refresh.
Started using "antd" forms and functionality.

1/20/2023
Added ability to add a "trade request" and edit it.
Added loading features to buttons.

1/21/2023
Finalized build, started looking for bugs in deployed environment