import { Modal } from "antd";
import React from "react";
import ApplyJob from "../ApplyJob";

const EasyApply = props => {
    return (
        <Modal visible={props.show} width={800} footer={null} onCancel={props.onCancel}>
            <ApplyJob job={props.job} onComplete={props.onOk} />
        </Modal>
    );
};

export default EasyApply;
