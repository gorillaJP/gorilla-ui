import React from 'react';
import { Menu, Radio } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';

export default props => {
    const radioStyle = {
        display: 'block',
        height: '20px',
        lineHeight: '20px'
    };

    const [selected, setSelected] = useState();

    useEffect(() => {
        if (props.onChange) {
            props.onChange(selected);
        }
    }, [selected]);

    return (
        <Menu>
            {props.data
                .sort((a, b) => {
                    if (a.order && b.order) {
                        return parseInt(a.order) > parseInt(b.order) ? 1 : -1;
                    } else {
                        return a.name > b.name ? 1 : -1;
                    }
                })
                .map(entry => {
                    return (
                        <Menu.Item>
                            <Radio.Group
                                value={selected}
                                onChange={e => {
                                    setSelected(e.target.value);
                                }}
                            >
                                <Radio style={radioStyle} value={entry.value !== undefined ? entry.value : entry.name}>
                                    {entry.name}
                                </Radio>
                            </Radio.Group>
                        </Menu.Item>
                    );
                })}
        </Menu>
    );
};
