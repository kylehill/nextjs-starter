#!/usr/bin/env sh
# Create the GitHub issue labels the agent skills apply (see
# docs/agents/triage-labels.md). Run once in each new Project; re-running is
# safe, since --force updates labels that already exist.
#
#   sh scripts/setup-labels.sh
#
# Uses the repo `gh` infers from the current directory's git remote.
set -eu

label() {
  gh label create "$1" --color "$2" --description "$3" --force
}

# Triage roles (/triage)
label needs-triage    fbca04 "Maintainer needs to evaluate this issue"
label needs-info      d4c5f9 "Waiting on reporter for more information"
label ready-for-agent 0e8a16 "Fully specified, ready for an AFK agent"
label ready-for-human 1d76db "Requires human implementation"
label wontfix         ffffff "Will not be actioned"

# Wayfinding (/wayfinder)
label wayfinder:map       5319e7 "Wayfinder map: notes, decisions so far, fog"
label wayfinder:research  c5def5 "Wayfinder ticket: research"
label wayfinder:prototype c5def5 "Wayfinder ticket: prototype"
label wayfinder:grilling  c5def5 "Wayfinder ticket: grilling"
label wayfinder:task      c5def5 "Wayfinder ticket: task"
