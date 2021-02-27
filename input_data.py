import os
import json
from pip._vendor import requests

# Read API key
cred_file = open('key.txt', 'r')
API_KEY = cred_file.read()
cred_file.close()

url = f'http://api.nessieisreal.com/customers?key={API_KEY}'

create_account_json = [
    {
  "first_name": "Mister",
  "last_name": "Rich",
  "address": {
    "street_number": "1337",
    "street_name": "localhost",
    "city": "New York",
    "state": "NY",
    "zip": "15425"
  }
    },
  {
  "first_name": "John",
  "last_name": "Doe",
  "address": {
    "street_number": "1122",
    "street_name": "party",
    "city": "Dallas",
    "state": "TX",
    "zip": "12345"
  }
    },
    {
  "first_name": "Bob",
  "last_name": "Davey",
  "address": {
    "street_number": "9876",
    "street_name": "Davis Blvd",
    "city": "Houston",
    "state": "TX",
    "zip": "54637"
  }
    },
    {
  "first_name": "Wulrus",
  "last_name": "Richie",
  "address": {
    "street_number": "4567",
    "street_name": "qwerty",
    "city": "New York",
    "state": "NY",
    "zip": "46123"
  }
    },
    {
  "first_name": "One-Punch",
  "last_name": "Man",
  "address": {
    "street_number": "4687",
    "street_name": "poiuy",
    "city": "San Jose",
    "state": "CA",
    "zip": "71235"
  }
    },
    {
  "first_name": "Gimmie",
  "last_name": "Job",
  "address": {
    "street_number": "7892",
    "street_name": "Jobs here",
    "city": "Austin",
    "state": "TX",
    "zip": "45387"
  }
    },
    {
  "first_name": "Intern",
  "last_name": "Pls",
  "address": {
    "street_number": "4123",
    "street_name": "Interns here",
    "city": "Nowhere",
    "state": "NW",
    "zip": "00000"
    }
    }
    ]

# Create a Savings Account
for account in create_account_json:
    response = requests.post( 
	    url, 
	    data=json.dumps(account),
	    headers={'content-type':'application/json'},
	)

    if response.status_code == 201:
	    print('accounts created')
    else:
        print(response.status_code)