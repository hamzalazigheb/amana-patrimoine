#!/bin/bash
# Wrapper — runs scripts/deploy-ssl.sh (kept for AWS backward compatibility)
exec "$(dirname "$0")/scripts/deploy-ssl.sh" "$@"
