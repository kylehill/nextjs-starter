import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Next.js Starter</h1>
      <p className={styles.lead}>
        App Router, TypeScript and CSS Modules, with unit, visual regression and
        end-to-end tests wired up.
      </p>
    </main>
  );
}
