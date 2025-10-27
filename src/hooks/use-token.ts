'use client';

import { useSession } from 'next-auth/react';
import { LabProp, SysUserProp } from '@/amaryllis-types';

export const useToken = () => {
  const { data: session }: any = useSession();
  return session?.user?.details?.accessToken;
};

export const useGetUser = () => {
  const { data: session }: any = useSession();
  const role = session?.user?.role;
  const userDetails = session?.user.details;
  const user: SysUserProp = userDetails?.details?.systemUser;
  const laboratory: LabProp = userDetails?.details?.laboratory;

  const userData: any = {
    systemUserId: user?.systemUserId,
    userName: user?.userName,
    userEmail: user?.userEmail,
    laboratoryId: laboratory?.laboratoryId,
    role: role,
  };

  return userData;
};