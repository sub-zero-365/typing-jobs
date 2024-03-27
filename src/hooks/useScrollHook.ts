import { useEffect, useState } from "react";
interface IisScrollUp {
  offset?: number;
}
const useScrollHook = (): boolean => {
  const [isScrollUp, setIsScrollUp] = useState<boolean>(true);
  useEffect(() => {
    // var counter = 0;
    var newScroll = 0,
      oldScroll = 0;
    const scrollFnc = () => {
      const { pageYOffset } = window;
      newScroll = pageYOffset;
    
      if ((newScroll ) > oldScroll) {
        setIsScrollUp(false);
      } else {
        setIsScrollUp(true);
      }
      oldScroll = newScroll;
    };
    window.addEventListener("scroll", () => {
      scrollFnc();
    });
    return () => window.removeEventListener("scroll", scrollFnc);
  }, []);
  return isScrollUp;
};
export default useScrollHook;
