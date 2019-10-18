import React from "react";

// styles
import "./app-list.scss";
import "./list-item-skeleton.scss";

const ListItemSkeleton = () => {
    return (
        <li className="list-item">
            <div className="rank"><div className="skeleton" /></div>
            <div className="app">
                <div className="icon"><div className="skeleton" /></div>
                <div className="detail">
                    <span className="name"><div className="skeleton" /></span>
                    <span className="category"><div className="skeleton" /></span>
                    <div className="rating">
                        <span className="count"><div className="skeleton" /></span>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ListItemSkeleton;