import { CSSProperties, ReactNode, useState } from "react";

interface ButtonProps {
  children?: ReactNode;
  style?: CSSProperties;
  type?: string;
}

const Button = (props: ButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.style,
        ...(hovered && styles.hoverStyle),
        ...props.style,
      }}
    >
      {props.children}
    </button>
  );
};

const styles = {
  style: {
    width: "100%",
    height: "53px",
    color: "white",
    backgroundColor: "#fa541c",
    border: "none",
    outline: "none",
    borderRadius: "8px",
    fontFamily: "VisbyRoundCF-DemiBold",
    cursor: "pointer",
    transition: "all .44s ease",
    WebkitTransition: "all .44s ease",
    MozTransition: "all .44s ease",
  } as CSSProperties,
  hoverStyle: { filter: "brightness(145%)" } as CSSProperties,
};

export default Button;
