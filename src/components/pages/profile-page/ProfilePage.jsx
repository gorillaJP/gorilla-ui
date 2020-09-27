import React, { Component } from "react";
import ProfileCompleteness from "./profile-completeness/ProfileCompleteness";
import { Container } from "../../common/container/Container";
import * as styles from "./ProfilePage.module.css";
import { Button } from "antd";
import ProfileMeta from "./profile-meta/ProfileMeta";
import ProfileEducation from "./profile-education/ProfileEducation";
import ProfileSkills from "./profile-skills/ProfileSkills";
import ProfileAwards from "./profile-awards/ProfileAwards";
import ProfileWorkExperience from "./profile-work-experience/ProfileWorkExperience";
import ProfileResumeSection from "./profile-resume-section/ProfileResumeSection";
import ProfilePersonalDetails from "./profile-personal-details/ProfilePersonalDetails";
import ProfileJobPreference from "./profile-job-preference/ProfileJobPreference";
import { getUserProfile, setUserProfile } from "../../../actions/UserAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSessionStorage } from "../../../api/SessionStorage";
import { getLocalStorage } from "../../../api/LocalStorage";
import ProfileLanguages from "./profile-languages/ProfileLanguages";
import { loadingStarted, loadingFinished } from "../../../actions/CommonActions";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        let token = getSessionStorage("token");

        if (!token) {
            token = getLocalStorage("token");
        }
        this.state = {
            token
        };
    }
    componentDidMount() {
        this.props.actions.getUserProfile(this.state.token);
    }

    startLoad = () => {
        this.props.actions.loadingStarted();
    };

    endLoad = () => {
        this.props.actions.loadingFinished();
    };

    updateProfile = profile => {
        this.props.actions.setUserProfile(profile);
    };

    render() {
        const { profile } = this.props;
        return (
            <div className={styles.profilePage}>
                <Container>
                    <div className={styles.profileFlex}>
                        <div className={styles.profileMetaData}>
                            <div className={styles.profileMetaData}>
                                <ProfileCompleteness
                                    completeness={profile.completeness ? profile.completeness.replace("%", "") : 0}
                                />
                                <div className={`${styles.linkButton} ${styles.addSkills}`}>
                                    <Button type="link">+ Add Skills</Button>
                                </div>
                            </div>
                            <div>
                                <ProfileMeta
                                    imageUrl="https://159.89.161.233:443//upload_ba5949bfcb985f0c482b5e9036466ace1.jpeg"
                                    name={`${profile.firstName} ${profile.lastName}`}
                                    email={profile.email}
                                />
                            </div>
                        </div>
                        <div className={styles.profileDetails}>
                            <div>
                                <ProfileResumeSection />
                            </div>
                            <div>
                                <ProfileWorkExperience
                                    experiences={profile.experiences || []}
                                    startLoad={() => this.startLoad()}
                                    endLoad={() => this.endLoad()}
                                    updateProfile={profile => this.updateProfile(profile)}
                                    token={this.state.token}
                                />
                            </div>
                            <div>
                                <ProfileEducation
                                    educations={profile.educations}
                                    startLoad={() => this.startLoad()}
                                    endLoad={() => this.endLoad()}
                                    updateProfile={profile => this.updateProfile(profile)}
                                    token={this.state.token}
                                />
                            </div>
                            <div>
                                <ProfileLanguages languages={profile.languages} />
                            </div>
                            <div>
                                <ProfileSkills
                                    skills={profile.skills}
                                    startLoad={() => this.startLoad()}
                                    endLoad={() => this.endLoad()}
                                    updateProfile={profile => this.updateProfile(profile)}
                                    token={this.state.token}
                                />
                            </div>
                            <div>
                                <ProfileAwards />
                            </div>
                            <div>
                                <ProfilePersonalDetails />
                            </div>
                            <div>
                                <ProfileJobPreference />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        domain: state.metaData.domain,
        profile: state.authData.profile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getUserProfile: bindActionCreators(getUserProfile, dispatch),
            setUserProfile: bindActionCreators(setUserProfile, dispatch),
            loadingStarted: bindActionCreators(loadingStarted, dispatch),
            loadingFinished: bindActionCreators(loadingFinished, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
