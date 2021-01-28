import { Space, Table, Input } from "antd";
import React from "react";
import CategoryMatrix from "../../common/category-matrix/CategoryMatrix";
import { Container } from "../../common/container/Container";
import * as styles from "./Dashboard.module.css";

const { Search } = Input;

const EmployerDashboard = () => {
    const categories = [
        { count: 10, displayText: "Inprogress Jobs", key: "inprogress" },
        { count: 10, displayText: "Draft Jobs", key: "draft" },
        { count: 10, displayText: "Expired Jobs", key: "expired" },
        { count: 10, displayText: "Deleted Jobs", key: "deleted" },
        { count: 10, displayText: "Pending to Publish", key: "pending" }
    ];

    const columns = [
        {
            title: "Reference ID",
            dataIndex: "referenceIndex",
            key: "referenceIndex",
            sorter: (a, b) => a.referenceId.localeCompare(b.referenceId)
        },
        {
            title: "Job Title",
            dataIndex: "jobTitle",
            key: "jobTitle",
            sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle)
        },
        {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            sorter: (a, b) => a.createdBy.localeCompare(b.createdBy)
        },
        {
            title: "Created Date",
            dataIndex: "createdDate",
            key: "createdDate",
            sorter: (a, b) => a.createdDate.localeCompare(b.createdDate)
        },
        {
            title: "Expired Date",
            dataIndex: "expiredDate",
            key: "expiredDate",
            sorter: (a, b) => a.expiredDate.localeCompare(b.expiredDate)
        },
        {
            title: "Candidates",
            dataIndex: "candidates",
            key: "candidates",
            sorter: (a, b) => a.candidates.localeCompare(b.candidates)
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            )
        }
    ];

    return (
        <Container>
            <div className={styles.categoryContainer}>
                <CategoryMatrix
                    categories={categories}
                    onClick={category => {
                        console.log(category);
                    }}
                />
            </div>
            <div className={styles.searchContainer}>
                <Search
                    placeholder="Search By Reference ID"
                    onSearch={value => {
                        console.log(value);
                    }}
                    style={{ width: 250 }}
                />
            </div>
            <Table
                columns={columns}
                pagination={{ position: "bottomRight", defaultPageSize: 10, hideOnSinglePage: true, responsive: true }}
            />
        </Container>
    );
};

export default EmployerDashboard;
