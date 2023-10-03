import { useEffect } from "react";

const useConsoleLog = (value: any) => {
  useEffect(() => {
    console.log("******", value);
  }, [value]);
};

export default useConsoleLog;
