'use client';

import Link from "next/link";
import { Button } from "@/assets/buttons";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { Box, Typography } from "@mui/material";
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
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "3rem", md: "5.2rem" },
            lineHeight: 1.1,
            letterSpacing: "-0.07em",
            fontWeight: 450,
            width: '100%',
            maxWidth: 600,
            display: 'grid',
            mx: 'auto',
            mb: 1,
          }}
        >
          Every task
          <Box
            component="span"
            sx={{
              display: "flex",
              fontStyle: "italic",
              fontWeight: 380,
              letterSpacing: "-0.06em",
              opacity: 0.55,
              justifyContent: 'right'
            }}
          >
            Starts as a<span className="semi-bold">&nbsp;ticket</span>.
          </Box>
        </Typography>

        <p className={styles.heroLead}>
          For individuals & teams who want to get things done without the clutter.
        </p>
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
          <span className={styles.avatar}>SE</span>
          <span className={styles.avatar}>OB</span>
          <span className={styles.avatar}>BC</span>
          <span className={styles.avatar}>GC</span>
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
