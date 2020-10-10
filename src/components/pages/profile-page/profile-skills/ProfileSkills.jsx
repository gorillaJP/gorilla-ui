import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileSkills.module.css";
import { Button, Select, message } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import SkillList from "../../../common/skill-list/SkillList";
import { saveSkills } from "../../../../api/ProfileApi";
const { Option } = Select;

const ProfileSkills = props => {
    const [editMode, setEditMode] = useState(false);
    const [skills, setSkills] = useState([]);

    const addNewSkills = () => {
        setEditMode(true);
    };

    const triggerApiCall = async () => {
        props.startLoad();
        const response = await saveSkills(skills, props.token);
        props.endLoad();
        if (response && response.data) {
            props.updateProfile(response.data);
            setEditMode(false);
            message.success("Skills updated");
        } else {
            message.error("Error updating skills");
        }
    };

    const onCancel = () => {
        setEditMode(false);
        setSkills(props.skills);
    };

    useEffect(() => {
        if (!editMode) {
            setSkills(props.skills);
        }
    }, [props.skills]);

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Skills</span>
                {!editMode && props.skills && props.skills.length && (
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
                            value={skills}
                            onChange={value => {
                                setSkills([...value]);
                            }}
                        >
                            {props.metaSkills.map(skill => {
                                return (
                                    <Option key={skill.name} value={skill.name}>
                                        {skill.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className={commonStyles.buttonContainer}>
                        <Button size="large" onClick={() => onCancel()}>
                            Cancel
                        </Button>
                        <Button
                            size="large"
                            onClick={() => {
                                triggerApiCall();
                            }}
                        >
                            Save
                        </Button>
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
