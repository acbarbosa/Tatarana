#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "${BASH_SOURCE[0]}")

command -V brew >/dev/null 2>&1 || {
    echo "This script relies on homebrew (https://brew.sh) to manage project dependencies"
    echo "It looks like it is not installed on your system! Installing it now!"
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    echo "Homebrew was installed!"
}

# Installing brew dependencies
brew bundle --file="${SCRIPT_DIR}/Brewfile"

# Setting up node
. $(brew --prefix nvm)/nvm.sh
nvm use >/dev/null 2>&1 || {
    nvm install
    nvm use
}
