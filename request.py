import os
import requests, json

# Read API key
cred_file = open('key.txt', 'r')
API_KEY = cred_file.read()
cred_file.close()

# URL for api request
url = f'http://api.nessieisreal.com/customers?key={API_KEY}'

# Test JSON data
create_account_json = {
  "first_name": "Mister",
  "last_name": "Rich",
  "address": {
    "street_number": "1337",
    "street_name": "localhost",
    "city": "New York",
    "state": "NY",
    "zip": "15425"
  }
}

# Create a Savings Account
response = requests.post( 
	url, 
	data=json.dumps(create_account_json),
	headers={'content-type':'application/json'},
	)

if response.status_code == 201:
	print('account created')
else:
    print(response.status_code)

