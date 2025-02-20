import React from "react";

// Inline CSS for the loader
const loaderStyles = {
  loader: {
    border: "8px solid #f3f3f3", // Light grey
    borderTop: "8px solid #3498db", // Blue
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite",
  },
  spinnerWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
};

// CSS keyframes for spinning animation
const styleSheet = document.styleSheets[0] || document.createElement("style");
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

const Loader = () => {
  return (
    <div style={loaderStyles.spinnerWrapper}>
      <div style={loaderStyles.loader}></div>
    </div>
  );
};

export default Loader;