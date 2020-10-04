import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileLanguages.module.css";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Checkbox, Row, Col } from "antd";
import { saveLanguages } from "../../../../api/ProfileApi";

const ProfileLanguages = props => {
    const [languages, setLanguages] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!edit) {
            setLanguages(props.languages);
            const metaLanguageArray = props.metaLanguages.map(language => {
                return language.name;
            });
        }
    }, [props.languages, props.metaLanguages]);

    const enableEdit = () => {
        setEdit(true);
    };

    const onCancel = () => {
        setEdit(false);
        setLanguages(props.languages);
    };

    const onChange = checkedList => {
        setLanguages(checkedList);
    };

    const onSave = async () => {
        props.startLoad();
        const response = await saveLanguages(languages, props.token);
        props.endLoad();
        if (response && response.data) {
            props.updateProfile(response.data);
            setEdit(false);
        } else {
            // TODO : show error
        }
    };

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Languages</span>
                {!edit && props.languages && props.languages.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined onClick={enableEdit} />
                    </span>
                )}
            </div>
            {!edit && (
                <div className={commonStyles.detailBlock}>
                    {props.languages &&
                        props.languages.map(language => {
                            return <li className={styles.language}>{language}</li>;
                        })}
                </div>
            )}
            {edit && (
                <div className={commonStyles.addNew}>
                    <Checkbox.Group style={{ width: "100%" }} onChange={onChange} value={languages}>
                        <Row>
                            {props.metaLanguages.map(language => {
                                return (
                                    <Col span={12}>
                                        <Checkbox value={language.name} key={language.name}>
                                            {language.name}
                                        </Checkbox>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Checkbox.Group>
                    <div className={commonStyles.buttonContainer}>
                        <Button size="large" onClick={() => onCancel()}>
                            Cancel
                        </Button>
                        <Button size="large" onClick={() => onSave()}>
                            Save
                        </Button>
                    </div>
                </div>
            )}

            {!edit && (
                <div className={props.languages && props.languages.length ? commonStyles.addMore : ""}>
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
                    <span className={commonStyles.textButton}>
                        <Button type="link" onClick={enableEdit}>{`Add ${
                            props.languages && props.languages.length ? "More " : ""
                        }Languages`}</Button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProfileLanguages;
