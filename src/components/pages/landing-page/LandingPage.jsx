import React, { useEffect } from "react";
import { Row, Carousel, Col } from "antd";

import SimpleJobSearch from "../../common/job-search/simple-search/SimpleJobSearch";
import LandingPageCoverImage from "../../../images/landingpage-cover.png";
import styles from "./LandingPage.module.css";
import { Container } from "../../common/container/Container";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTopHiringCompanies, getFeaturedJobs, getJobsByCategory } from "../../../actions/MatrixActions";
import JobAddCard from "../../common/cards/job-add-card/JobAddCard";
import config from "../../../util/config";

const LandingPage = props => {
    useEffect(() => {
        props.actions.getTopHiringCompanies();
        props.actions.getFeaturedJobs();
        props.actions.getJobsByCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={styles.homepageWrapper}>
            <div className={styles.searchBoxWrapper} style={{ backgroundImage: `url(${LandingPageCoverImage})` }}>
                <div className={styles.jobSearchWrapper}>
                    <Container>
                        <SimpleJobSearch />
                    </Container>
                </div>
            </div>
            <Container>
                <div className={styles.carouselContainer}>
                    <Carousel slidesToShow={10} swipeToSlide swipe infinite accessibility arrows>
                        {props.topHiringCompanies.map(company => {
                            return (
                                <div key={company.companyid}>
                                    <img
                                        alt={company.key}
                                        src={`${config.remote}/${company.logo}`}
                                        width="80"
                                        height="80"
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            </Container>
            <Container>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <div className={styles.header}>Featured Jobs</div>
                        <div className={styles.featuredJobContainer}>
                            {props.featuredJobs.map(job => {
                                return (
                                    <JobAddCard
                                        jobTitle={job.title}
                                        company={job.company}
                                        location={job.location}
                                        key={job._id}
                                        skills={job.skills}
                                        salaryMin={job.salaryMin}
                                        salarymax={job.salarymax}
                                        jobId={job._id}
                                    />
                                );
                            })}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <div className={styles.header}>Job by Category</div>
                        <div className={styles.featuredIndustries}>
                            {props.jobsByCategory.map(category => {
                                return (
                                    <div
                                        className={styles.categoryLinks}
                                    >{`${category.key} (${category.doc_count})`}</div>
                                );
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getTopHiringCompanies: bindActionCreators(getTopHiringCompanies, dispatch),
            getFeaturedJobs: bindActionCreators(getFeaturedJobs, dispatch),
            getJobsByCategory: bindActionCreators(getJobsByCategory, dispatch)
        }
    };
};

const mapStateToProps = state => {
    return {
        topHiringCompanies: state.matrixData.topHiringCompanies,
        featuredJobs: state.matrixData.featuredJobs,
        jobsByCategory: state.matrixData.jobsByCategory
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
