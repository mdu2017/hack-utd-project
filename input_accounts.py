import os
import json
from pip._vendor import requests

# Read API key
cred_file = open('key.txt', 'r')
API_KEY = cred_file.read()
cred_file.close()

create_accounts_json = [
  {
    "type": "Credit Card",
    "nickname": "Rich",
    "rewards": 10,
    "balance": 123456,
    "account_number": "1234567891234567"
  },
  {
    "type": "Credit Card",
    "nickname": "Doe",
    "rewards": 9,
    "balance": 9874562,
    "account_number": "1234567891234568"
  },
  {
    "type": "Savings",
    "nickname": "Davey",
    "rewards": 98745,
    "balance": 123459783,
    "account_number": "1234567891234569"
  },
  {
    "type": "Checking",
    "nickname": "Richie",
    "rewards": 100,
    "balance": 230,
    "account_number": "1234567891234561"
  },
  {
    "type": "Credit Card",
    "nickname": "Man",
    "rewards": 10,
    "balance": 123,
    "account_number": "1234567891234562"
  },
  {
    "type": "Checking",
    "nickname": "Job",
    "rewards": 987,
    "balance": 654,
    "account_number": "1234567891234563"
  },
  {
    "type": "Savings",
    "nickname": "Pls",
    "rewards": 987456,
    "balance": 45612398,
    "account_number": "1234567891234564"
  }
]

# Read customer ids
customer_id_file = open('customer_ids.txt', 'r')

# Create accounts and record the account ids
for account, id in zip(create_accounts_json, customer_id_file.readlines()):
  id = id.replace('\n', '')
  response = requests.post( 
    url=f'http://api.nessieisreal.com/customers/{id}/accounts?key={API_KEY}', 
    data=json.dumps(account),
    headers={'content-type':'application/json'},
	)

  if response.status_code == 201:
    print('accounts created')
  else:
    print(response.status_code)

  data = response.json()
  account_id_file = open('account_ids.txt', 'a')
  account_id_file.write(data['objectCreated']['_id'] + '\n')

customer_id_file.close()
account_id_file.close()