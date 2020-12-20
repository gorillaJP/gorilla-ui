import React from "react";

const styles = {
    otherDetails: {
        margin: "5px auto"
    }
};

const MinMax = props => {
    let { minVal, maxVal, label, unit } = props;
    if (minVal && maxVal) {
        return (
            <div style={styles.otherDetails}>
                {!props.noText && <>{label} :</>} {minVal}
                {unit} - {maxVal}
                {unit}
            </div>
        );
    } else if (minVal && !maxVal) {
        return (
            <div style={styles.otherDetails}>
                {!props.noText && <>{label} : Minimum</>} {minVal}
                {unit}
            </div>
        );
    } else if (!minVal && maxVal) {
        return (
            <div style={styles.otherDetails}>
                {!props.noText && <>{label} : Maximum</>} {maxVal}
                {unit}
            </div>
        );
    } else {
        return <div />;
    }
};

export default MinMax;
