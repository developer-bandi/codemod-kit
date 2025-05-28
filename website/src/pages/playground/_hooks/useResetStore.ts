import { useEffect } from "react";
import useStore from "../_store";

const useResetStore = () => {
  const reset = useStore((store) => store.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
};

export default useResetStore;
