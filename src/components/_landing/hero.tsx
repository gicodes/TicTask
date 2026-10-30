'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/axios";
import { Avatar } from "@mui/material";
import { Button } from "@/assets/buttons";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { Box, Typography } from "@mui/material";
import { Testimonial, AVATAR_BGS } from "@/types/review";
import { useSubscription } from "@/providers/subscription";

const getInitials = (name?: string | null) => {
  if (!name) return "T";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Hero = () => {
  const { startFreeTrial } = useSubscription();
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();

  const [testimonials, setTestimonials] = useState<Testimonial[] | null>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchTestimonials = async () => {
      try {
        const res = await apiGet("/reviews/testimonials?limit=4");
        const data = (res as { data?: Testimonial[] } | null)?.data;
        if (!cancelled) {
          setTestimonials(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) setTestimonials([]);
      }
    };

    fetchTestimonials();

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
          {testimonials?.map((t, index) => {
            const initials = getInitials(t.author?.name);
            const bg = AVATAR_BGS[index % AVATAR_BGS.length];

            return (
              <Link
                key={t.id}
                href={`/reviews/${t.slug}`}
                aria-label={`Read ${t.author?.name || "user"}'s review`}
                title={t.author?.name || "Read review"}
              >
                <Avatar
                  src={t.author?.photo || undefined}
                  alt={t.author?.name || initials}
                  imgProps={{ loading: "lazy" }}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    display: "grid",
                    marginLeft: "-5px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "black",
                    border: "1px solid var(--background)",
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

          <Link href="/reviews/create" className={styles.avatarMore}>
            +
          </Link>
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