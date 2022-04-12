#!/bin/bash

cd '/usercode'

sh -c "cd usercode && npm i && npm start && npm test && jest --watchAll && cd .." >> '/usercode/__ed_stdout.txt' 2>> '/usercode/__ed_stderr.txt'
exit 0