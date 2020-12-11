import { Radio } from "antd";
import React, { useState } from "react";

import * as styles from "./Questionnaire.module.css";

const SingleSelect = props => {
    const [selectedValue, setSelectedValue] = useState("");
    const onSelect = e => {
        setSelectedValue(e.target.value);
        props.onAnswer(props.question._id, e.target.value);
    };

    return (
        <div className={styles.question}>
            {props.number ? <span className={styles.questionNumber}>{props.number}</span> : null}
            <span>{props.question.desc}</span>
            <div className={styles.singleAnswerQuestions}>
                <Radio.Group onChange={onSelect} value={selectedValue}>
                    {props.question.answerOptions.map(answer => {
                        return (
                            <Radio value={answer.desc} key={answer._id}>
                                {answer.desc}
                            </Radio>
                        );
                    })}
                </Radio.Group>
            </div>
        </div>
    );
};

export default SingleSelect;
