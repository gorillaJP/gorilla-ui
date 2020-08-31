import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileSkills.module.css";
import { Button, Select } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import SkillList from "../../../common/skill-list/SkillList";
const { Option } = Select;

const ProfileSkills = props => {
    const [editMode, setEditMode] = useState(false);
    const [skills, setSkills] = useState([]);

    const addNewSkills = () => {
        setEditMode(true);
    };

    useEffect(() => {
        const uniqueSet = new Set();
        const newSkillArray = props.skills && props.skills.length ? [...skills, ...props.skills] : [...skills];
        newSkillArray.forEach(item => uniqueSet.add(item));
        setSkills([...uniqueSet]);
    }, [props.skills]);

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Skills</span>
                {props.skills && props.skills.length && (
                    <span
                        className={commonStyles.editorIcon}
                        onClick={() => {
                            setEditMode(!editMode);
                        }}
                    >
                        <FormOutlined />
                    </span>
                )}
            </div>
            {!editMode ? (
                <div className={commonStyles.detailBlock}>{skills && <SkillList skills={skills} outLined />}</div>
            ) : (
                <div className={commonStyles.addNew}>
                    <div className={styles.skillSelect}>
                        <Select
                            mode="multiple"
                            size="large"
                            placeholder="Required Skills"
                            value={props.skills}
                            onChange={value => {
                                setSkills([...value]);
                            }}
                        >
                            <Option value="react">React</Option>
                            <Option value="angular">Angular</Option>
                            <Option value="redux">Redux</Option>
                            <Option value="word">Word</Option>
                            <Option value="photoshop">Photoshop</Option>
                            <Option value="php">Php</Option>
                        </Select>
                    </div>
                    <div className={commonStyles.buttonContainer}>
                        <Button size="large">Save</Button>
                    </div>
                </div>
            )}
            {!editMode && (
                <div className={props.languages && props.languages.length ? commonStyles.addMore : ""}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => addNewSkills()}
                    />
                    <span className={commonStyles.textButton}>
                        <Button type="link" onClick={() => addNewSkills()}>{`Add ${
                            props.skills && props.skills.length ? "More " : "Your"
                        } Skills`}</Button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProfileSkills;
