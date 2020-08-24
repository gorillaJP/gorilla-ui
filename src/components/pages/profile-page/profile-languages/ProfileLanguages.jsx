import React from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileLanguages.module.css";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ProfileLanguages = props => {
    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Languages</span>
                {props.languages && props.languages.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            <div className={commonStyles.detailBlock}>
                {props.languages &&
                    props.languages.map(language => {
                        return <li className={styles.language}>{language}</li>;
                    })}
            </div>
            <div className={props.languages && props.languages.length ? commonStyles.addMore : ""}>
                <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
                <span className={commonStyles.textButton}>
                    <Button type="link">{`Add ${
                        props.languages && props.languages.length ? "More " : ""
                    }Languages`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileLanguages;
