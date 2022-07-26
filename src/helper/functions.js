import { forEach, isPlainObject, isArray } from "lodash";
import { decodeJwt } from "jose";

export const convertObjectKeys = (obj, conversionFn) => {
  const newObject = {};
  const newArray = [];
  forEach(obj, (value, key) => {
    let convertedValue = value;
    if (isPlainObject(convertedValue) || isArray(convertedValue)) {
      convertedValue = convertObjectKeys(convertedValue, conversionFn);
    }

    if (isArray(obj)) {
      newArray.push(convertedValue);
    } else {
      newObject[conversionFn(key)] = convertedValue;
    }
  });
  if (isArray(obj)) return newArray;
  return newObject;
};

const localStorageAccessToken = process.env.REACT_APP_ACCESS_TOKEN;
const localStorageRefreshToken = process.env.REACT_APP_REFRESH_TOKEN;

export const authToken = () => localStorage.getItem(localStorageAccessToken);
export const refreshToken = () => localStorage.getItem(localStorageRefreshToken);

export const getUserId = () => {
  const { sub } = decodeJwt(authToken());
  return sub;
};

export default { convertObjectKeys, authToken, refreshToken, getUserId };
