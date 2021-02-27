import psycopg2
from db_cred import *
import logging

conn = None
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
    exit(1)


# # Test
def create_customer(conn):
    with conn.cursor() as cur:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(30) PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50))"
        )
        cur.execute("INSERT INTO customer (id, first_name, last_name) VALUES (%s, %s, %s);", ('a1', 'john', 'doe'))
        logging.debug("create_customer(): status message: %s", cur.statusmessage)
        print('Creating customer')
    conn.commit()


create_customer(conn)

