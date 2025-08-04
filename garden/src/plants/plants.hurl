# Get all plants
GET {{base_url}}/plants

HTTP/1.1 200

# Get a specific plant by ID
GET {{base_url}}/plants/1

HTTP/1.1 200
[Asserts]
jsonpath "$.id" == 1
jsonpath "$.name" == "rose"
jsonpath "$.smells" == false
jsonpath "$.price" == 10.99

# Get a not existing plant
GET {{base_url}}/plants/999

HTTP/1.1 404

# Create a new plant
POST {{base_url}}/plants
Content-Type: application/json

{
    "id": 1,
    "name": "rose",
    "smells": false,
    "price": 10.99
}

HTTP/1.1 201

# Create a new plant with wrong load
POST {{base_url}}/plants
Content-Type: application/json

{
    "name": "rose",
    "price": 10.99
}

HTTP/1.1 400


