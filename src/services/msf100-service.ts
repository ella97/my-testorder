import { getMFS100Data, postMFS100Data } from '@/services/mfs100-config';
import {
  Biometric,
  CaptureRequest,
  CaptureResponse,
  KeyInfoRequest,
  MatchRequest,
  MFS100Info,
  MFS100Response,
  PidDataRequest,
  VerifyRequest,
  VerifyResponse,
} from '@/amaryllis-types';

let isInitialized = false;
let currentKey = '';

/**
 * Prepares the scanner for use
 */
export const prepareScanner = async (): Promise<boolean> => {
  try {
    if (!isInitialized) {
      const response = await getMFS100Data<MFS100Info>('info');

      if (!response.httpStatus) {
        console.error('Scanner initialization failed:', response.error);
        return false;
      }

      isInitialized = true;

      // Apply key if one is set
      if (currentKey) {
        await getKeyInfo(currentKey);
      }
    }
    return true;
  } catch (error) {
    console.error('Error preparing scanner:', error);
    return false;
  }
};

/**
 * Gets information about the MFS100 device
 */
export const getMFS100Info = async (): Promise<MFS100Response<MFS100Info>> => {
  currentKey = '';
  return getMFS100Data<MFS100Info>('info');
};

/**
 * Gets key information for the MFS100 device
 */
export const getKeyInfo = async (key: string): Promise<MFS100Response<any>> => {
  currentKey = key;

  if (!(await prepareScanner())) {
    return {
      httpStatus: false,
      error: 'Error preparing scanner',
    };
  }

  const request: KeyInfoRequest = { Key: key };
  return postMFS100Data('keyinfo', request);
};

/**
 * Captures a fingerprint
 */
export const captureFinger = async (
  quality: number,
  timeout: number
): Promise<MFS100Response<CaptureResponse>> => {
  if (!(await prepareScanner())) {
    return {
      httpStatus: false,
      error: 'Error preparing scanner',
    };
  }

  const request: CaptureRequest = {
    Quality: quality,
    TimeOut: timeout,
  };

  return postMFS100Data<CaptureRequest, CaptureResponse>('capture', request);
};

/**
 * Verifies fingerprints
 */
export const verifyFinger = async (
  probFMR: string,
  galleryFMR: string,
  bioType: 'FMR' | 'ANSI' = 'FMR'
): Promise<MFS100Response<VerifyResponse>> => {
  if (!(await prepareScanner())) {
    return {
      httpStatus: false,
      error: 'Error preparing scanner',
    };
  }

  const request: VerifyRequest = {
    ProbTemplate: probFMR,
    GalleryTemplate: galleryFMR,
    BioType: bioType,
  };

  return postMFS100Data<VerifyRequest, VerifyResponse>('verify', request);
};

/**
 * Matches a captured fingerprint against a gallery template
 */
export const matchFinger = async (
  quality: number,
  timeout: number,
  galleryFMR: string,
  bioType: 'FMR' | 'ANSI' = 'FMR'
): Promise<MFS100Response<any>> => {
  if (!(await prepareScanner())) {
    return {
      httpStatus: false,
      error: 'Error preparing scanner',
    };
  }

  const request: MatchRequest = {
    Quality: quality,
    TimeOut: timeout,
    GalleryTemplate: galleryFMR,
    BioType: bioType,
  };

  return postMFS100Data('match', request);
};

/**
 * Creates a biometric object for PID data requests
 */
export const createBiometric = (
  bioType: string,
  biometricData: string,
  pos: string,
  nfiq: number,
  na: boolean
): Biometric => {
  return {
    BioType: bioType,
    BiometricData: biometricData,
    Pos: pos,
    Nfiq: nfiq,
    Na: na,
  };
};

/**
 * Gets PID data
 */
export const getPidData = async (
  biometrics: Biometric[]
): Promise<MFS100Response<any>> => {
  if (!(await prepareScanner())) {
    return {
      httpStatus: false,
      error: 'Error preparing scanner',
    };
  }

  const request: PidDataRequest = {
    Biometrics: biometrics,
  };

  return postMFS100Data('getpiddata', request);
};

/**
 * Gets Proto PID data
 */
export const getProtoPidData = async (
  biometrics: Biometric[]
): Promise<MFS100Response<any>> => {
  if (!(await prepareScanner())) {
    return {
      httpStatus: false,
      error: 'Error preparing scanner',
    };
  }

  const request: PidDataRequest = {
    Biometrics: biometrics,
  };

  return postMFS100Data('getppiddata', request);
};

/**
 * Gets RBD data
 */
export const getRbdData = async (
  biometrics: Biometric[]
): Promise<MFS100Response<any>> => {
  if (!(await prepareScanner())) {
    return {
      httpStatus: false,
      error: 'Error preparing scanner',
    };
  }

  const request: PidDataRequest = {
    Biometrics: biometrics,
  };

  return postMFS100Data('getrbddata', request);
};

/**
 * Gets Proto RBD data
 */
export const getProtoRbdData = async (
  biometrics: Biometric[]
): Promise<MFS100Response<any>> => {
  if (!(await prepareScanner())) {
    return {
      httpStatus: false,
      error: 'Error preparing scanner',
    };
  }

  const request: PidDataRequest = {
    Biometrics: biometrics,
  };

  return postMFS100Data('getprbddata', request);
};