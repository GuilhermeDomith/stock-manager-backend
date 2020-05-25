#!/bin/bash

## Ex.:     db_manager -b root stock_manager db/stock_manager.sql
##          db_manager -r root stock_manager db/stock_manager.sql

COMMAND=$1
USER=$2
DATABASE_NAME=$3
FILE_SQL=$4

case $COMMAND in
    "backup" | -b) 
        mysqldump -u $USER -p $DATABASE_NAME > $FILE_SQL
        ;;
    "restore" | -r)
        mysql -u $USER -p -e "CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"
        mysql -u $USER -p $DATABASE_NAME < $FILE_SQL
        ;;
esac

