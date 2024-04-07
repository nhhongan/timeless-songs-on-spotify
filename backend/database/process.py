import mysql.connector
from database import CONFIGS

def execute_query(query, params=None):
    conn = mysql.connector.connect(**CONFIGS)
    cursor = conn.cursor()
    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result