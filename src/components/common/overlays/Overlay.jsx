import React from "react";

const wrapper = {
    position: "relative"
};

const overlayStyle = {
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 599999,
    height: "100%"
};

const Overlay = props => {
    let styles = { ...wrapper, ...props.styles };
    if (props.show) {
        return (
            <div style={styles}>
                <div style={overlayStyle}></div>
            </div>
        );
    } else {
        return null;
    }
};

export default Overlay;
