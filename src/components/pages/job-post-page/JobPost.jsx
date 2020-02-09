/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Button, Row, Col, Input, Steps, message, Form } from "antd";
import styles from "./JobPost.module.css";

import FormLabel from "../../common/form-label/FormLabel";

const inputStyle = { margin: "15px", width: "90%" };
const inputFullWidthStyle = { ...inputStyle, width: "100%", margin: "5px" };
const marginStyle = { margin: "5px" };
const labelStyles = { margin: "5px", display: "block" };
const buttonStyle = { ...inputStyle, backgroundColor: "#c0c00c", color: "#383838", fontWeight: "bold" };

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
            errors: {}
        };
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
        if (state.company) {
            state.errors = { ...state.errors, company: true };
        }

        if (state.jobTitle) {
            state.errors = { ...state.errors, jobTitle: true };
        }

        if (state.location) {
            state.errors = { ...state.errors, location: true };
        }

        if (state.company && state.jobTitle && state.location) {
            state.errors = { ...state.errors, company: false, jobTitle: false, location: false };
            this.next();
        } else {
            this.setState({ errors: state.errors });
        }
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
                                        style={inputStyle}
                                        value={this.state.company}
                                        onChange={event => {
                                            this.setState({ company: event.target.value });
                                        }}
                                    />
                                    <Input
                                        size="large"
                                        placeholder="Job Title"
                                        style={inputStyle}
                                        value={this.state.jobTitle}
                                        onChange={event => {
                                            this.setState({ jobTitle: event.target.value });
                                        }}
                                    />
                                    <Input
                                        size="large"
                                        placeholder="Location"
                                        style={inputStyle}
                                        value={this.state.location}
                                        onChange={event => {
                                            this.setState({ location: event.target.value });
                                        }}
                                    />
                                    <Button size="large" style={buttonStyle} onClick={() => this.next()}>
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
                                                    error={this.state.errors.requiredSkills}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="Required Skills"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ requiredSkills: value });
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <div style={marginStyle}>
                                                <FormLabel
                                                    name="Experience Level"
                                                    required
                                                    styles={labelStyles}
                                                    error={this.state.errors.experienceLevel}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="Experience Level"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ experienceLevel: value });
                                                    }}
                                                />
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
                                                <Input
                                                    size="large"
                                                    placeholder="Employment Type"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ employmentType: value });
                                                    }}
                                                />
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
                                                <Input
                                                    size="large"
                                                    placeholder="Employment Level"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ employmentLevel: value });
                                                    }}
                                                />
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
                                                <Input
                                                    size="large"
                                                    placeholder="Company Industry"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ companyIndustry: value });
                                                    }}
                                                />
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
                                                <Input
                                                    size="large"
                                                    placeholder="Expire Date"
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
                                                    required
                                                    styles={labelStyles}
                                                    error={this.state.errors.salary}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="Salary"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ salary: value });
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12}>
                                            <div style={marginStyle}>
                                                <FormLabel
                                                    name="Bonus"
                                                    required
                                                    styles={labelStyles}
                                                    error={this.state.errors.bonus}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="Bonus"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ bonus: value });
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24}>
                                            <div style={marginStyle}>
                                                <FormLabel
                                                    name="Job Description"
                                                    required
                                                    styles={labelStyles}
                                                    error={this.state.errors.jobDescription}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="Job Description"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ jobDescription: value });
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24}>
                                            <div style={marginStyle}>
                                                <FormLabel
                                                    name="Company Email"
                                                    required
                                                    styles={labelStyles}
                                                    error={this.state.errors.companyEmail}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="example@gmail.com"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ companyEmail: value });
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24}>
                                            <div style={marginStyle}>
                                                <FormLabel
                                                    name="Career site"
                                                    required
                                                    styles={labelStyles}
                                                    error={this.state.errors.companyWebsite}
                                                />
                                                <Input
                                                    size="large"
                                                    placeholder="https://example.com/careers"
                                                    style={inputFullWidthStyle}
                                                    onChange={value => {
                                                        this.setState({ companyWebsite: value });
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div style={marginStyle}>
                                        <Button size="large" style={inputFullWidthStyle} onClick={() => this.next()}>
                                            Continue job post
                                        </Button>
                                    </div>
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
