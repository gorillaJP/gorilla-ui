import React from "react";
import { connect } from "react-redux";

import { getJobsByLocation } from "../../../actions/MatrixActions";
import { bindActionCreators } from "redux";
import JobsByCategory from "../../common/jobs-by-category/JobsByCategory";

class JobsByLocation extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getJobsByLocation();
    }

    render() {
        return <JobsByCategory header="Jobs By Location" categoryData={this.props.jobsByLocation}></JobsByCategory>;
    }
}

const mapStateToProps = state => {
    return {
        jobsByLocation: state.matrixData.jobsByLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getJobsByLocation: bindActionCreators(getJobsByLocation, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsByLocation);
