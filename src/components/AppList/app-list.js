import React from "react";
import PropTypes from "prop-types";

import "./app-list.scss";

function AppList(props) {
    const { items } = props;
    return (
        <div className="app-list">
            <ul>
                {items && items.map((item, index) => <ListItem key={index} />)}
            </ul>
        </div>
    );
}

const ListItem = () => {
    return (
        <li>ListItem</li>
    );
}

AppList.propTypes = {
    items: PropTypes.array
}

export default AppList;