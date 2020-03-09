import React from 'react';
import { Menu, Checkbox } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import shortId from 'shortid';
//Popualtes dropdown options
export default props => {
    const [selectedList, setSelected] = useState([]);

    useEffect(() => {
        if (props.onChange) {
            props.onChange(selectedList);
        }
    }, [selectedList]);

    return (
        <Menu>
            {props.data
                .sort((a, b) => {
                    if (a.order && b.order) {
                        return a.order > b.order ? 1 : -1;
                    } else {
                        return a.name > b.name ? 1 : -1;
                    }
                })
                .map(entry => {
                    return (
                        <Menu.Item key={shortId.generate()}>
                            <Checkbox.Group value={selectedList}>
                                <Checkbox
                                    onChange={e => {
                                        if (e.target.checked) {
                                            let newArr = [...selectedList, e.target.value];
                                            setSelected(newArr);
                                        } else {
                                            let newArr = selectedList.filter(en => en && en !== e.target.value);
                                            setSelected(newArr);
                                        }
                                    }}
                                    value={entry.name}
                                >
                                    {entry.name}
                                </Checkbox>
                            </Checkbox.Group>
                        </Menu.Item>
                    );
                })}
        </Menu>
    );
};
