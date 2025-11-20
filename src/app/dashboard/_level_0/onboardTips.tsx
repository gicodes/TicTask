'use client';

import { Tips } from './onboardingTips';
import { Button } from '@/assets/buttons';
import { useEffect, useState } from 'react';
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
            left: { md: anchorEl.offsetLeft - 6},
            width: anchorEl.offsetWidth + 12,
            height: anchorEl.offsetHeight + 12,
            borderRadius: 2,
            border: {xs: 'none', md: '2px solid #1976d2'},
            boxShadow: { xs: 'none', md: '0 0 12px rgba(25,118,210,0.4)'},
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
            zIndex: 1200,
            maxWidth: '99vw'
          }}
        />
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            position: 'absolute',
            top: tip.anchor?.includes('ai') ? '75%' : anchorEl ? anchorEl.offsetTop + anchorEl.offsetHeight + 12 : '40%',
            left: { md: tip.anchor?.includes('ai') ? '75%' : anchorEl ? anchorEl.offsetLeft - 181 : '50%'},
            transform: anchorEl ? 'none' : 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: 333,
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle><strong>{tip.title}</strong></DialogTitle>
        <DialogContent>
          <Typography variant='subtitle2' gutterBottom mb={2}>{tip.text}</Typography>
          <Button onClick={handleNext}>
            {tip.action || (step === Tips.length - 1 ? 'Finish' : 'Next')}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
