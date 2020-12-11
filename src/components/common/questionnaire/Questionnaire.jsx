import React, { useEffect, useState } from "react";
import { SINGLE_SELECT, MULTI_SELECT } from "../../../constants/AppConstants";
import Essay from "./Essay";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";
import * as styles from "./Questionnaire.module.css";

const Questionnaire = props => {
    const [answers, setAnswers] = useState();

    useEffect(() => {
        if (props.questionnaire.questions) {
            setAnswers(props.questionnaire);
        }
    }, [props.questionnaire]);

    const onAnswer = (questionId, answer) => {
        const questionIndex = answers.questions.findIndex(question => {
            return question._id === questionId;
        });

        const newAnswers = { ...answers };
        answers.questions[questionIndex].answer = answer;
        setAnswers(newAnswers);
        props.onChange(newAnswers);
    };

    const components = {
        SingleSelect: SingleSelect,
        MultiSelect: MultiSelect,
        Essay: Essay
    };

    return (
        <div>
            <div className={styles.title}>{props.title}</div>
            {props.questionnaire.questions &&
                props.questionnaire.questions.map((question, index) => {
                    let tagName = "";
                    if (question.type === SINGLE_SELECT) {
                        tagName = "SingleSelect";
                    } else if (question.type === MULTI_SELECT) {
                        tagName = "MultiSelect";
                    } else {
                        tagName = "Essay";
                    }

                    const QuestionComp = components[tagName];
                    return (
                        <QuestionComp
                            number={props.showNumber ? index + 1 : undefined}
                            question={question}
                            onAnswer={onAnswer}
                            key={question._id}
                        />
                    );
                })}
        </div>
    );
};

export default Questionnaire;
