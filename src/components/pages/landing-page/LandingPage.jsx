import React, { useEffect, useState } from "react";
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
import { setSelectedJobId, updateSearchParam } from "../../../actions/JobActions";
import { useHistory } from "react-router-dom";
import JobPostMessageCard from "../../common/cards/job-post-message-card/JobPostMessageCard";
import { useWindowWidth } from "../../../custom-hooks/UseWindowWidth";

const LandingPage = props => {
    const history = useHistory();
    const windowWidth = useWindowWidth();

    const [slidesToShow, setSlidesToShow] = useState(10);

    useEffect(() => {
        props.actions.getTopHiringCompanies();
        props.actions.getFeaturedJobs();
        props.actions.getJobsByCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.actions]);

    useEffect(() => {
        if (windowWidth < 1200) {
            if (windowWidth < 400) {
                setSlidesToShow(2);
            } else if (windowWidth < 490) {
                setSlidesToShow(3);
            } else if (windowWidth < 768) {
                setSlidesToShow(4);
            } else if (windowWidth < 1024) {
                setSlidesToShow(6);
            } else {
                setSlidesToShow(8);
            }
        }
    }, [windowWidth]);

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
                    <Carousel
                        slidesToShow={slidesToShow}
                        swipeToSlide
                        swipe
                        infinite
                        accessibility
                        arrows
                        autoplay
                        frameOverflow="hidden"
                    >
                        {props.topHiringCompanies &&
                            props.topHiringCompanies.map(company => {
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
                            {props.featuredJobs &&
                                props.featuredJobs.map(job => {
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
                                            onSelect={() => {
                                                const newSearchParam = {
                                                    q: job.title,
                                                    location: [job.location],
                                                    type: job.type
                                                };
                                                props.actions.updateSearchParam(newSearchParam);
                                                props.actions.setSelectedJobId(job._id);
                                                history.push("/job-details/search");
                                            }}
                                        />
                                    );
                                })}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <div className={styles.header}>Job by Category</div>
                        <div className={styles.featuredIndustries}>
                            {props.jobsByCategory &&
                                props.jobsByCategory.length &&
                                props.jobsByCategory.map(category => {
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
            <div className={styles.jobPostMessageContainer}>
                <JobPostMessageCard />
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getTopHiringCompanies: bindActionCreators(getTopHiringCompanies, dispatch),
            getFeaturedJobs: bindActionCreators(getFeaturedJobs, dispatch),
            getJobsByCategory: bindActionCreators(getJobsByCategory, dispatch),
            setSelectedJobId: bindActionCreators(setSelectedJobId, dispatch),
            updateSearchParam: bindActionCreators(updateSearchParam, dispatch)
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
