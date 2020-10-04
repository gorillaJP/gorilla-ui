import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileAwards.module.css";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import moment from "moment";

import { saveAward, deleteAward } from "../../../../api/ProfileApi";
import NewAward from "./NewAward";

const ProfileAward = props => {
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        const newAwardsStateArray = [];
        for (const award of props.awards) {
            const awardInCurrentAwardsArray = awards.find(item => {
                return item._id === award._id;
            });

            if (awardInCurrentAwardsArray) {
                newAwardsStateArray.push(awardInCurrentAwardsArray);
            } else {
                newAwardsStateArray.push(award);
            }
        }

        // sort based on order value
        newAwardsStateArray.sort((a, b) => a.order - b.order);

        const newAwardsArray = awards.filter(item => {
            return item._id.includes("temp-");
        });

        setAwards([...newAwardsStateArray, ...newAwardsArray]);
    }, [props.awards]);

    const addNewAward = () => {
        const newAward = {
            _id: `temp-${new Date().getTime()}`,
            name: "",
            date: "",
            details: "",
            order: awards.length + 1,
            edit: true
        };

        setAwards([...awards, newAward]);
    };

    const enableEdit = id => {
        updateAttributeOfAwardObj(id, "edit", true);
    };

    const onChange = award => {
        const currentIndex = getArrayIndexInAwardsArray(award._id);

        if (currentIndex > -1) {
            const newAwardsArray = [...awards];
            newAwardsArray[currentIndex] = award;
            setAwards(newAwardsArray);
        }
    };

    const onCancel = award => {
        const currentIndex = getArrayIndexInAwardsArray(award._id);

        if (currentIndex > -1) {
            const newAwardsArray = [...awards];
            if (award._id.includes("temp-")) {
                newAwardsArray.splice(currentIndex, 1);
            } else {
                newAwardsArray[currentIndex] = award;
            }

            setAwards([...newAwardsArray]);
        }
    };

    const onDelete = async id => {
        props.startLoad();
        const response = await deleteAward(id, props.token);
        props.endLoad();
        if (response && response.data) {
            const currentIndex = getArrayIndexInAwardsArray(id);
            if (currentIndex > -1) {
                const newAwardsArray = [...awards];
                newAwardsArray.splice(currentIndex, 1);
                setAwards(newAwardsArray);
            }
        } else {
            // Show error
        }
    };

    const onSave = async id => {
        props.startLoad();
        const awardObj = awards.find(item => {
            return item._id === id;
        });

        if (!awardObj) {
            return;
        }

        const award = { ...awardObj };

        const hasErrors = checkAwardObject(award);

        if (!hasErrors) {
            // Remove temp attributes
            delete award.showError;
            delete award.edit;

            if (id.includes("temp-")) {
                delete award._id;
            }

            const response = await saveAward([award], props.token);

            props.endLoad();
            if (response && response.data) {
                updateAttributeOfAwardObj(id, "edit", false);
                updateAttributeOfAwardObj(id, "showError", false);

                if (id.includes("temp-")) {
                    const currentIndex = getArrayIndexInAwardsArray(id);
                    if (currentIndex > -1) {
                        const newAwardsArray = [...awards];
                        newAwardsArray.splice(currentIndex, 1);
                        setAwards(newAwardsArray);
                    }
                }

                props.updateProfile(response.data);
            } else {
                // Show error
            }
        } else {
            props.endLoad();
            updateAttributeOfAwardObj(id, "showError", true);
        }
    };

    const updateAttributeOfAwardObj = (id, key, value) => {
        const newAwardsArray = [...awards];
        const currentIndex = getArrayIndexInAwardsArray(id);

        if (currentIndex > -1) {
            newAwardsArray[currentIndex][key] = value;
            setAwards(newAwardsArray);
        }
    };

    const getArrayIndexInAwardsArray = id => {
        return awards.findIndex(item => {
            return item._id === id;
        });
    };

    const checkAwardObject = award => {
        if (!award.name || !award.date) {
            return true;
        } else {
            return false;
        }
    };

    const getFormattedDate = date => {
        if (date) {
            return moment(date).format("DD MMM, YYYY");
        }

        return "";
    };

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Work Award</span>
            </div>
            {awards &&
                awards.map((award, i) => {
                    return (
                        <>
                            {!award.edit ? (
                                <>
                                    <div className={commonStyles.detailBlock}>
                                        <div>
                                            <span className={styles.name}>{award.name}</span>
                                            <span
                                                className={commonStyles.editorIcon}
                                                onClick={() => {
                                                    enableEdit(award._id);
                                                }}
                                            >
                                                <FormOutlined />
                                            </span>
                                        </div>

                                        <span className={styles.date}>{getFormattedDate(award.date)}</span>
                                        <div className={styles.description}>{award.details}</div>
                                    </div>
                                    {props.awards.length > i + 1 && <Divider />}
                                </>
                            ) : (
                                <>
                                    {props.awards.length === i && i !== 0 && <Divider />}
                                    <NewAward
                                        award={award}
                                        onChange={onChange}
                                        onDelete={onDelete}
                                        onSave={onSave}
                                        onCancel={onCancel}
                                    />
                                    {props.awards.length > i + 1 && <Divider />}
                                </>
                            )}
                        </>
                    );
                })}
            <div className={awards && awards.length ? commonStyles.addMore : ""}>
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
                    >{`Add ${awards && awards.length ? "More " : ""} Award`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileAward;
