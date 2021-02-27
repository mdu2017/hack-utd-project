import psycopg2
from db_cred import *

try:
    conn = psycopg2.connect(
        user=DB_USER,
        password=DB_PASS,
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME
    )

    print('Connection successful')
except Exception as ex:
    print('Error connecting to database')


