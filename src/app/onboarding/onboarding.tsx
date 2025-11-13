'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { GenericAPIRes } from '@/types/axios';
import { UserType } from '@/types/onboarding';
import { useAlert } from '@/providers/alert';
import { signIn } from 'next-auth/react';
import { apiPost } from '@/lib/api';
import { useState } from 'react';
import OnboardingUI from './ui';

export default function Onboarding() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const params = useSearchParams();
  const token = params.get('token');
  const [bio, setBio] = useState('');
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [orgName, setOrgName] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [industry, setIndustry] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [hqCountry, setHqCountry] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>('PERSONAL');

  const stepsTotal = 3;

  const saveStep = async (
    step: number, 
    data: unknown
  ): Promise<GenericAPIRes> => {
    setLoading(true);
    setError(null);

    try {
      const res: GenericAPIRes = await apiPost(
        '/auth/onboarding',
        { step, data },
        { Authorization: `Bearer ${token}` }
      );
      return res;
    } catch (err: unknown) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      return { ok: false, message: 'Something went wrong.' };
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setError(null);

    if (step === 1 && !password) return setError('Password is required');
    if (step === 2) {
      if (userType === 'PERSONAL' && !name) return setError('Please enter your name');
      if (userType === 'BUSINESS' && !orgName) return setError('Please enter your organization name');
    }

    const data = 
      step === 1 ? { password }
      : step === 2 ? userType === 'PERSONAL'
        ? { userType, name, country, phone }
        : { userType, orgName, industry, teamSize, hqCountry, website, bio }
      : {};

    const res = await saveStep(step, data);
    if (res.ok) setStep(prev => prev + 1);
    else setError(res.message);
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const finalData = {
        userType,
        name,
        orgName,
        country,
        phone,
        industry,
        teamSize,
        hqCountry,
        website,
        bio,
      };

      const res = await saveStep(3, finalData);
      
      if (res.ok) {
        const email = res?.user?.email;

        showAlert("Onboarding Complete. Signing in may take a few seconds...", "success")

        const r = await signIn('credentials', { redirect: false, email, password });
        if (r?.error) {
          setError(r.error || 'Invalid credentials');
        } else {
          router.refresh();
          router.push('/dashboard');
        }      
      } else setError(res.message || "Failed to save final step.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <OnboardingUI
      {...{
        step,
        stepsTotal,
        progress: (step / stepsTotal) * 100,
        loading,
        error,
        handleNext,
        handleBack,
        handleSubmit,
        userType,
        setUserType,
        password,
        setPassword,
        name,
        setName,
        orgName,
        setOrgName,
        country,
        setCountry,
        phone,
        setPhone,
        photo,
        setPhoto,
        industry,
        setIndustry,
        teamSize,
        setTeamSize,
        hqCountry,
        setHqCountry,
        website,
        setWebsite,
        logo,
        setLogo,
        bio,
        setBio,
      }}
    />
  );
}
