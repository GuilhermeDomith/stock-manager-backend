#!/bin/bash

## Ex.:     db_manager backup root stock_manager db/stock_manager.sql
##          db_manager restore root stock_manager_dev db/stock_manager.sql

COMMAND=$1
USER=$2
DATABASE_NAME=$3
FILE_SQL=$4

case $COMMAND in
    "backup") 
        sudo mysqldump -u $USER -p $DATABASE_NAME > $FILE_SQL
        ;;
    "restore")
        sudo mysql -u $USER -p -e "CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"
        sudo mysql -u $USER -p $DATABASE_NAME < $FILE_SQL
        ;;
esac

