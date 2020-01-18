import React from "react";
import { Row } from "antd";
import SearchComp from "../search-comp/SearchComp";

const AdvanceSearch = props => {
    return (
        <div>
            <div>
                <Row>
                    <SearchComp />
                </Row>
            </div>
        </div>
    );
};

export default AdvanceSearch;
