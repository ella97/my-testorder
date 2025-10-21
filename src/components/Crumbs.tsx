'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { TBreadCrumbProps } from '@/amaryllis-types';
import React from 'react';

const Crumbs = ({
  homeElement,
  separator,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathname = paths.split('/').filter(Boolean);
  return (
    <div className='px-5 py-2 uppercase'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard'>{homeElement}</BreadcrumbLink>
          </BreadcrumbItem>
          {pathname.length > 0 && <BreadcrumbSeparator />}
          {pathname.map((item: any, index: number) => {
            const href = `/${pathname.slice(0, index + 1).join('/')}`;
            const itemLink = capitalizeLinks
              ? item[0].toUpperCase() + item.slice(1, item.length)
              : item;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>
                </BreadcrumbItem>
                {pathname.length !== index + 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Crumbs;