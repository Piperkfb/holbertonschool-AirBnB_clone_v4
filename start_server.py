#!/usr/bin/python3
""" starts a server based on given args 
example: ./start_server.py db web_dynamic.0-hbnb
args:
    1: storage_mode
        'fs' or 'db'
        sets whether to write to .json file or database

    2: module
        selects what module to load to start a server
"""
from sys import argv
import subprocess
import os

if (len(argv) > 1):
    storage_mode = argv[1]
else:
    print('arg 1 (storage_mode) missing!')
    exit()

if (len(argv) > 2):
    module = argv[2]
else:
    print('arg 2 (module) missing!')
    exit()

# environment variables that enable database
db_env = {'HBNB_MYSQL_USER': 'hbnb_dev', 'HBNB_MYSQL_PWD': 'hbnb_dev_pwd',
          'HBNB_MYSQL_HOST': 'localhost', 'HBNB_MYSQL_DB': 'hbnb_dev_db',
          'HBNB_TYPE_STORAGE': 'db'}


new_env = os.environ.copy()
if (storage_mode == 'db'):
    print(storage_mode)
    new_env.update(db_env)

proc = subprocess.run(['python3', '-m', module], env=new_env)
