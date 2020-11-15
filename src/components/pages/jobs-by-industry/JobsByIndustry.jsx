import React from "react";
import { connect } from "react-redux";

import { getJobsByIndustry } from "../../../actions/MatrixActions";
import { bindActionCreators } from "redux";
import JobsByCategory from "../../common/jobs-by-category/JobsByCategory";

class JobsByIndustry extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getJobsByIndustry();
    }

    render() {
        return <JobsByCategory header="Jobs By Industry" categoryData={this.props.jobsByIndustry}></JobsByCategory>;
    }
}

const mapStateToProps = state => {
    return {
        jobsByIndustry: state.matrixData.jobsByIndustry
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getJobsByIndustry: bindActionCreators(getJobsByIndustry, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsByIndustry);
