import React from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileSkills.module.css";
import { Button } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import SkillList from "../../../common/skill-list/SkillList";

const ProfileSkills = props => {
    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Skills</span>
                {props.skills && props.skills.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            <div className={commonStyles.detailBlock}>
                {props.skills && <SkillList skills={props.skills} outLined />}
            </div>
            <div className={props.languages && props.languages.length ? commonStyles.addMore : ""}>
                <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
                <span className={commonStyles.textButton}>
                    <Button type="link">{`Add ${
                        props.skills && props.skills.length ? "More " : "Your"
                    } Skills`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileSkills;
