/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Button, Row, Col, Input, Steps, Select, DatePicker, Radio, Switch } from "antd";
import styles from "./JobPost.module.css";

import FormLabel from "../../common/form-label/FormLabel";
import Editor from "../../common/editor/Editor.jsx";
import JobDetailsCard from "../../common/job-details-card/JobDetailsCard";
import { saveJobInCache } from "../../../actions/JobActions";

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

class JobPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: "",
            jobTitle: "",
            location: "",
            current: 0,
            jobOverview: "",
            employmentType: "",
            employmentLevel: "",
            companyIndustry: "",
            expireDate: "",
            description: "",
            receiveApplicantPreferrence: "internal",
            expirenceLevel: { minimum: 0, maximum: 0 },
            errors: {}
        };
    }

    componentWillUnmount() {
        this.saveJobInCache();
    }

    saveJobInCache() {
        // Save the current job as a draft in local storage
        const state = { ...this.state };
        delete state.errors;
        saveJobInCache(state);
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

        const formFields = ["company", "jobTitle", "location"];

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
            "jobTitle",
            "location",
            "jobOverview",
            "employmentType",
            "employmentLevel",
            "companyIndustry",
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
                            : "You are almost there"}
                    </span>
                </div>
                <div>
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
                                className={current === 0 ? styles.moveRight : styles.moveLeft}
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
                                        style={this.state.errors.jobTitle ? errorInput : inputStyle}
                                        value={this.state.jobTitle}
                                        onChange={event => {
                                            this.setState({ jobTitle: event.target.value });
                                        }}
                                    />
                                    <Input
                                        size="large"
                                        placeholder="Location"
                                        style={this.state.errors.location ? errorInput : inputStyle}
                                        value={this.state.location}
                                        onChange={event => {
                                            this.setState({ location: event.target.value });
                                        }}
                                    />
                                    <Button
                                        size="large"
                                        style={buttonStyle}
                                        onClick={() => this.validateBasicDetails()}
                                    >
                                        Continue job post
                                    </Button>
                                </div>
                            </Col>
                            <Col
                                xs={22}
                                sm={22}
                                md={22}
                                lg={22}
                                className={current === 1 ? styles.moveRight : styles.moveLeft}
                            >
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
                                                    error={this.state.errors.jobTitle}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="Job Title"
                                                    style={inputFullWidthStyle}
                                                    value={this.state.jobTitle}
                                                    onChange={event => {
                                                        this.setState({ jobTitle: event.target.value });
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
                                                <Input
                                                    size="large"
                                                    placeholder="Location"
                                                    style={inputFullWidthStyle}
                                                    value={this.state.location}
                                                    onChange={event => {
                                                        this.setState({ location: event.target.value });
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24}>
                                            <div style={marginStyle}>
                                                <FormLabel
                                                    name="Job Overview"
                                                    required
                                                    styles={labelStyles}
                                                    error={this.state.errors.jobOverview}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="Job Overview"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ jobOverview: value });
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
                                                        onChange={value => {
                                                            this.setState({
                                                                experienceLevel: {
                                                                    ...this.state.expirenceLevel,
                                                                    minumum: value
                                                                }
                                                            });
                                                        }}
                                                    />
                                                    <Input
                                                        style={secondBox}
                                                        defaultValue={this.state.maximum}
                                                        addonBefore="Maximum : "
                                                        size="large"
                                                        onChange={value => {
                                                            this.setState({
                                                                experienceLevel: {
                                                                    ...this.state.expirenceLevel,
                                                                    maximum: value
                                                                }
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
                                                    error={this.state.errors.employmentType}
                                                />
                                                <Select
                                                    showSearch
                                                    style={inputFullWidthStyle}
                                                    placeholder="Employment Type"
                                                    onChange={value => {
                                                        this.setState({ employmentType: value });
                                                    }}
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
                                                    error={this.state.errors.employmentLevel}
                                                />
                                                <Select
                                                    showSearch
                                                    style={inputFullWidthStyle}
                                                    placeholder="Employment Level"
                                                    onChange={value => {
                                                        this.setState({ employmentLevel: value });
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
                                                    error={this.state.errors.companyIndustry}
                                                />
                                                <Select
                                                    showSearch
                                                    style={inputFullWidthStyle}
                                                    placeholder="Company Industry"
                                                    onChange={value => {
                                                        this.setState({ companyIndustry: value });
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
                                                        onChange={value => {
                                                            this.setState({
                                                                experienceLevel: {
                                                                    ...this.state.salary,
                                                                    minumum: value
                                                                }
                                                            });
                                                        }}
                                                    />
                                                    <Input
                                                        style={secondBox}
                                                        defaultValue={this.state.maximum}
                                                        addonBefore="Maximum : "
                                                        size="large"
                                                        onChange={value => {
                                                            this.setState({
                                                                experienceLevel: {
                                                                    ...this.state.salary,
                                                                    maximum: value
                                                                }
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
                                                        onChange={value => {
                                                            this.setState({ bonus: value });
                                                        }}
                                                    />
                                                    <Select defaultValue="yearly" style={bonusSelect} size="large">
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
                                                        Recommended: Use our free tool to view and manage candidates in
                                                        your account
                                                    </Radio>
                                                    <Input
                                                        size="large"
                                                        placeholder="example@gmail.com"
                                                        style={inputFullWidthStyle}
                                                        disabled={this.state.receiveApplicantPreferrence !== "internal"}
                                                        onChange={value => {
                                                            this.setState({ companyEmail: value });
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
                                                        onChange={value => {
                                                            this.setState({ companyWebsite: value });
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
                            <Col
                                xs={22}
                                sm={22}
                                md={22}
                                lg={22}
                                className={current === 2 ? styles.moveRight : styles.moveLeft}
                            >
                                <div className={styles.moreInfo}>
                                    <JobDetailsCard job={this.state} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className={styles.basicDetailsWrapper}></div>
            </div>
        );
    }
}

export default JobPost;
