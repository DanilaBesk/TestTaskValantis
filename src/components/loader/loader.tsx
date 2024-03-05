import { Loader2 } from "lucide-react";
import styles from "./loader.module.css";

interface LoaderProps {
  alignSelf?: "flex-start" | "center" | "flex-end" | "stretch";
  position?: "left" | "center" | "right" | "default";
  width?: number;
  height?: number;
}

const MARGIN_CLASSES = {
  left: "0 auto 0 0",
  right: "0 0 0 auto",
  center: "0 auto",
  default: "0",
};
export const Loader = ({
  alignSelf = "stretch",
  position = "default",
  width = 40,
  height = 40,
}: LoaderProps) => {
  return (
    <Loader2
      style={{ alignSelf, margin: MARGIN_CLASSES[position] }}
      width={width}
      height={height}
      className={styles.loader}
    />
  );
};
