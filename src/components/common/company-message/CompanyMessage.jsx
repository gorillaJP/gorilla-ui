import React, { useState } from "react";
import EasyApply from "../../pages/candidate-apply/easy-apply/EasyApply";
import * as styles from "./CompanyMessage.module.css";

const CompanyMessage = props => {
    const [showEasyApply, setShowEasyApply] = useState(false);
    return (
        <div className={styles.message}>
            {/* <EasyApply
                onCancel={() => {
                    setShowEasyApply(false);
                }}
                onOk={() => {
                    setShowEasyApply(false);
                }}
                show={showEasyApply}
                job={props.job}
            /> */}
            {props.message}
            <div>
                {/* {props.job.isPitchRequired ? (
                    <a href={`/candidate/apply/${props.job._id}`} target="blank">
                        <Button type="primary">Apply</Button>
                    </a>
                ) : (
                    <Button
                        type="primary"
                        onClick={() => {
                            setShowEasyApply(true);
                        }}
                        className={styles.easyApplyBtn}
                    >
                        Easy Apply
                    </Button>
                )} */}
            </div>
        </div>
    );
};

export default CompanyMessage;
