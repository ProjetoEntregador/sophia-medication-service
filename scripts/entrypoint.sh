#!/bin/sh
set -e
yarn db:migrate
exec node dist/src/main.js
