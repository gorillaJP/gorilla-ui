/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Row, Col, Input, Steps, Select, DatePicker, Radio, Switch, Modal, AutoComplete } from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";

import FormLabel from "../../common/form-label/FormLabel";
import Editor from "../../common/editor/Editor.jsx";
import JobDetailsCard from "../../common/job-details-card/JobDetailsCard";
import { saveJobInCache, getJobInCache, clearJobInCache } from "../../../actions/JobActions";
import { loadingStarted, loadingFinished } from "../../../actions/CommonActions";
import { metaAPI } from "../../../api/AutoCompleteApi";
import { postJob } from "../../../api/JobApi";
import { JOB_POST_IN_PROGRESS, JOB_POST_SUCCESS, JOB_POST_FAILED } from "../../../constants/AppConstants";
import styles from "./JobPost.module.css";

const inputStyle = { margin: "15px", width: "90%" };
const errorInput = { ...inputStyle, border: "1px solid red" };
const inputFullWidthStyle = { ...inputStyle, width: "100%", margin: "5px" };
const marginStyle = { margin: "5px", minHeight: "86px" };
const labelStyles = { margin: "5px", display: "block" };
const buttonStyle = { ...inputStyle, backgroundColor: "#c0c00c", color: "#383838", fontWeight: "bold" };
const firstBox = { width: "50%", marginTop: "5px", marginBottom: "5px" };
const secondBox = { width: "50%", marginTop: "5px", marginBottom: "5px" };
const bonusInput = { width: "75%", margin: "5px 0 5px 0" };
const bonusSelect = { width: "25%", margin: "5px 0 5px 0" };
const editorStyles = { margin: "5px" };
const switchStyles = { marginLeft: "10px" };

const InputGroup = Input.Group;
const { Option } = Select;
const { Step } = Steps;
const steps = [
    {
        title: "",
        step: 0
    },
    {
        title: "",
        step: 1
    },
    {
        title: "",
        step: 2
    }
];
const dateFormat = "YYYY/MM/DD";
const newStateObj = {
    company: "",
    title: "",
    location: "",
    current: 0,
    overview: "",
    type: "",
    level: "",
    industry: "",
    expireDate: "",
    description: "",
    receiveApplicantPreferrence: "internal",
    experiencemin: "",
    experiencemax: "",
    salaryMin: "",
    salarymax: "",
    showDraftJobModal: false,
    areaSuggestions: [],
    errors: {},
    jobPostStatus: ""
};

const NavigateHomeButton = withRouter(({ history }) => (
    <Button
        onClick={() => {
            history.push("/");
        }}
    >
        Cancel
    </Button>
));

class JobPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = newStateObj;
    }

    componentDidMount() {
        let savedJob = getJobInCache();

        // saved job is in string format need to compare that and string version of current state
        let currentState = { ...this.state };
        delete currentState.errors;
        delete currentState.areaSuggestions;
        delete currentState.jobPostStatus;
        delete currentState.showDraftJobModal;

        if (savedJob && savedJob !== JSON.stringify(currentState)) {
            this.setState({ showDraftJobModal: true });
        }

        // Adding the cleanup event to save the job in draft
        window.addEventListener("beforeunload", () => {
            this.saveJobInCache();
        });
    }

    componentWillUnmount() {
        this.saveJobInCache();
    }

    saveJobInCache() {
        // Save the current job as a draft in local storage
        const state = { ...this.state };
        delete state.errors;
        delete state.areaSuggestions;
        delete state.jobPostStatus;
        delete state.showDraftJobModal;

        saveJobInCache(state);
    }

    continuePreviousJobPost() {
        let draftJob = JSON.parse(getJobInCache());

        this.setState({ showDraftJobModal: false, ...draftJob });
    }

    createNewJobPost() {
        this.setState({ ...newStateObj });
        clearJobInCache();
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    validateBasicDetails() {
        const { state } = this;

        const formFields = ["company", "title", "location"];

        for (const field of formFields) {
            if (!state[field]) {
                state.errors[field] = true;
            } else {
                state.errors[field] = false;
            }
        }

        this.setState({ errors: state.errors }, () => {
            if (!this.hasError()) {
                this.next();
            }
        });
    }

    validateAllDetails() {
        const { state } = this;

        // validate single fields using array
        const formFields = [
            "company",
            "title",
            "location",
            "overview",
            "type",
            "level",
            "industry",
            "expireDate",
            "description"
        ];

        for (const field of formFields) {
            if (!state[field]) {
                state.errors[field] = true;
            } else {
                state.errors[field] = false;
            }
        }

        this.setState({ errors: state.errors }, () => {
            if (!this.hasError()) {
                this.saveJobInCache();
                this.next();
            }
        });
    }

    hasError() {
        const { errors } = this.state;

        let errorValues = Object.values(errors);

        return errorValues.includes(true);
    }

    setError(name, value) {}

    postJob() {
        this.props.actions.loadingStarted();
        this.setState({ jobPostStatus: JOB_POST_IN_PROGRESS }, () => {
            const jobPostSuccess = postJob(JSON.parse(getJobInCache()));
            this.props.actions.loadingFinished();
            if (jobPostSuccess) {
                this.setState({ jobPostStatus: JOB_POST_SUCCESS });
            } else {
                this.setState({ jobPostStatus: JOB_POST_FAILED });
            }
        });
    }

    navigateToHome() {}

    render() {
        const { current } = this.state;
        return (
            <div className={styles.jobPostWrapper}>
                <div className={styles.stepperContainer}>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.step} />
                        ))}
                    </Steps>
                </div>
                <div className={styles.jobPostHeader}>
                    <span>
                        {current === 0
                            ? "Post your job with Gorilla to find the person you want to hire"
                            : current === 1
                            ? "Explain more on what you want"
                            : "This is how the job post look"}
                    </span>
                </div>
                <div className={styles.basicDetailsWrapper}>
                    <Row
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginRight: "0",
                            marginLeft: "0"
                        }}
                        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}
                    >
                        <Col
                            xs={22}
                            sm={18}
                            md={12}
                            lg={8}
                            // className={current === 0 ? styles.moveRight : styles.moveLeft}
                            style={{ display: current === 0 ? "block" : "none" }}
                        >
                            <div className={styles.basicDetails}>
                                <Input
                                    size="large"
                                    placeholder="Company"
                                    style={this.state.errors.company ? errorInput : inputStyle}
                                    value={this.state.company}
                                    onChange={event => {
                                        this.setState({ company: event.target.value });
                                    }}
                                />
                                <Input
                                    size="large"
                                    placeholder="Job Title"
                                    style={this.state.errors.title ? errorInput : inputStyle}
                                    value={this.state.title}
                                    onChange={event => {
                                        this.setState({ title: event.target.value });
                                    }}
                                />
                                <AutoComplete
                                    size="large"
                                    placeholder="Location"
                                    style={this.state.errors.location ? errorInput : inputStyle}
                                    value={this.state.location}
                                    onChange={val => {
                                        this.setState({ location: val });
                                    }}
                                    onSelect={value => {
                                        this.setState({ location: value });
                                    }}
                                    dataSource={this.props.metaCities.filter(e => e && e.name).map(e => e.name)}
                                />
                                <Button size="large" style={buttonStyle} onClick={() => this.validateBasicDetails()}>
                                    Continue job post
                                </Button>
                            </div>
                        </Col>
                        <Col xs={22} sm={22} md={22} lg={22} style={{ display: current === 1 ? "block" : "none" }}>
                            <div className={styles.moreInfo}>
                                <Row>
                                    <Col xs={22} sm={20} md={8} lg={8}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Company"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.company}
                                            />
                                            <Input
                                                size="large"
                                                placeholder="Company"
                                                style={inputFullWidthStyle}
                                                value={this.state.company}
                                                onChange={event => {
                                                    this.setState({ company: event.target.value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Job Title"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.title}
                                            />
                                            <Input
                                                size="large"
                                                placeholder="Job Title"
                                                style={inputFullWidthStyle}
                                                value={this.state.title}
                                                onChange={event => {
                                                    this.setState({ title: event.target.value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Location"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.location}
                                            />
                                            <AutoComplete
                                                size="large"
                                                placeholder="Location"
                                                style={inputFullWidthStyle}
                                                value={this.state.location}
                                                onSearch={value => {
                                                    this.setState({ location: value });
                                                    metaAPI("allcities", value).then(res => {
                                                        this.setState({ areaSuggestions: res.data.payload });
                                                    });
                                                }}
                                                onSelect={value => {
                                                    this.setState({ location: value });
                                                }}
                                                dataSource={this.state.areaSuggestions}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Job Overview"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.overview}
                                            />
                                            <Input
                                                size="large"
                                                placeholder="Job Overview"
                                                style={inputFullWidthStyle}
                                                value={this.state.overview}
                                                onChange={event => {
                                                    this.setState({ overview: event.target.value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Required Skills"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.skills}
                                            />
                                            <Select
                                                mode="multiple"
                                                size="large"
                                                placeholder="Required Skills"
                                                style={inputFullWidthStyle}
                                                value={this.state.skills}
                                                onChange={value => {
                                                    this.setState({ skills: value });
                                                }}
                                            >
                                                <Option value="react">React</Option>
                                                <Option value="angular">Angular</Option>
                                                <Option value="redux">Redux</Option>
                                                <Option value="word">Word</Option>
                                                <Option value="photoshop">Photoshop</Option>
                                                <Option value="php">Php</Option>
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Experience Level"
                                                styles={labelStyles}
                                                error={this.state.errors.experienceLevel}
                                            />
                                            <InputGroup compact style={inputFullWidthStyle}>
                                                <Input
                                                    style={firstBox}
                                                    defaultValue={this.state.minimum}
                                                    addonBefore="Minumum : "
                                                    size="large"
                                                    value={this.state.experiencemin}
                                                    onChange={event => {
                                                        this.setState({
                                                            experiencemin: event.target.value
                                                        });
                                                    }}
                                                />
                                                <Input
                                                    style={secondBox}
                                                    defaultValue={this.state.maximum}
                                                    addonBefore="Maximum : "
                                                    size="large"
                                                    value={this.state.experiencemax}
                                                    onChange={event => {
                                                        this.setState({
                                                            experienceMax: event.target.value
                                                        });
                                                    }}
                                                />
                                            </InputGroup>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Employement Type"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.type}
                                            />
                                            <Select
                                                showSearch
                                                style={inputFullWidthStyle}
                                                placeholder="Employment Type"
                                                onChange={value => {
                                                    this.setState({ type: value });
                                                }}
                                                value={this.state.type}
                                                size="large"
                                            >
                                                <Option value="permanent">Permanent</Option>
                                                <Option value="contract">Contract</Option>
                                                <Option value="parttime">Part Time</Option>
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Employment Level"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.level}
                                            />
                                            <Select
                                                showSearch
                                                style={inputFullWidthStyle}
                                                placeholder="Employment Level"
                                                value={this.state.level}
                                                onChange={value => {
                                                    this.setState({ level: value });
                                                }}
                                                size="large"
                                            >
                                                <Option value="associate">Associate</Option>
                                                <Option value="senior">Senior</Option>
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Company Industry"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.industry}
                                            />
                                            <Select
                                                showSearch
                                                style={inputFullWidthStyle}
                                                placeholder="Company Industry"
                                                value={this.state.industry}
                                                onChange={value => {
                                                    this.setState({ industry: value });
                                                }}
                                                size="large"
                                            >
                                                <Option value="it">IT</Option>
                                                <Option value="electircal">Electrical</Option>
                                                <Option value="mechanical">Mechanical</Option>
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Expire Date"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.expireDate}
                                            />
                                            <DatePicker
                                                size="large"
                                                style={inputFullWidthStyle}
                                                value={
                                                    this.state.expireDate
                                                        ? moment(this.state.expireDate, dateFormat)
                                                        : null
                                                }
                                                onChange={value => {
                                                    this.setState({ expireDate: value });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Salary"
                                                styles={labelStyles}
                                                error={this.state.errors.salary}
                                            />
                                            <InputGroup compact style={inputFullWidthStyle}>
                                                <Input
                                                    style={firstBox}
                                                    defaultValue={this.state.minimum}
                                                    addonBefore="Minumum : "
                                                    size="large"
                                                    value={this.state.salaryMin}
                                                    onChange={event => {
                                                        this.setState({
                                                            salaryMin: event.target.value
                                                        });
                                                    }}
                                                />
                                                <Input
                                                    style={secondBox}
                                                    defaultValue={this.state.maximum}
                                                    addonBefore="Maximum : "
                                                    size="large"
                                                    value={this.state.salarymax}
                                                    onChange={event => {
                                                        this.setState({
                                                            salarymax: event.target.value
                                                        });
                                                    }}
                                                />
                                            </InputGroup>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="Bonus"
                                                styles={labelStyles}
                                                error={this.state.errors.bonus}
                                            />
                                            <InputGroup compact style={inputFullWidthStyle}>
                                                <Input
                                                    size="large"
                                                    placeholder="Bonus"
                                                    style={bonusInput}
                                                    value={this.state.bonus}
                                                    onChange={event => {
                                                        this.setState({ bonus: event.target.value });
                                                    }}
                                                />
                                                <Select
                                                    defaultValue="yearly"
                                                    onChange={value => {
                                                        this.setState({ bonusType: value });
                                                    }}
                                                    value={this.state.bonusType}
                                                    style={bonusSelect}
                                                    size="large"
                                                >
                                                    <Option value="yearly">Yearly</Option>
                                                    <Option value="quaterly">Quaterly</Option>
                                                </Select>
                                            </InputGroup>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                        <div style={editorStyles}>
                                            <FormLabel
                                                name="Job Description"
                                                required
                                                styles={labelStyles}
                                                error={this.state.errors.description}
                                            />
                                            <label style={labelStyles}>
                                                We found a matching job description from our database. Save time by
                                                editing the description
                                                <Switch style={switchStyles} />
                                            </label>
                                            <Editor
                                                style={inputFullWidthStyle}
                                                placeholder="Job Description"
                                                value={this.state.description}
                                                onChange={html => {
                                                    this.setState({ description: html });
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                        <div style={marginStyle}>
                                            <FormLabel
                                                name="How would you like to receive your applicants ?"
                                                styles={labelStyles}
                                            />
                                            <Radio.Group
                                                onChange={event => {
                                                    this.setState({
                                                        receiveApplicantPreferrence: event.target.value
                                                    });
                                                }}
                                                value={this.state.receiveApplicantPreferrence}
                                                style={inputFullWidthStyle}
                                            >
                                                <Radio size="large" value="internal">
                                                    Recommended: Use our free tool to view and manage candidates in your
                                                    account
                                                </Radio>
                                                <Input
                                                    size="large"
                                                    placeholder="example@gmail.com"
                                                    style={inputFullWidthStyle}
                                                    disabled={this.state.receiveApplicantPreferrence !== "internal"}
                                                    value={this.state.notifyEmail}
                                                    onChange={event => {
                                                        this.setState({ notifyEmail: event.target.value });
                                                    }}
                                                />
                                                <br />
                                                <Radio size="large" value="external">
                                                    Direct applicant to external site to apply
                                                </Radio>
                                                <Input
                                                    size="large"
                                                    placeholder="https://example.com/careers"
                                                    style={inputFullWidthStyle}
                                                    disabled={this.state.receiveApplicantPreferrence !== "external"}
                                                    value={this.state.redirectURL}
                                                    onChange={event => {
                                                        this.setState({ redirectURL: event.target.value });
                                                    }}
                                                />
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                </Row>
                                <div style={marginStyle}>
                                    <Button
                                        size="large"
                                        style={inputFullWidthStyle}
                                        onClick={() => this.validateAllDetails()}
                                    >
                                        Continue job post
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={22} sm={22} md={22} lg={22} style={{ display: current === 2 ? "block" : "none" }}>
                            <div className={styles.moreInfo}>
                                <JobDetailsCard job={this.state} />
                                <div className={styles.buttonContainer}>
                                    <div className={styles.actionButtons}>
                                        <Button
                                            onClick={() => {
                                                this.prev();
                                            }}
                                        >
                                            Previous
                                        </Button>
                                    </div>
                                    <div className={styles.actionButtons}>
                                        <Button
                                            onClick={() => {
                                                this.postJob();
                                            }}
                                        >
                                            Post Job
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="Unfinished job post ?"
                    visible={this.state.showDraftJobModal}
                    onOk={() => {
                        this.continuePreviousJobPost();
                    }}
                    onCancel={() => {
                        this.createNewJobPost();
                    }}
                >
                    You have an unfinished job post. Press Ok to continue or cancel to create new one.
                </Modal>
                <Modal
                    title="Job Post Complete"
                    visible={this.state.jobPostStatus === JOB_POST_SUCCESS}
                    footer={[
                        <NavigateHomeButton key="cancel" />,
                        <Button
                            key="Create New"
                            onClick={e => {
                                this.createNewJobPost();
                            }}
                        >
                            Create New
                        </Button>
                    ]}
                >
                    You have successfully created a new job post. Click <b>Create New</b> to create a new Job or{" "}
                    <b>Cancel</b> to navigate to home page
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        metaCities: state.metaData.metaCities
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            loadingStarted: bindActionCreators(loadingStarted, dispatch),
            loadingFinished: bindActionCreators(loadingFinished, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPost);
