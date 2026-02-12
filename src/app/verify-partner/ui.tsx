"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Card,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { Button } from "@/assets/buttons";
import { apiPost, apiPatch } from "@/lib/axios";
import PersonalInfoStep from "./steps/personalInfo";
import ReviewSubmitStep from "./steps/reviewSubmit";
import CompanyProfileStep from "./steps/companyProfile";
import PartnershipDetailsStep from "./steps/partnershipDetails";
import { GenericUserRes, GenericUserMessageRes, GenericResponse } from "@/types/axios";

const partnerSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  position: z.string().optional(),
  email: z.string().email().readonly(),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

  companyName: z.string().min(2, "Company name required for partners"),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.string().min(1, "Select an industry"),
  teamSize: z.string().optional(),
  logo: z.any().optional(),

  partnerRoles: z.array(z.string()).min(1, "Select at least one role"),
  description: z.string().min(50, "Tell us more (min 50 chars)"),
  collaborationGoals: z.string().optional(),

  preferredContact: z.enum(["email", "phone", "both"]).default("email").optional(),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

const steps = [
  "Personal Information",
  "Company Profile",
  "Partnership Details",
  "Review & Submit",
];

export default function PartnerOnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const methods = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      website: "",
      industry: "",
      teamSize: "",
      partnerRoles: [],
      description: "",
      collaborationGoals: "",
      preferredContact: "email",
    },
    mode: "onTouched",
  });

  const { handleSubmit, trigger, reset } = methods;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      setLoading(true);
      setError(null);

      try {
        const response = await apiPost<GenericUserRes>("/auth/confirm-verification", { 
          token, 
          partner: "partner" 
        });

        if (!response?.user?.email) {
          throw new Error("No valid user data in response");
        }

        reset({
          fullName: response.user.name || "",
          email: response.user.email,
          companyName: response.user.company,
          partnerRoles: response.user.roles
        });
      } catch (err) {
        console.error("Verification fetch failed:", err);
        setError(
          (err as GenericResponse).response?.data?.message || 
          "Invalid or expired onboarding link. Please apply again."
        );
        setTimeout(() => router.push("/company/partner"), 8000);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, router, reset]);

  const handleNext = async () => {
    const isValid = await trigger(getFieldsForStep(activeStep));
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit: SubmitHandler<PartnerFormData> = async (data) => {    
    setLoading(true);
    setError(null);

    try {
      let logoUrl = null;

      if (data.logo?.[0]) {
        const formData = new FormData();
        formData.append("file", data.logo[0]);

        const uploadRes = await apiPost<GenericUserMessageRes>("/upload/logo", formData)
        logoUrl = uploadRes.data.url;
      }

      await apiPatch("/company/partner/onboard", {
        ...data,
        logo: logoUrl,
        token,
      });

      const r = await signIn('credentials', { redirect: false, email: data.email, password: data.password });

      if (r?.error) {
        setError(r.error || 'Invalid credentials');
      } else {
        router.refresh();
        setSuccess(true);
      } 
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (err) {
      setError((err as GenericUserMessageRes).message || "Failed to complete onboarding. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getFieldsForStep = (step: number): (keyof PartnerFormData)[] => {
    switch (step) {
      case 0:
        return ["fullName", "position"];
      case 1:
        return ["companyName", "website", "industry", "teamSize"];
      case 2:
        return ["partnerRoles", "description", "collaborationGoals", "preferredContact"];
      default:
        return [];
    }
  };

  if (loading && activeStep === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="section" py={8} px={2} maxWidth={900} mx="auto">
      <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          Complete Your Partner Onboarding
        </Typography>

        <Typography variant="body1" color="text.secondary" textAlign="center" mb={4}>
          Let's set up your profile so we can start collaborating effectively.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Onboarding complete! Redirecting to dashboard...
          </Alert>
        )}

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }} >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography fontSize={{ xs: 11, sm: 13}}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && <PersonalInfoStep />}
            {activeStep === 1 && <CompanyProfileStep />}
            {activeStep === 2 && <PartnershipDetailsStep />}
            {activeStep === 3 && <ReviewSubmitStep />}

            <Stack direction={{ sm: "row"}} gap={1} spacing={2} justifyContent="center" mt={5}>
              <Button
                tone="retreat"
                disabled={activeStep === 0 || loading}
                onClick={handleBack}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || success}
                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? "Submitting..." : "Complete Onboarding"}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Stack>
          </form>
        </FormProvider>
      </Card>
    </Box>
  );
}