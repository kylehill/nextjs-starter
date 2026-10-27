"use client";

import { useState } from "react";
import { clamp } from "@/lib/clamp";
import { Button } from "@/components/Button/Button";
import styles from "./Counter.module.css";

export interface CounterProps {
  initialCount?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export function Counter({
  initialCount = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label = "Count",
}: CounterProps) {
  const [count, setCount] = useState(() => clamp(initialCount, min, max));

  const change = (delta: number) =>
    setCount((current) => clamp(current + delta, min, max));

  return (
    <div className={styles.counter} role="group" aria-label={label}>
      <Button
        variant="secondary"
        aria-label="Decrement"
        onClick={() => change(-step)}
        disabled={count <= min}
      >
        −
      </Button>
      <output className={styles.value} aria-live="polite" aria-label={label}>
        {count}
      </output>
      <Button aria-label="Increment" onClick={() => change(step)} disabled={count >= max}>
        +
      </Button>
    </div>
  );
}
