import React, { useEffect, useState } from "react";
import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button } from "antd";
import CurrencyAmount from "../../common/curreny-amount/CurrencyAmount";
import * as commonStyles from "./CandidateApply.module.css";

const EditableExpectedSalary = props => {
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("");
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!editMode) {
            setAmount(props.amount);
        }
    }, [props.amount, editMode]);

    useEffect(() => {
        if (!editMode) {
            setCurrency(props.currency);
        }
    }, [props.currency, editMode]);

    const setEdit = value => {
        if (props.onEnableEdit) {
            props.setEdit(value);
        }

        setEditMode(value);
    };
    return (
        <>
            {editMode && amount !== undefined ? (
                <CurrencyAmount
                    amount={amount}
                    currency={currency}
                    onBlur={async () => {
                        setEdit(false);
                        props.onBlur(amount, currency);
                    }}
                    onChange={(key, value) => {
                        if (key === "amount") {
                            setAmount(value);
                        } else {
                            setCurrency(value);
                        }
                    }}
                />
            ) : amount ? (
                <>
                    <span
                        onDoubleClick={() => {
                            setEdit(true);
                        }}
                    >
                        {amount}
                        {currency}
                    </span>
                    <span>
                        <FormOutlined
                            onClick={() => {
                                setEdit(true);
                            }}
                        />
                    </span>
                </>
            ) : (
                <div className={commonStyles.addNew}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined style={{ fontSize: "12px" }} />}
                        size="small"
                        onClick={() => {
                            setAmount("");
                            setEdit(true);
                        }}
                    />
                    <Button
                        type="link"
                        onClick={() => {
                            setAmount("");
                            setEdit(true);
                        }}
                    >
                        Add your expected salary
                    </Button>
                </div>
            )}
        </>
    );
};

EditableExpectedSalary.propTypes = {
    amount: PropTypes.string,
    currency: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    setEdit: PropTypes.func
};

export default EditableExpectedSalary;
