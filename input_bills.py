import os
import json
from pip._vendor import requests

# Read API key
cred_file = open('key.txt', 'r')
API_KEY = cred_file.read()
cred_file.close()

create_bills_json = [
    {
    "status": "recurring",
    "payee": "Bobs Burgers",
    "payment_date": "2021-02-1",
    "recurring_date": 3,
    "payment_amount": 12345.10
    },
    {
    "status": "completed",
    "payee": "Hotels Inc",
    "payment_date": "2021-02-25",
    "payment_amount": 456.32
    },
    {
    "status": "recurring",
    "payee": "Gas Company",
    "payment_date": "2021-02-1",
    "recurring_date": 15,
    "payment_amount": 123.45
    },
    {
    "status": "pending",
    "payee": "Bobs Burgers",
    "payment_date": "2021-02-13",
    "payment_amount": 3578.14
    },
    {
    "status": "cancelled",
    "payee": "Amazon",
    "payment_date": "2021-02-27",
    "payment_amount": 55.23
    },
     {
    "status": "pending",
    "payee": "Amazon",
    "payment_date": "2021-02-26",
    "payment_amount": 112.12
    },
    {
    "status": "completed",
    "payee": "Taco Tuesdays",
    "payment_date": "2021-02-30",
    "payment_amount": 12.54
    }
]

# Read customer ids
account_id_file = open('account_ids.txt', 'r')

# Create accounts and record the bill ids
for bill, id in zip(create_bills_json, account_id_file.readlines()):
  id = id.replace('\n', '')
  response = requests.post( 
    url=f'http://api.nessieisreal.com/accounts/{id}/bills?key={API_KEY}', 
    data=json.dumps(bill),
    headers={'content-type':'application/json'},
	)

  if response.status_code == 201:
    print('bills created')
  else:
    print(response.status_code)

  data = response.json()
  bill_id_file = open('bill_ids.txt', 'a')
  bill_id_file.write(data['objectCreated']['_id'] + '\n')

account_id_file.close()
bill_id_file.close()