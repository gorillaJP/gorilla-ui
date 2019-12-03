import React from "react";
import { Menu, Dropdown } from "antd";

const DropDownContent = items => {
    return <Menu>{items.map(item => item)}</Menu>;
};

const DropDown = props => {
    return (
        <Dropdown>
            {props.children}
            <DropDownContent></DropDownContent>
        </Dropdown>
    );
};

export default DropDown;
