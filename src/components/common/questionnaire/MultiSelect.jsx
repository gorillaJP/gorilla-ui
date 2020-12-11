import { Select } from "antd";
import React, { useState } from "react";

import * as styles from "./Questionnaire.module.css";

const { Option } = Select;

const MultiSelect = props => {
    const [selectedValue, setSelectedValue] = useState([]);
    const onSelect = value => {
        setSelectedValue(value);
        props.onAnswer(props.question._id, value);
    };

    return (
        <div className={styles.question}>
            {props.number ? <span className={styles.questionNumber}>{props.number}</span> : null}
            <span className={styles.questionTitle}>{props.question.desc}</span>
            <Select
                placeholder="Select Your Answer"
                onChange={value => {
                    onSelect(value);
                }}
                value={selectedValue}
                mode="multiple"
                className={styles.multiSelect}
            >
                {props.question.answerOptions.map(answer => {
                    return (
                        <Option value={answer.desc} key={answer._id}>
                            {answer.desc}
                        </Option>
                    );
                })}
            </Select>
        </div>
    );
};

export default MultiSelect;
