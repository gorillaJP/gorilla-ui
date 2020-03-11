import React from "react";

import { createMarkUp } from "../../../util";

const HighLightedText = props => {
    if (props.highlightText) {
        const regex = new RegExp(props.highlightText, "ig");
        const newTextStr = props.text.replace(regex, `<b>${props.highlightText}</b>`);
        return <span dangerouslySetInnerHTML={createMarkUp(newTextStr)}></span>;
    } else {
        return <span>{props.text}</span>;
    }
};

export default HighLightedText;
