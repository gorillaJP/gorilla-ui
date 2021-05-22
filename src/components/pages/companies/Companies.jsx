import React, { useEffect, useState } from "react";
import AlphabetPaginator from "../../common/alphabet-paginator/AlphabetPaginator";
import { Container } from "../../common/container/Container";
import { getCompanies } from "../../../api/MatrixApi";
import * as styles from "./Companies.module.css";
import CompanyCard from "../../common/cards/company-card/CompanyCard";
import { bindActionCreators } from "redux";
import { loadingFinished, loadingStarted } from "../../../actions/CommonActions";
import { connect } from "react-redux";

const Companies = props => {
    const [filterByLetter, setFilterByLetter] = useState("");
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchData = async filterLetter => {
            props.actions.loadingStarted();
            const data = await getCompanies(filterLetter, props.token);
            setCompanies(data);
            props.actions.loadingFinished();
        };

        if (filterByLetter && props.token) {
            fetchData();
        }
    }, [filterByLetter, props.token, props.actions]);

    return (
        <div className={styles.companyWrapper}>
            <Container>
                <span className={styles.header}>Company Profiles</span>
                <span className={styles.subHeader}>Filter By</span>
                <div className={styles.paginatorWrapper}>
                    <AlphabetPaginator
                        onClick={letter => {
                            setFilterByLetter(letter);
                        }}
                    />
                </div>
                <div>
                    {companies.map((companyData, i) => {
                        return (
                            <div key={i}>
                                <CompanyCard company={companyData.company} />
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.authData.token,
        domain: state.metaData.domain
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            loadingStarted: bindActionCreators(loadingStarted, dispatch),
            loadingFinished: bindActionCreators(loadingFinished, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
