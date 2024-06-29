#!/bin/bash

# Check if port 3000 is available
if lsof -i :3000 >/dev/null; then
    echo "Port 3000 is not available. Please close the process using it."
else
    echo "Port 3000 is available."
fi

# Check if port 4000 is available
if lsof -i :4000 >/dev/null; then
    echo "Port 4000 is not available. Please close the process using it."
else
    echo "Port 4000 is available."
fi