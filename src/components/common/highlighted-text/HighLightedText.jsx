import React from "react";

import { createMarkUp } from "../../../util";

const HighLightedText = props => {
    const regex = new RegExp(`^${props.highlightText}`, "i");
    if (props.highlightText && regex.test(props.text)) {
        const newTextStr = `${props.highlightText}<b>${props.text.replace(regex, "")}</b>`;
        return <span dangerouslySetInnerHTML={createMarkUp(newTextStr)}></span>;
    } else {
        return <span>{props.text}</span>;
    }
};

export default HighLightedText;
