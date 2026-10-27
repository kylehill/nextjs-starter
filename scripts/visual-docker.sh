#!/usr/bin/env sh
# Run the visual regression tests inside the official Playwright Docker image,
# so screenshots render identically on every machine and in CI.
#
#   npm run test:visual          compare against committed baselines
#   npm run test:visual:update   regenerate the baselines
#
# Extra arguments are passed through to `playwright test`.
# Set VISUAL_DOCKER_ARGS to add `docker run` flags (e.g. proxy settings).
set -eu

# Keep this tag in sync with the @playwright/test version in package.json
# and the visual job in .github/workflows/ci.yml.
IMAGE="mcr.microsoft.com/playwright:v1.64.1-noble"

cd "$(dirname "$0")/.."

# node_modules lives in a named Docker volume so the host's (e.g. macOS)
# native binaries never mix with the container's Linux ones.
exec docker run --rm --init --ipc=host \
  -v "$(pwd)":/work \
  -v nextjs-starter-visual-node-modules:/work/node_modules \
  -w /work \
  -e CI="${CI:-}" \
  ${VISUAL_DOCKER_ARGS:-} \
  "$IMAGE" \
  sh -c 'npm ci --no-audit --no-fund && npm run test:visual:ci -- "$@"' sh "$@"
