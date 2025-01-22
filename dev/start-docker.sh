#!/bin/sh

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
  echo "Docker is not running. Attempting to start Docker..."

  if [ "$(uname)" = "Darwin" ]; then
    # For macOS with Docker Desktop
    open --background -a Docker
    echo "Starting Docker Desktop on macOS."
    # Wait until Docker is fully running
    while ! docker info >/dev/null 2>&1; do
        echo "Waiting for Docker to start..."
        sleep 3
    done
    echo "Docker Desktop is running."
  elif [ "$(uname)" = "Linux" ]; then
    # For Linux systems
    sudo systemctl start docker
    echo "Starting Docker on Linux."
    # Wait until Docker is fully running
    while ! docker info >/dev/null 2>&1; do
        echo "Waiting for Docker to start..."
        sleep 3
    done
    echo "Docker is running on Linux."
  else
    echo "Unsupported operating system. Please start Docker manually."
    exit 1
  fi
else
  echo "Docker is already running."
fi
