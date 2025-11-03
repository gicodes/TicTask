export type UserType = 'PERSONAL' | 'BUSINESS';

export interface OnboardingProps {
  step: number;
  stepsTotal: number;
  progress: number;
  loading: boolean;
  error: string | null;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: (e: React.FormEvent) => void;

  userType: UserType;
  setUserType: (v: UserType) => void;

  password: string;
  setPassword: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  orgName: string;
  setOrgName: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  photo: File | null;
  setPhoto: (v: File | null) => void;

  industry: string;
  setIndustry: (v: string) => void;
  teamSize: string;
  setTeamSize: (v: string) => void;
  hqCountry: string;
  setHqCountry: (v: string) => void;
  website: string;
  setWebsite: (v: string) => void;
  logo: File | null;
  setLogo: (v: File | null) => void;
  bio: string;
  setBio: (v: string) => void;
}

export interface CountrySelectProps {
  accountType: "PERSONAL" | "BUSINESS";
  hqCountry: string;
  setHqCountry: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
}

export interface FinalStepRes {
  ok: boolean;
  message: string;
  redirect?: string;
}