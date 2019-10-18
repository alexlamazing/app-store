import React from "react";

// styles
import "./app-recommend.scss";
import "./list-item-skeleton.scss";

const ListItemSkeleton = () => {
    return (
        <li className="list-item">
            <div className="icon"><div className="skeleton" /></div>
            <div className="name"><div className="skeleton" /></div>
            <div className="category"><div className="skeleton" /></div>
        </li>
    );
}

export default ListItemSkeleton;