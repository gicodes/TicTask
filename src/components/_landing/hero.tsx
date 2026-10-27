'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { Button } from "@/assets/buttons";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { Box, Typography } from "@mui/material";
import { useSubscription } from "@/providers/subscription";
import { apiGet } from "@/lib/axios";
import type { User } from "@/types/users";
import type { UserProfileRes } from "@/types/axios";

const SOCIAL_PROOF_USERS = [
  { id: 8, initials: "SE", bg: 'var(--happy)' },
  { id: 4, initials: "HA", bg: 'var(--clear)' },
  { id: 23, initials: "NC", bg: 'var(--autumn)' },
  { id: 18, initials: "VC", bg: 'var(--summer)' },
];

const Hero = () => {
  const { startFreeTrial } = useSubscription();
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();

  const [profiles, setProfiles] = useState<Record<number, User | null>>({});

  useEffect(() => {
    let cancelled = false;

    const fetchProfiles = async () => {
      const results = await Promise.all(
        SOCIAL_PROOF_USERS.map(async ({ id }) => {
          try {
            const res: UserProfileRes = await apiGet(`/user/${id}/public`);
            return [id, res.data as User] as const;
          } catch {
            return [id, null] as const;
          }
        })
      );

      if (!cancelled) {
        setProfiles(Object.fromEntries(results));
      }
    };

    fetchProfiles();

    return () => {
      cancelled = true;
    };
  }, []);

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
      showAlert(
        "Something went wrong. Please try again or contact admin",
        "warning"
      );
      return;
    }

    if (trial.active) {
      showAlert("You already have an active trial subscription!", "info");
      return;
    }

    showAlert("Unauthorized! Kindly contact admin", "warning");
  };

  return (
    <section id="get-started" style={{ width: "100%" }}>
      <div className={styles.heroTitle}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "3rem", md: "5.2rem" },
            lineHeight: 1.1,
            letterSpacing: "-0.07em",
            fontWeight: 450,
            width: "100%",
            maxWidth: 600,
            display: "grid",
            mx: "auto",
            mb: 1,
          }}
        >
          <span>Every task</span>

          <Box
            component="span"
            sx={{
              display: "flex",
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "-0.06em",
              opacity: 1,
              justifyContent: "right",
            }}
          >
            <span className="opac-3">Starts as a</span>
            <span className="custom-warm">&nbsp;ticket</span>
          </Box>
        </Typography>

        <p className={styles.heroLead}>
          For individuals &amp; teams who want to get things done without the clutter.
        </p>
      </div>

      <div className={styles.heroCTA}>
        <div className={styles.heroActions}>
          <div className={styles.btnGroup}>
            <Button size="large" onClick={handleStartTrial}>
              Start free trial
            </Button>

            <Button tone="secondary" size="large">
              <Link href="/resources">Learn more</Link>
            </Button>
          </div>

          <p className="opac-2">
            14-day free trial. No credit card required.
          </p>
        </div>
      </div>

      <div className={styles.heroSocialProof}>
        <div className={styles.socialProofAvatars}>
          {SOCIAL_PROOF_USERS.map(({ id, initials, bg }) => {
            const profile = profiles[id];

            return (
              <Link
                key={id}
                href={`/user/${id}`}
                aria-label={`View ${profile?.name || initials}'s public profile`}
                title={profile?.name || `View ${initials}'s profile`}
              >
                <Avatar
                  src={profile?.photo || undefined}
                  alt={profile?.name || initials}
                  imgProps={{ loading: "lazy" }}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    display: 'grid',
                    marginLeft: '-5px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'black',
                    border: '1px solid var(--background)',
                    backgroundColor: `color-mix(in srgb, ${bg} 93%, transparent)`,
                    transition: "transform 180ms ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  {initials}
                </Avatar>
              </Link>
            );
          })}

          <Link href={'/reviews/create'} className={styles.avatarMore}>+</Link>
        </div>

        <div className={styles.socialProofText}>
          <div className={styles.socialProofStars}>
            <span>★★★★★</span>
          </div>

          <p>Trusted by individuals &amp; teams</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
