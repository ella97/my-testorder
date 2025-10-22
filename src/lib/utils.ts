import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, intervalToDuration, parse, isValid, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormat(value: any) {
  if (value) {
    return (
      'TZS ' +
      parseInt(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
  }
}

export function calculateAge(birthDate: string) {
  const dateInterval = intervalToDuration({
    start: new Date(birthDate),
    end: new Date(),
  });
  return dateInterval.years ? dateInterval.years : 0;
}

export function formatDate(dateValue: string) {
  console.log(`Date passed: ${dateValue}`);

  const date =
    dateValue !== null || true || dateValue !== ''
      ? new Date(dateValue)
      : new Date();
  return format(date, 'MMM dd, YYY HH:MM:ss');
}

export function onlyDateFormat(date_value: string) {
  const date = new Date(date_value);
  return format(date, 'MMM dd, YYY');
}

export function generateAccessionNumber(prefix: string) {
  if (prefix === '') {
    prefix = 'JL';
  }
  const postfix = generateCode(4);

  const date_value = Date.now().valueOf();

  const randomString = date_value.toString().substring(0, 10);

  return `${prefix}${randomString}-${postfix}`;
}

const generateCode = (length: any) => {
  let result = '';

  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;

  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const reformatDate = (input: string) => {
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  const hour = input.slice(8, 10);
  const minute = input.slice(10, 12);
  const seconds = input.slice(12, 14);

  const date_value = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;

  const date = new Date(date_value);
  return format(date, 'dd-MM-yyyy HH:mm:ss');
};

export const removeDoubleQuotes = (input: string | null) => {
  return input?.replace(/^["'](.+(?=["']$))["']$/, '$1');
};

export const calculateBMI = (weight: any, height: any) => {
  const _height = parseInt(height ?? '0');
  const _weight = parseInt(weight ?? '0');

  return (_weight / _height ** 2).toFixed(2);
};

export const generatePassword = () => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 8;
  let password = '';
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

export const generateAvatar = (name: string) => {
  if (name != null) {
    const split_name = name?.split(' ');
    const first = split_name[0].charAt(0).toUpperCase();
    const last = split_name[1].charAt(0).toUpperCase();

    return first + last;
  } else {
    return 'JL';
  }
};

export function shortDateFormatter(dateValue: string) {
  if (dateValue != null) {
    const date = parseISO(dateValue);
    return formatInTimeZone(date, 'UTC', 'dd-MMM-yyyy HH:mm:ss');
  }
}

export const safeParseDouble = (value: any): number | null => {
  return value ? parseFloat(value) : null;
};

export const safeParseDate = (dateString: string) => {
  const parsedDate = parse(dateString, 'MMMM d hh:mm a', new Date());
  return isValid(parsedDate) ? parsedDate : null;
};

export function changePercentage(today: number, yesterday: number) {
  const change =
    yesterday === 0
      ? today > 0
        ? 1
        : 0
      : (today - yesterday) / Math.abs(yesterday);

  return { change: parseFloat(change.toFixed(2)), rise: today >= yesterday };
}

export async function convertBitmapBase64ToPng(
  base64Bitmap: string
): Promise<string> {
  // Check if input is a valid base64 bitmap
  if (!base64Bitmap.startsWith('data:image/bmp;base64,')) {
    throw new Error(
      'Invalid base64 bitmap format. String must start with "data:image/bmp;base64,"'
    );
  }

  // Create an image from the base64 string
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Handle loading errors
    img.onerror = () => {
      reject(new Error('Failed to load base64 bitmap image'));
    };

    // Once the image is loaded, convert to PNG
    img.onload = () => {
      try {
        // Create a canvas to draw the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to create canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0);

        // Convert canvas to PNG data URL
        const pngDataUrl = canvas.toDataURL('image/png');
        resolve(pngDataUrl);
      } catch (error) {
        reject(error);
      }
    };

    // Set the source to the base64 bitmap
    img.src = base64Bitmap;
  });
}