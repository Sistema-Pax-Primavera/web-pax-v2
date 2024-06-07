import React from "react";
import PropTypes from "prop-types";

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  label,
  display,
  alignItens,
  justifyContent,
  conteudo,
}) => {
  const styles = {
    width: width,
    height: height,
    objectFit: "cover",
    display: display,
    alignItens: alignItens,
    justifyContent: justifyContent,
  };

  return (
    <div style={styles}>
      <img src={src} alt={alt} style={styles} />
      {label && <label>{conteudo}</label>}
    </div>
  );
};

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string, // Nome da propriedade para a label
  labelText: PropTypes.string, // Texto para a label
};

ImageComponent.defaultProps = {
  width: "100%",
  height: "auto",
};

export default ImageComponent;
