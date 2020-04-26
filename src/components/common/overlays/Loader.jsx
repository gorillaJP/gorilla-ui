import React from "react";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const wrapper = {
    position: "relative"
};

const overlayStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 599999,
    cursor: "pointer",
    userSelect: "none"
};

const spinHolder = {
    position: "relative",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    marginLeft: "-40px",
    marginTop: "-50px"
};

const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#fff" }} spin />;

class Loader extends React.Component {
    render() {
        if (this.props.loading) {
            return (
                <div style={wrapper}>
                    <div style={overlayStyle}>
                        <div style={spinHolder}>
                            <Spin indicator={antIcon} tip="Loading" style={{ color: "#fff" }} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        loading: state.commonData.loading
    };
};

export default connect(mapStateToProps)(Loader);
