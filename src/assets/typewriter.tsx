'use client'

import React, { useEffect, useState } from 'react'
import styles from "@/app/page.module.css";

const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      <span className={styles.cursor} aria-hidden="true" />
    </span>
  );
};

export default Typewriter