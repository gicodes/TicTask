'use client';

import { Button } from "@/assets/buttons";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { useStartTrial } from "@/hooks/useFreeTrial";

const Hero = () => {
  const { startTrial } = useStartTrial();
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();

  const handleStartTrial = async () => {
    if (!user) {
      showAlert("Sign in to start your free trial", "warning");
      setTimeout(() => router.push("/auth/login"), 2000);

      return;
    }

    const trial = await startTrial(user.id);

    if (trial===null) showAlert("Something went wrong. Please try again or contact admin", "warning");
    if (!trial===null && !trial===undefined) showAlert("You have an active Pro Subscription running!");
      else showAlert("Unauthorized! Kindly contact admin", "warning");
  };

  return (
    <>
      <div className={styles.heroTitle}>
        <h2>
          Ticket <span className="font-xl">&</span> Task Management System
        </h2>
        <h2>
          <span className="custom-warm">Driven by AI</span>, Designed for Everyone
        </h2>
      </div>

      <div className={styles.heroSubtitle}>
        TicTask is a lightweight, collaborative ticket and task management platform built for fast, friendly, agile teamwork. 
        Whether you&apos;re a small team or a large enterprise, TicTask is designed to meet your needs with its intuitive interface and robust features.
      </div>

      <div className={styles.heroActions}>
        <div className={styles.btnGroup}>
          <Button onClick={handleStartTrial}>
            Start free trial
          </Button>
          <Button tone='secondary'>
            Watch demo video
          </Button>
        </div>

        <p className={styles.trialText}>
          14-day free trial. No credit card required.
        </p>
      </div>
    </>
  );
};

export default Hero;
