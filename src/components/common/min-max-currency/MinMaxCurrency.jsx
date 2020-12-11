import { Input, Select } from "antd";
import React from "react";
import { connect } from "react-redux";

const InputGroup = Input.Group;
const { Option } = Select;

const MinMaxCurrency = props => {
    return (
        <InputGroup
            compact
            onBlur={() => {
                props.onBlur && props.onBlur();
            }}
        >
            <Input
                title="Min Amount"
                value={props.minAmount}
                onChange={e => {
                    props.onChange("minAmount", e.target.value);
                }}
                type="number"
                style={{ display: "inline", width: "35%" }}
            />
            <Input
                title="Max Amount"
                value={props.maxAmount}
                onChange={e => {
                    props.onChange("maxAmount", e.target.value);
                }}
                type="number"
                style={{ display: "inline", width: "35%" }}
            />
            <Select
                defaultValue="LKR"
                style={{ width: "25%" }}
                value={props.currency}
                onChange={value => {
                    props.onChange("currency", value);
                }}
            >
                {props.metaCurrencies.map(currency => {
                    return (
                        <Option key={currency.name} value={currency.name}>
                            {currency.name}
                        </Option>
                    );
                })}
            </Select>
        </InputGroup>
    );
};
const mapStateToProps = state => {
    return {
        metaCurrencies: state.metaData.metaCurrencies
    };
};

export default connect(mapStateToProps)(MinMaxCurrency);
