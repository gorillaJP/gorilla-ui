import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Divider } from "antd";

import AddPromoCard from "../../cards/add-promo-card/AddPromoCard";
import styles from "./SimpleJobSearch.module.css";
import SearchComp from "../search-comp/SearchComp";
import AdvancedSerachModal from "../advance-search/AdvancedJobSearchModal";

const SimpleJobSearch = props => {
    const [jobSearchOpened, setOpenedState] = useState(false);
    const [showAdvnaceSearch, setShowAdvanceSearch] = useState(false);
    return (
        <div className={styles.simpleSearchWrapper}>
            <div className={styles.simpleSeach}>
                <div className={`${styles.searchBox} ${jobSearchOpened ? styles.searchOpened : ""}`}>
                    <span className={styles.searchHeader}>Find jobs with Gorilla...</span>
                    <SearchComp showSearchButton={true} setOpenedState={setOpenedState} from="home" />
                    <Button
                        type="link"
                        className={styles.addvanceSearchBtn}
                        onClick={() => {
                            setShowAdvanceSearch(true);
                        }}
                    >
                        Advanced Search
                    </Button>
                </div>
                <div className={`${styles.actionsBox} ${jobSearchOpened ? styles.searchOpened : ""}`}>
                    <span>Make Your Search Easy</span>
                    <span>Upload your resume</span>
                    <span>Don't have a resume? Build one in 3 steps</span>
                    <div className={styles.uploadResume}>
                        <Button size="large">Upload/Build Resume</Button>
                    </div>
                    <Divider plain style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
                    <span>Free Job Alert</span>
                    <span>Get an Email matching your criteria</span>
                    <span>No Regirstration Required</span>
                    <div className={styles.createJobAlert}>
                        <Button size="large">Create Job Alert</Button>
                    </div>
                </div>
                {showAdvnaceSearch ? <AdvancedSerachModal setShow={setShowAdvanceSearch} /> : null}
            </div>
        </div>
    );
};

export default SimpleJobSearch;
