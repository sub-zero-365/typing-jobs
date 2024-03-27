import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
type optionsProps = {
  ms?: number | null;
};
const useError = (
  errors: (string | null | unknown)[],

  options: optionsProps = {
    ms: null,
  }
) => {
  const ms = options.ms || 5000;

  const navigation = useNavigation();
  const isPageIdle = navigation.state === "idle";
  const [errMsg, setErrMsg] = useState<string | null>(null);
  useEffect(() => {
    errors.forEach((err: string | null) => {
      if (!isPageIdle) return;
      if (err) setErrMsg(err);
    });

    const timer = setTimeout(() => {
      clearTimeout(timer);
      setErrMsg(null);
    }, ms);
    return () => {
      clearTimeout(timer);
    };
  }, [...errors.map((err) => err), isPageIdle]);
  return errMsg;
};
export default useError;
