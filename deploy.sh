#!/bin/bash
# Wrapper — runs scripts/deploy.sh (kept for AWS backward compatibility)
exec "$(dirname "$0")/scripts/deploy.sh" "$@"
