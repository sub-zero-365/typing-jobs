import React from "react";
interface mouseRef {
  ref: any;
}
const useMousePosition = ({ ref }:mouseRef) => {
  const [mousePosition, setMousePosition] = React.useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (ev: any) => {
    ev.stopPropagation()
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    ref?.current?.addEventListener("mousemove", updateMousePosition);
    // ref.addEventListener("touchmove", updateMousePosition);

    return () => {
      ref?.current?.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};
export default useMousePosition;
