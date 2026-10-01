'use client';

import Link from "next/link";
import { Button } from "@/assets/buttons";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { useSubscription } from "@/providers/subscription";

const Hero = () => {
  const { startFreeTrial } = useSubscription();
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();

  const handleStartTrial = async () => {
    if (!user) {
      showAlert("Sign in to start your free trial", "warning");

      setTimeout(() => {
        const returnUrl = encodeURIComponent("/#get-started"); 
        router.push(`/auth/login?returnUrl=${returnUrl}`);
      }, 1500);

      return;
    }

    const trial = await startFreeTrial(14);

    if (!trial) {
      showAlert( "Something went wrong. Please try again or contact admin", "warning");
      return;
    }
    if (trial.active) {
      showAlert("You already have an active trial subscription!", "info");
      return;
    }

    showAlert("Unauthorized! Kindly contact admin", "warning");
  };

  return (
    <section id="get-started" style={{ width: '100%'}}>
      <div className={styles.heroTitle}>
        <h2 className={'min-height-50'}>
          Simple task management tool
        </h2>
        <p className={styles.heroLead}>
          For individuals & teams who want to get things done without the clutter.
        </p>

        <span className={styles.heroEyebrow}>
          <span className="custom-warm">Driven by Organisation</span> · Designed for Everyone
        </span>
      </div>

      <div className={styles.heroCTA}>
        <div className={styles.heroActions}>
          <div className={styles.btnGroup}>
            <Button 
              size="large"
              onClick={handleStartTrial} 
            > 
              Start free trial 
            </Button>
            
            <Button 
              tone='secondary'
              size="large"
            >
              <Link href="/resources"> 
                Learn more
              </Link>
            </Button>
          </div>
          <p className={'opac-1'}> 
            14-day free trial. No credit card required.
          </p>
        </div>
      </div>
      
      <div className={styles.heroSocialProof}>
        <div className={styles.socialProofAvatars}>
          <span className={styles.avatar}>A</span>
          <span className={styles.avatar}>J</span>
          <span className={styles.avatar}>M</span>
          <span className={styles.avatar}>S</span>
          <span className={styles.avatarMore}>+</span>
        </div>

        <div className={styles.socialProofText}>
          <div className={styles.socialProofStars}>
            <span>★★★★★</span>
          </div>

          <p>
            Trusted by individuals & teams
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
