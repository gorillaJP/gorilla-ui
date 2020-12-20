import React from "react";

import * as styles from "./JobsByCategory.module.css";
import { Container } from "../container/Container";
import { Link } from "react-router-dom";

const CategorySection = props => {
    return (
        <div className={styles.sectionWrapper}>
            <div className={styles.sectionHeader}>{props.header}</div>
            <div>
                {props.data.map(item => {
                    return (
                        <Link
                            to={`job-details/search?q=${item.key}`}
                            className={styles.link}
                        >{`${item.key} (${item.count})`}</Link>
                    );
                })}
            </div>
        </div>
    );
};

const JobsByCategory = props => {
    return (
        <div className={styles.jobsByIndustryWrapper}>
            <Container>
                <div className={styles.pageHeader}>{props.header}</div>
                {props.categoryData.map(category => {
                    return <CategorySection header={category.key} data={category.value}></CategorySection>;
                })}
            </Container>
        </div>
    );
};

export default JobsByCategory;
