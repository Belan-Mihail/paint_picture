import { useRef, useState, useEffect } from "react";

function useHover() {
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const enter = () => setIsHovered(true);
  const leave = () => setIsHovered(false);
  useEffect(() => {
    ref.current.addEventListener("mouseenter", enter);
    ref.current.addEventListener("mouseleave", leave);
  }, []);
  return [ref, isHovered];
}

export default useHover;
