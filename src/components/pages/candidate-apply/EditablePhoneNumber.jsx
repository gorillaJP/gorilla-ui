import React, { useEffect, useState } from "react";
import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button, Input } from "antd";
import { MOBILE_NUMBER } from "../../../constants/AppConstants";
import * as commonStyles from "./CandidateApply.module.css";

const EditablePhoneNumber = props => {
    const [value, setValue] = useState("");
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!editMode) {
            setValue(props.value);
        }
    }, [props.value, editMode]);

    const setEdit = value => {
        if (props.onEnableEdit) {
            props.onEnableEdit(value);
        }

        setEditMode(value);
    };
    return (
        <>
            {editMode && value !== undefined ? (
                <div>
                    <Input
                        value={value}
                        onChange={e => {
                            setValue(e.target.value);
                        }}
                        onBlur={() => {
                            setEdit(false);
                            props.onBlur(value);
                        }}
                        placeholder={MOBILE_NUMBER}
                    />
                </div>
            ) : value ? (
                <div>
                    <span
                        onDoubleClick={() => {
                            setEdit(true);
                        }}
                    >
                        {value}
                    </span>
                    <span>
                        <FormOutlined
                            onClick={() => {
                                setEdit(true);
                            }}
                        />
                    </span>
                </div>
            ) : (
                <div className={commonStyles.addNew}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined style={{ fontSize: "12px" }} />}
                        size="small"
                        onClick={() => {
                            setValue("");
                            setEdit(true);
                        }}
                    />
                    <Button
                        type="link"
                        onClick={() => {
                            setValue("");
                            setEdit(true);
                        }}
                    >
                        Add your phone number to reach
                    </Button>
                </div>
            )}
        </>
    );
};

EditablePhoneNumber.propTypes = {
    value: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    setEdit: PropTypes.func
};

export default EditablePhoneNumber;
