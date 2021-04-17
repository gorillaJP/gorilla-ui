import React from "react";
import * as styles from "./CompanyCard.module.css";
import config from "../../../../util/config";
import { Link } from "react-router-dom";
import { Button } from "antd";

const CompanyCard = props => {
    return (
        <div className={styles.companyCardContainer}>
            <img src={`${config.remote}${props.company.logo}`} className={styles.banner} />
            <div className={styles.content}>
                <img src={`${config.remote}${props.company.logo}`} className={styles.logo} />
                <span className={styles.companyName}>{props.company.name}</span>
                <Link to={`/job-details/search?query=${props.company.name}`} className={styles.activeJobs}>
                    {props.company.jobcount} active jobs
                </Link>
                <Button type="primary" className={styles.viewCompanyProfileBtn}>
                    View Company Profile
                </Button>
            </div>
        </div>
    );
};

export default CompanyCard;
