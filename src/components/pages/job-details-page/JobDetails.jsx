import React, { useState, useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Empty, Row, Col, Pagination } from "antd";

import AdvanceJobSearch from "../../common/job-search/advance-search/AdvanceJobSearch";
import styles from "./JobDetails.module.css";
import JobAddCard from "../../common/cards/job-add-card/JobAddCard";
import { searchJobs, updateSearchParam } from "../../../actions/JobActions";
import JobDetailsCard from "../../common/job-details-card/JobDetailsCard";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "../../../custom-hooks/UseQuery";
import { capitalizeFirstLetter, areEqualArrays } from "../../../util/Util";

// Create the queryString based on the parameters
const convertParamsToQueryString = params => {
    const { type, q, location } = params;
    const queryStringParts = [];

    if (type.length) {
        queryStringParts.push(
            `type=${type
                .join(",")
                .toLowerCase()
                .replace(" ", "-")}`
        );
    }

    if (q) {
        queryStringParts.push(`query=${q}`);
    }

    if (location.length) {
        queryStringParts.push(
            `location=${location
                .join(",")
                .toLowerCase()
                .replace(" ", "-")}`
        );
    }

    if (queryStringParts.length) {
        return `?${queryStringParts.join("&")}`;
    } else {
        return "";
    }
};

const JobDetails = props => {
    //selected job reference is at state. The selected Id is shared between multiple searches.
    //If the selected jobId is available in the new search as well (after searching)
    //That job will be
    const [selectedJobAddId, setSelectedJobId] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [leftPanelInitialHeight, setLeftPanelInitialHeight] = useState(0);
    const [leftPanelHeight, setLeftPanelHeight] = useState(0);
    const [tempParams, setTempParams] = useState({
        type: props.searchParams.type,
        location: props.searchParams.location,
        q: props.searchParams.q
    });
    const queryString = useQuery();
    const history = useHistory();

    const leftPanel = useRef(null);
    const rightPanel = useRef(null);

    const { searchJobs } = props.actions;

    // check the query string and update search params in initial load
    useEffect(() => {
        const type = queryString.get("type")
            ? queryString
                  .get("type")
                  .replace("-", " ")
                  .split(",")
            : [];
        const location = queryString.get("location")
            ? queryString
                  .get("location")
                  .replace("-", " ")
                  .split(",")
            : [];
        const q = queryString.get("query");

        const updatedParams = { ...props.searchParams };
        if (type) {
            const typeSanitized = type.map(typeVal => {
                return capitalizeFirstLetter(typeVal);
            });
            updatedParams.type = typeSanitized;
        }
        if (location) {
            const locationSanitized = location.map(locVal => {
                return capitalizeFirstLetter(locVal);
            });
            updatedParams.location = locationSanitized;
        }
        if (q) {
            updatedParams.q = q;
        } else {
            updatedParams.q = "";
        }

        if (
            !areEqualArrays(updatedParams.type, tempParams.type) ||
            !areEqualArrays(updatedParams.location, tempParams.location) ||
            updatedParams.q != tempParams.q
        ) {
            // update the search params if the new params and the old params are different
            setTempParams({
                type: updatedParams.type,
                location: updatedParams.location,
                q: updatedParams.q
            });
            props.actions.updateSearchParam(updatedParams);
        }
    }, [queryString]);

    // If the job list contains the selected jobId => show that job
    //otehrwise show first job
    let jobToShow = undefined;
    if (selectedJobAddId !== undefined) {
        const jobToShowList = props.jobAdds.filter(e => e._id === selectedJobAddId);
        if (jobToShowList.length > 0) {
            jobToShow = jobToShowList[0];
        } else {
            setSelectedJobId(undefined);
        }
    } else {
        jobToShow = props.jobAdds.length > 0 ? props.jobAdds[0] : undefined;
    }

    useEffect(() => {
        var elmnt = document.getElementById(props.selectedJobId);
        if (elmnt) {
            elmnt.scrollIntoView();
        }

        setSelectedJobId(props.selectedJobId);
    }, [props.selectedJobId]);

    useEffect(() => {
        if (currentPage !== 1) {
            const params = { ...props.searchParams };
            params.offset = (currentPage - 1) * params.limit;
            searchJobs(params);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        // change browser url if the new params and previous params are different
        if (
            !areEqualArrays(tempParams.type, props.searchParams.type) ||
            !areEqualArrays(tempParams.location, props.searchParams.location) ||
            tempParams.q !== props.searchParams.q
        ) {
            setTempParams({
                type: props.searchParams.type,
                location: props.searchParams.location,
                q: props.searchParams.q
            });
            const queryString = convertParamsToQueryString(props.searchParams);
            history.replace(history.location.pathname + queryString);
        }
    }, [props.searchParams]);

    useEffect(() => {
        if (rightPanel.current && leftPanel.current) {
            const rightDivHeight = rightPanel.current.getBoundingClientRect().height;
            const leftDivHeight = leftPanel.current.getBoundingClientRect().height;

            if (leftPanelInitialHeight === 0) {
                setLeftPanelInitialHeight(leftDivHeight);
            }

            if (rightDivHeight > leftDivHeight) {
                setLeftPanelHeight(rightDivHeight);
            } else {
                setLeftPanelHeight(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobToShow]);

    return (
        <div className={styles.jobDetailsPageWrapper}>
            <div>
                <AdvanceJobSearch />
            </div>
            <Row className={styles.jobDetailsWrapper}>
                <Col xs={24} sm={24} md={24} lg={8} className={styles.leftPannel}>
                    <div
                        ref={leftPanel}
                        style={{ height: leftPanelHeight ? `${leftPanelHeight}px` : `${leftPanelInitialHeight}px` }}
                    >
                        {props.jobAdds.map(job => {
                            return (
                                <JobAddCard
                                    jobTitle={job.title}
                                    company={job.company}
                                    location={job.location}
                                    key={job._id}
                                    onSelect={key => {
                                        setSelectedJobId(key);
                                    }}
                                    skills={job.skills}
                                    salaryMin={job.salaryMin}
                                    salarymax={job.salarymax}
                                    selected={jobToShow && jobToShow._id === job._id} //highlight the tile, for the job which is displayed
                                    jobId={job._id}
                                />
                            );
                        })}
                        {!props.jobAdds.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        {props.jobAdds.length ? (
                            <div className={styles.paginationContainer}>
                                <Pagination
                                    defaultCurrent={1}
                                    hideOnSinglePage
                                    defaultPageSize={props.jobLimitPerPage}
                                    total={props.totalAdds}
                                    current={currentPage}
                                    responsive
                                    onChange={pageNumber => {
                                        setCurrentPage(pageNumber);
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} className={styles.rightPanel}>
                    {jobToShow ? (
                        <div ref={rightPanel}>
                            <JobDetailsCard job={jobToShow} ref={rightPanel} />
                        </div>
                    ) : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span>
                                    We haven't found exactly you are looking for. Please change the query and try
                                </span>
                            }
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            searchJobs: bindActionCreators(searchJobs, dispatch),
            updateSearchParam: bindActionCreators(updateSearchParam, dispatch)
        }
    };
};

const mapStateToProps = state => {
    return {
        jobAdds: state.jobData.jobList,
        totalAdds: state.jobData.total,
        jobLimitPerPage: state.searchParams.limit,
        searchParams: state.searchParams,
        selectedJobId: state.jobData.selectedJobId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
