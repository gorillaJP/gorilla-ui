import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import styles from "./AddPromoCard.module.css";

const AddPromoCard = props => {
    return (
        <div className={styles.card}>
            <div className={styles.messageSection}>
                <span className={styles.title}>{props.title}</span>
                <span className={styles.messageOne}>{props.messageOne}</span>
                <span className={styles.messageTwo}>{props.messageTwo}</span>
            </div>
            <Link to={props.linkPath} className={styles.linkButton}>
                {props.linkText}
            </Link>
        </div>
    );
};

AddPromoCard.propTypes = {
    title: PropTypes.string.isRequired,
    messageOne: PropTypes.string.isRequired,
    messageTwo: PropTypes.string,
    linkPath: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired
};

export default AddPromoCard;
