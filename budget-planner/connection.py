import psycopg2
from db_cred import *
import logging


def init_db(conn):
    """
    Creates the database.
    :param args:
    :type args: conn
    :return:
    """
    with conn.cursor() as cur:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS Customer (CustomerID VARCHAR(30) PRIMARY KEY, Name VARCHAR(50), Address VARCHAR(50), NumberOfAccounts INT)"
        )
        cur.execute("CREATE TYPE AccountType as ENUM ('Credit Card', 'Savings', 'Checking')"
        )
        cur.execute(
            "CREATE TABLE IF NOT EXISTS Account (AccountID VARCHAR(30), Type AccountType, Nickname VARCHAR(50), Rewards INT, Balance INT, AccountNumber VARCHAR(16), PRIMARY KEY (AccountID), CustomerID VARCHAR(30) REFERENCES Customer(CustomerID))"
        )
        cur.execute(
            "CREATE TABLE IF NOT EXISTS Merchant (MerchantID VARCHAR(30) PRIMARY KEY, Name VARCHAR(50), Category VARCHAR(50), StreetNumber VARCHAR(50), StreetName VARCHAR(50))"
        )
        cur.execute("CREATE TYPE DepositMedium as ENUM ('balance', 'rewards')")
        cur.execute("CREATE TYPE DepositStatus as ENUM ('pending', 'cancelled', 'completed')")
        cur.execute(
            "CREATE TABLE IF NOT EXISTS Deposit (DepositID VARCHAR(30), Medium DepositMedium, TransactionDate Date, Status DepositStatus, Amount NUMERIC, Description VARCHAR(50), PRIMARY KEY (DepositID), AccountID VARCHAR(30) REFERENCES Account(AccountID))"
        )
        cur.execute("CREATE TYPE PurchaseMedium as ENUM ('balance', 'rewards')")
        cur.execute("CREATE TYPE PurchaseStatus as ENUM ('pending', 'cancelled', 'completed')")
        cur.execute("CREATE TABLE IF NOT EXISTS Purchase (PurchaseID VARCHAR(24), Medium PurchaseMedium, PurchaseDate DATE, Amount INT, Status PurchaseStatus, Description VARCHAR(50), PRIMARY KEY (PurchaseID), MerchantID VARCHAR(30) REFERENCES Merchant(MerchantID), AccountID VARCHAR(30) REFERENCES Account(AccountID))")

    conn.commit()


def main():
    conn = None
    try:
        conn = psycopg2.connect(
             user=DB_USER,
            password=DB_PASS,
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME
        )
        print('Creation successful')
    except Exception as ex:
        print('Error connecting to database')
        exit(1)
    init_db(conn)


if __name__ == "__main__":
    main()
