# djangoauth

The given repository contains the applied version of Django authentication using
restframework and rest framework jwt authentication

## The endpoints:

`/accounts/users/` -> POST API ->
request_data: `{'username': 'username', 'password': "password"}`
response_data: `{'id': 1, 'username': 'username', 'token': 'token_string'}`

`/accounts/current_user/` -> GET API ->
The token is sent in the bearer token:
response_data: `{'id': 1, 'username': 'username'}`
