import { CSSProperties, ReactNode, useState } from "react";

interface LinkProps {
  children?: ReactNode;
  style?: CSSProperties;
  type?: string;
  onClick?: () => void;
}

const Link = (props: LinkProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onClick={props?.onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.style,
        ...(hovered && styles.hoverStyle),
        ...props.style,
      }}
    >
      {props.children}
    </span>
  );
};

const styles = {
  style: {
    color: "#fa541c",
    cursor: "pointer",
    transition: "all .44s ease",
    WebkitTransition: "all .44s ease",
    MozTransition: "all .44s ease",
  } as CSSProperties,
  hoverStyle: {
    filter: "brightness(145%)",
    textDecoration: "underline",
  } as CSSProperties,
};

export default Link;
