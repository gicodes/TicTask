'use client';

import { useSearchParams } from 'next/navigation';
import { UserType } from '@/types/onboarding';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/api';
import { useState } from 'react';
import OnboardingUI from './ui';

export default function Onboarding() {
  const router = useRouter();
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

  const saveStep = async (step: number, data: unknown) => {
    setLoading(true);
    setError(null);
 
    try {
      await apiPost('/auth/onboarding', 
        { step, data },   
        { Authorization: `Bearer ${token}`}
      );
    } catch (err: unknown) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally { setLoading(false);}
  };

  const handleNext = async () => {
    if (step === 1 && !password) {
      setError('Password is required');
      return;
    }
    if (step === 2) {
      if (userType === 'PERSONAL' && !name) {
        setError('Please enter your name');
        return;
      }
      if (userType === 'BUSINESS' && !orgName) {
        setError('Please enter your organization name');
        return;
      }
    }

    const data = 
      step === 1 ? { password } 
      : step === 2 ? userType === 'PERSONAL' 
        ? { userType, name, country, phone }
        : {
            userType,
            orgName,
            industry,
            teamSize,
            hqCountry,
            website,
            bio,
          } : {};

    await saveStep(step, data);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
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

      await saveStep(3, finalData);

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      console.error("❌ Onboarding submit failed:", err);
      setError("Something went wrong. Please try again.");
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
