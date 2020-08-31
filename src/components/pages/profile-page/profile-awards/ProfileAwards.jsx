import React, { useState } from "react";
import { Button, Input, Divider } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileAwards.module.css";
import FormLabel from "../../../common/form-label/FormLabel";
import TextArea from "antd/lib/input/TextArea";

const NewAward = props => {
    return (
        <div className={commonStyles.addNew}>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Name" required={true} />
                <Input />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Date" required={true} />
                <Input />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Description" />
                <TextArea rows={5} />
            </div>
            <div className={commonStyles.buttonContainer}>
                <Button size="large">Delete</Button>
                <Button size="large">Save</Button>
            </div>
        </div>
    );
};

const ProfileAwards = props => {
    const [newAwards, addNewAwards] = useState([]);

    const addNewAward = () => {
        const newAward = {
            name: "",
            date: "",
            detail: ""
        };

        addNewAwards([...newAwards, newAward]);
    };

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Awards And Achievements</span>
                {props.awards && props.awards.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            {props.awards &&
                props.awards.map((award, i) => {
                    return (
                        <>
                            <div className={commonStyles.detailBlock}>
                                <span className={styles.awardName}>{award.name}</span>
                                <span className={styles.awardDate}>{award.date}</span>
                                <span className={styles.description}>{award.detail}</span>
                            </div>
                            {props.award.length > i + 1 && <Divider />}
                        </>
                    );
                })}
            {newAwards &&
                newAwards.map((award, i) => {
                    return (
                        <>
                            {(props.award && props.award.length > 0) || i > 0 ? <Divider /> : ""}
                            <NewAward award={award} />
                        </>
                    );
                })}
            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => {
                    addNewAward();
                }}
            />
            <span className={commonStyles.textButton}>
                <Button
                    type="link"
                    onClick={() => {
                        addNewAward();
                    }}
                >
                    Add Awards And Achievements
                </Button>
            </span>
        </div>
    );
};

export default ProfileAwards;
