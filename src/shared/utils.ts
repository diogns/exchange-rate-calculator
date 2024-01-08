import * as CryptoJS from 'crypto-js';
import Constants from './constants';

export function encrypt(jsonObject: any, secretKey = ''): string {
  const jsonString = JSON.stringify(jsonObject);
  return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}

export function decrypt(
  encryptedString: string,
  secretKey = '',
): object | null {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedString, secretKey).toString(
      CryptoJS.enc.Utf8,
    );
    return JSON.parse(decrypted);
  } catch (e) {
    return null;
  }
}

// DTO Helpers
function generateExpiryTimestamp(months = 3): number {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.getTime();
}

function isNumeric(value: string): boolean {
  return /^-?\d+$/.test(value);
}

export function validateNonNullNonEmptyString(obj: any): boolean {
  return obj && typeof obj === 'string' && obj.trim() !== '';
}

export function validateOptionalString(obj: object, key: string): boolean {
  try {
    if (typeof obj[key] === 'string') {
      return true;
    } else {
      if (typeof obj[key] === 'undefined') {
        obj[key] = Constants.defaultStringValue; // default value is '' for optional string
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {
    return false;
  }
}

export function validateOptionalDurationNumber(thisObject: any): boolean {
  if (typeof thisObject.duration === 'number') {
    return true;
  } else {
    if (typeof thisObject.duration === 'undefined') {
      thisObject.duration = Constants.defaultTimeInSecondsInView;
      return true;
    } else {
      return false;
    }
  }
}

export function validateOptionalExpNumber(thisObject: any): boolean {
  if (typeof thisObject.exp === 'number') {
    return true;
  } else {
    if (typeof thisObject.exp === 'undefined') {
      thisObject.exp = generateExpiryTimestamp(
        Constants.defaultTimeInMonthsInDB,
      );
      return true;
    } else {
      return false;
    }
  }
}

export function validateOptionalPageSize(thisObject: any): boolean {
  if (typeof thisObject.pageSize === 'undefined') {
    thisObject.pageSize = Constants.defaultPageSize;
    return true;
  } else {
    if (isNumeric(thisObject.pageSize as string)) {
      thisObject.pageSize = parseInt(thisObject.pageSize as string, 10);
      return true;
    } else {
      return false;
    }
  }
}

export function stringToBoolean(stringValue: string): boolean | null {
  switch (stringValue?.toLowerCase()?.trim()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
}

export function validateOptionalDisplayStatus(thisObject: any): boolean {
  if (typeof thisObject.displayStatus === 'undefined') {
    thisObject.displayStatus = null;
    return true;
  } else {
    if (typeof thisObject.displayStatus === 'string') {
      if (
        thisObject.displayStatus !== 'true' &&
        thisObject.displayStatus !== 'false'
      ) {
        return false;
      }
    }
    thisObject.displayStatus = stringToBoolean(thisObject.displayStatus);
    return true;
  }
}

export function validateNextPageObject(thisObject: any): boolean {
  if (thisObject.nextPage != null) {
    if (typeof thisObject.nextPage === 'object') {
      if (
        (thisObject.nextPage.hasOwnProperty('userName') &&
          thisObject.nextPage.hasOwnProperty('notificationId')) ||
        thisObject.nextPage.hasOwnProperty('userNameAndDisplayStatus')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}


/**
 * Validates an array of user groups, and every user group must be a non-null, non-empty string.
 * 
 * @param thisObject - The array of user groups to validate.
 * @returns True if the array is valid, false otherwise.
 */
export function validateUserGroupArray(thisObject: any): boolean {
  if (Array.isArray(thisObject)) {
    if (thisObject.length > 0) {
      for (let i = 0; i < thisObject.length; i++) {
        const obj = thisObject[i];
        if (!(obj && typeof obj === 'string' && obj.trim() !== '')) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

