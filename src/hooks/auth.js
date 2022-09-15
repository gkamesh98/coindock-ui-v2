import { useEffect, useState, useRef } from "react";
import { useRefresh } from "api/auth";
import { refreshToken } from "helper/functions";
import { useSelector } from "react-redux";
import { useSignupPrefetch } from "api/signup";
import { isEmpty } from "lodash";

export const useIsAuthenticated = () => {
  const { token } = useSelector((state) => state.auth);

  return Boolean(token);
};

export const useFetchAuthRefresh = () => {
  const [ready, setReady] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const [refresh] = useRefresh();
  useEffect(() => {
    if (refreshToken() && !isAuthenticated) {
      const refreshCall = async () => {
        try {
          await refresh().unwrap();
        } finally {
          setReady(true);
        }
      };
      refreshCall();
    } else {
      setReady(true);
    }
  }, [refresh, isAuthenticated]);
  return ready;
};

export const useSignupedUp = () => {
  const authenticated = useIsAuthenticated();
  const singupInfo = useSignupPrefetch("signupsteps");
  const { signupInfo } = useSelector((state) => state.auth);

  const [ready, setReady] = useState(authenticated && !isEmpty(signupInfo));

  const previousAuthenticated = useRef();

  useEffect(() => {
    if (authenticated) {
      setReady(!isEmpty(signupInfo));
    }
  }, [authenticated, signupInfo]);

  useEffect(() => {
    if (previousAuthenticated.current === true && authenticated === false) {
      setReady(true);
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) {
      singupInfo();
    }
  }, [authenticated]);

  useEffect(() => {
    previousAuthenticated.current = authenticated;
  }, [authenticated]);

  return [signupInfo, ready];
};
