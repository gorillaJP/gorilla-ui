import { Input, Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const InputGroup = Input.Group;
const { Option } = Select;

const CurrencyAmount = props => {
    return (
        <InputGroup
            compact
            onBlur={() => {
                props.onBlur();
            }}
        >
            <Input
                value={props.amount}
                onChange={e => {
                    props.onChange("amount", e.target.value);
                }}
                type="number"
                style={{ display: "inline", width: "60%" }}
            />
            <Select
                defaultValue="LKR"
                style={{ width: "40%" }}
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

CurrencyAmount.propTypes = {
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    onBlur: PropTypes.func
};

export default connect(mapStateToProps)(CurrencyAmount);
