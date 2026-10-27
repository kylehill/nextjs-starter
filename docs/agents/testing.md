# Testing vocabulary

This repo has three kinds of automated test. Use these terms exactly, so they are never confused with each other.

## Tests

**Unit Test**:
A test of one function or component in isolation, run in a simulated browser, that checks behaviour rather than appearance.
_Avoid_: Component test, integration test, spec

**Visual Regression Test**:
A test that renders a single Story and compares its screenshot, pixel by pixel, with that Story's Baseline.
_Avoid_: Snapshot test, screenshot test, UI test

**End-to-End Test**:
A test that drives a real browser through the fully built application, the way a user would.
_Avoid_: E2E spec, integration test, acceptance test, browser test

## Visual regression

**Story**:
One named, fixed state of a component, defined for Storybook, that a Visual Regression Test can render on its own.
_Avoid_: Example, fixture, variant

**Baseline**:
The approved screenshot of a Story, committed to the repository, that a Visual Regression Test compares against.
_Avoid_: Golden, snapshot, reference image
