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
import { getUserProfile } from "../../../actions/UserAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSessionStorage } from "../../../api/SessionStorage";
import { getLocalStorage } from "../../../api/LocalStorage";
import ProfileLanguages from "./profile-languages/ProfileLanguages";

class ProfilePage extends Component {
    componentDidMount() {
        let token = getSessionStorage("token");

        if (!token) {
            token = getLocalStorage("token");
        }
        this.props.actions.getUserProfile(token);
    }

    render() {
        const { profile } = this.props;
        console.log(profile);
        return (
            <div className={styles.profilePage}>
                <Container>
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
                            imageUrl="http://159.89.161.233:443//upload_ba5949bfcb985f0c482b5e9036466ace1.jpeg"
                            name={`${profile.firstname} ${profile.lastname}`}
                            email={profile.email}
                        />
                    </div>
                    <div>
                        <ProfileResumeSection />
                    </div>
                    <div>
                        <ProfileWorkExperience experiences={profile.experiences} />
                    </div>
                    <div>
                        <ProfileEducation educations={profile.educations} />
                    </div>
                    <div>
                        <ProfileLanguages languages={profile.languages} />
                    </div>
                    <div>
                        <ProfileSkills skills={profile.skills} />
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
            getUserProfile: bindActionCreators(getUserProfile, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
