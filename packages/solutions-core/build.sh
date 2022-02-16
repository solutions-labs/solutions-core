#!/bin/bash

tsc

cp -r src/views lib/src
cp -r src/public lib/src
cp -r projects.json lib
