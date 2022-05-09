# bitblog Client App

## Entry point

Track in state:

- userData (this should be an empty object initially)
- userData and it's modifier will be passed down in Login and in Admin

## useEffect

- Look in local storage / AsyncStorage with a key "token"
- Make a request to route responsible for returning user data with token as header - "x-auth-token"
- Set useData with user data from response

## Screens

- Register
- Login (initial route)
- Admin

## Register Screen

Track in state:

- userName
- password
- email

Going to need 3 text boxes bound to respective state (userName, password, email)

## Register Submit Button Action

- Make a request to the route responsible for creating a new user
- The route will require the userName, email, and the password sent
  in the request body
- On a successful request you will receive the new user indicating they are saved in mongoDB
- Upon success redirect to login

# Login

Track in state:

- password
- email

Going to need 2 text boxes bound to respective state (email, password)

Going to need a Login submit button

## Login Button Action

- Make a request to the route responsible for logging in a new user
- The route will require the email, and the password sent
  in the request body
- On a successful request you will receive an object with the token and userData inside it.

Note: Set the token in AsyncStorage / localStorage as "token"
set userData in state (whose value and modifier were passed as props from App.js)

- Redirect to our Admin page

# Admin

## Sign Out Button Action (Logout)

- set userData to empty object
- clear AsyncStorage / localStorage

## useEffect

- When admin page loads create an effect that looks for the user id that is passed down in props
- If there is no user id stored from object passed as props, then redirect to login
- Will need userData in dependency array

## Team Members

- Ezer
- Anthony
- Angel (from web)
