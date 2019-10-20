import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import withLazyLoad from "./lazy-load";
import StarRating from "../Star/star";

// actions
import { fetchDetail } from "./actions";

// styles
import "./app-list.scss";

function ListItem(props) {
    const { app, fetchDetail } = props;

    // React.useEffect(() => {
    //     if (app.id && !app.ratingCount) {
    //         fetchDetail(app.id);
    //     }
    // }, [app.id, app.ratingCount]);

    return (
        <li className="list-item">
            <div className="rank">{app.rank || ""}</div>
            <div className="app">
                <img className="icon" src={app.artworkUrl100 || ""} alt={app.name || ""} />
                <div className="detail">
                    <span className="name">{app.name || ""}</span>
                    <span className="category">{ app.genres && app.genres.length > 0 ? app.genres.map(category => category.name)[0] : ""}</span>
                    {/* <div className="rating">
                        <div className="star-rating">
                            {
                                app.avgRating && (
                                    <StarRating totalStars={5} numOfSelectedStars={Math.floor(app.avgRating)} />
                                )
                            }
                        </div>
                        <span className="count">{`(${app.ratingCount || "--"})`}</span>
                    </div> */}
                </div>
            </div>
            <a href={app.url || ""} target="_blank" rel="noopener noreferrer" />
        </li>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetail: bindActionCreators(fetchDetail, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(withLazyLoad(ListItem));