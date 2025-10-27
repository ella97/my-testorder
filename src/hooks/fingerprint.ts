import { useMutation, useQuery } from '@tanstack/react-query';
import * as MFS100Service from '@/services/msf100-service';
import { Biometric } from '@/amaryllis-types';
const queryKeys = {
  mfs100Info: () => ['MFS100', 'INFO'],
  keyInfo: (key: string) => ['MFS100', 'KEY_INFO', key],
};

/**
 * Hook to get MFS100 device information
 */
export const useMFS100Info = () => {
  return useQuery({
    queryKey: queryKeys.mfs100Info(),
    queryFn: MFS100Service.getMFS100Info,
  });
};

/**
 * Hook to get key information
 */
export const useKeyInfo = (key: string) => {
  return useQuery({
    queryKey: queryKeys.keyInfo(key),
    queryFn: () => MFS100Service.getKeyInfo(key),
    enabled: !!key, // Only run if key is provided
  });
};

/**
 * Hook to capture fingerprint
 */
export const useCaptureFinger = () => {
  return useMutation({
    mutationFn: (data: any) =>
      MFS100Service.captureFinger(data.quality, data.timeout),
  });
};

/**
 * Hook to verify fingerprint
 */
export const useVerifyFinger = () => {
  return useMutation({
    mutationFn: ({
      probFMR,
      galleryFMR,
      bioType = 'FMR' as const,
    }: {
      probFMR: string;
      galleryFMR: string;
      bioType?: 'FMR' | 'ANSI';
    }) => MFS100Service.verifyFinger(probFMR, galleryFMR, bioType),
  });
};

export const useMatchFinger = () => {
  return useMutation({
    mutationFn: ({
      quality,
      timeout,
      galleryFMR,
      bioType = 'FMR' as const,
    }: {
      quality: number;
      timeout: number;
      galleryFMR: string;
      bioType?: 'FMR' | 'ANSI';
    }) => MFS100Service.matchFinger(quality, timeout, galleryFMR, bioType),
  });
};

/**
 * Hook to get PID data
 */
export const useGetPidData = () => {
  return useMutation({
    mutationFn: (biometrics: Biometric[]) =>
      MFS100Service.getPidData(biometrics),
  });
};

/**
 * Hook to get Proto PID data
 */
export const useGetProtoPidData = () => {
  return useMutation({
    mutationFn: (biometrics: Biometric[]) =>
      MFS100Service.getProtoPidData(biometrics),
  });
};

/**
 * Hook to get RBD data
 */
export const useGetRbdData = () => {
  return useMutation({
    mutationFn: (biometrics: Biometric[]) =>
      MFS100Service.getRbdData(biometrics),
  });
};

/**
 * Hook to get Proto RBD data
 */
export const useGetProtoRbdData = () => {
  return useMutation({
    mutationFn: (biometrics: Biometric[]) =>
      MFS100Service.getProtoRbdData(biometrics),
  });
};