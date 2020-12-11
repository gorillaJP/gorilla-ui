import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";

import * as styles from "./Questionnaire.module.css";

const DescriptiveAnswerQuestion = props => {
    const [value, setValue] = useState("");
    const onChange = value => {
        setValue(value);
        props.onAnswer(props.question._id, value);
    };

    return (
        <div className={styles.question}>
            {props.number ? <span className={styles.questionNumber}>{props.number}</span> : null}
            <span>{props.question.desc}</span>
            <div>
                <TextArea
                    rows={7}
                    value={value}
                    onChange={e => {
                        onChange(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default DescriptiveAnswerQuestion;
