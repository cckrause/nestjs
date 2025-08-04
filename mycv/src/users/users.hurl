# Create user account
POST {{base_url}}/auth/signup

{
    "email": "foo@bar.ch",
    "password": "123456"
}

# verify user was created and store the returned id to test the rest of the API
HTTP/1.1 201
[Captures]
user_id: jsonpath "$.id"

# get the user by id (using captured ID)
GET {{base_url}}/auth/{{user_id}}

HTTP/1.1 200
[Asserts]
jsonpath "$.email" == "foo@bar.ch"
jsonpath "$.password" == "123456"

# find not existing user
GET {{base_url}}/auth/-1

HTTP/1.1 404

# update user
PATCH {{base_url}}/auth/{{user_id}}

{
    "email": "foo2@bar.ch",
    "password": "123456789"
}

HTTP/1.1 200
[Asserts]
jsonpath "$.email" == "foo2@bar.ch"
jsonpath "$.password" == "123456789"

# update not existing user
PATCH {{base_url}}/auth/-1

HTTP/1.1 404

# update user email only
PATCH {{base_url}}/auth/{{user_id}}

{
    "email": "foo@bar.ch"
}

HTTP/1.1 200
[Asserts]
jsonpath "$.email" == "foo@bar.ch"

# update user password only
PATCH {{base_url}}/auth/{{user_id}}

{
    "password": "123456"
}

HTTP/1.1 200
[Asserts]
jsonpath "$.password" == "123456"

# get the user by email
GET {{base_url}}/auth?email=foo@bar.ch

HTTP/1.1 200
[Asserts]
jsonpath "$[0].email" == "foo@bar.ch"
jsonpath "$[0].password" == "123456"

# find not existing users
GET {{base_url}}/auth?email=lala@notfound.ch

HTTP/1.1 404

# delete the user by id (using captured ID)
DELETE {{base_url}}/auth/{{user_id}}

HTTP/1.1 200
[Asserts]
jsonpath "$.email" == "foo@bar.ch"
jsonpath "$.password" == "123456"