import { Counter } from "@/components/Counter/Counter";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Next.js Starter</h1>
      <p className={styles.lead}>
        App Router, TypeScript and CSS Modules, with unit, visual regression and
        end-to-end tests wired up.
      </p>
      <section className={styles.demo} aria-labelledby="counter-heading">
        <h2 id="counter-heading">Counter</h2>
        <Counter min={0} max={10} />
      </section>
    </main>
  );
}
