import { CSSProperties, ChangeEventHandler, useState } from "react";

interface PhotoInputProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  style?: CSSProperties;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const PhotoInput = (props: PhotoInputProps) => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files !== null) {
      const image = event.target.files[0];
      setSelectedImage(image);
      props.onChange(event);
    }
  };

  return (
    <div
      style={{
        ...styles.style,
        ...props.style,
      }}
    >
      <label
        htmlFor={props.id}
        style={{
          display: "inline-block",
          width: "100%",
          cursor: "pointer",
        }}
      >
        {selectedImage ? (
          <div
            style={{
              width: "52px",
              height: "52px",
              backgroundImage: `url(${URL.createObjectURL(selectedImage)})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "8px",
            }}
          />
        ) : (
          <div style={styles.uploadStyle}>+</div>
        )}

        <div style={styles.labelStyle}>{props.label}</div>
      </label>

      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        id={props.id}
        name={props.name}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  );
};

const styles = {
  style: {
    position: "relative",
    display: "inline-block",
    width: "100%",
    paddingBottom: "12px",
  } as CSSProperties,
  uploadStyle: {
    color: "white",
    backgroundColor: "rgb(62, 64, 75)",
    display: "inline-block",
    height: "52px",
    width: "52px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "30px",
  } as CSSProperties,
  labelStyle: {
    display: "inline-block",
    color: "rgb(175, 175, 175)",
    fontFamily: "VisbyRoundCF-DemiBold",
    fontSize: "14px",
    cursor: "pointer",
    position: "absolute",
    top: "18px",
    left: "66px",
  } as CSSProperties,
  inputStyle: {
    backgroundColor: "#3e404b",
    color: "white",
    fontFamily: "VisbyRoundCF-DemiBold",
    outline: "none",
    border: "none",
    borderRadius: "8px",
    padding: "24px 18px 12px 18px",
    width: "100%", // For the padding 18px + 18px
  } as CSSProperties,
};

export default PhotoInput;
