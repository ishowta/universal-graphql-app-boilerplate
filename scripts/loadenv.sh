#!/bin/bash

# https://stackoverflow.com/questions/59895/how-can-i-get-the-source-directory-of-a-bash-script-from-within-the-script-itsel
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

set -a
. $DIR/../.env
. $DIR/../.env.local
set +a
