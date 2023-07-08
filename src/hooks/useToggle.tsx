import { useState } from "react";

const useToggleBoolean: any = (intialData: boolean) => {
  const [isToggle, setIsToggle] = useState(intialData);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  return [isToggle, handleToggle];
};

export default useToggleBoolean;
