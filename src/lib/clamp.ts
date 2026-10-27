/**
 * Restrict `value` to the inclusive range [`min`, `max`].
 * Throws if the range is inverted or any argument is NaN.
 */
export function clamp(value: number, min: number, max: number): number {
  if ([value, min, max].some(Number.isNaN)) {
    throw new RangeError("clamp() arguments must not be NaN");
  }
  if (min > max) {
    throw new RangeError(`clamp() min (${min}) must be <= max (${max})`);
  }
  return Math.min(Math.max(value, min), max);
}
