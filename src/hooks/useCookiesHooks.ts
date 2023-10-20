import { CookiesType } from "@/types";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

const useCookiesHooks = () => {
  const [cookies, setCookie, removeCookie] = useCookies<string, CookiesType>(['uid', 'loginTime', 'elapsedTime']);
  const navigate = useNavigate();
  const toast = useToast();
  const elapsedTime = () => {
    setCookie("elapsedTime", new Date().getTime());
    if (cookies.loginTime !== undefined && cookies.elapsedTime !== undefined) {
      const diff = ((cookies.elapsedTime - cookies.loginTime) / (60 * 60 * 1000));
      if (diff > 3) {
        logOut();
        return;
      }
    }
  };

  const updateSessionTime = () => {
    setCookie("loginTime", new Date().getTime());
  };

  const logIn = (uid: string) => {
    setCookie("uid", uid);
    setCookie("loginTime", new Date().getTime());
    navigate("/todos");
    toast.logInToast();
  };

  const logOut = () => {
    removeCookie("uid");
    removeCookie("loginTime");
    removeCookie("elapsedTime");
    navigate("/");
    toast.logOutToast();
  };

  return { cookies, logIn, logOut, elapsedTime, updateSessionTime };
};

export default useCookiesHooks;