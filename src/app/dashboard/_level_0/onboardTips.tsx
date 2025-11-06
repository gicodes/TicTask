'use client';

import { Tips } from './onboardingTips';
import { useEffect, useState } from 'react';
import styles from "@/app/page.module.css";
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';

interface OnboardingTipProps {
  title: string;
  text: string;
  action?: string;
  anchor?: string; 
}

export default function DashboardOnboarding() {
  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const seen = typeof window !== 'undefined' && localStorage.getItem('tictask_onboarding_seen');
    if (!seen) {
      setOpen(true);
      localStorage.setItem('tictask_onboarding_seen', 'true');
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const currentAnchor = Tips[step]?.anchor;
    if (currentAnchor) {
      const element = document.querySelector(currentAnchor) as HTMLElement;
      setAnchorEl(element);
    } else {
      setAnchorEl(null);
    }
  }, [step, open]);

  const handleNext = () => {
    if (step < Tips.length - 1) {
      setStep((s) => s + 1);
    } else {
      setOpen(false);
    }
  };

  if (!open) return null;

  const tip: OnboardingTipProps = Tips[step];

  return (
    <>
      {anchorEl && (
        <Box
          sx={{
            position: 'absolute',
            top: anchorEl.offsetTop - 6,
            left: anchorEl.offsetLeft - 6,
            width: anchorEl.offsetWidth + 12,
            height: anchorEl.offsetHeight + 12,
            borderRadius: 2,
            border: '2px solid #1976d2',
            boxShadow: '0 0 12px rgba(25,118,210,0.4)',
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
            zIndex: 1200,
          }}
        />
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            position: 'absolute',
            top: anchorEl ? anchorEl.offsetTop + anchorEl.offsetHeight + 12 : '40%',
            left: anchorEl ? anchorEl.offsetLeft : '50%',
            transform: anchorEl ? 'none' : 'translate(-50%, -50%)',
            width: 320,
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle>{tip.title}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom mb={2}>{tip.text}</Typography>
          <button onClick={handleNext} className={styles.btnPrimary}>
            {tip.action || (step === Tips.length - 1 ? 'Finish' : 'Next')}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
