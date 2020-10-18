import React, { useEffect } from "react";
import RedirectTo from "../../common/redirect-to/RedirectTo";
import { useQuery } from "../../../custom-hooks/UseQuery";
import { bindActionCreators } from "redux";
import { signInWithToken } from "../../../actions/UserAction";
import { connect } from "react-redux";

const SuccessLogin = props => {
    const queryString = useQuery();
    useEffect(() => {
        const jwtToken = queryString.get("jwt");
        props.actions.signInWithToken(jwtToken);
    });

    if (props.token) {
        return <RedirectTo to="" />;
    } else {
        return null;
    }
};
const mapStateToProps = state => {
    return {
        token: state.authData.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            signInWithToken: bindActionCreators(signInWithToken, dispatch)
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuccessLogin);
