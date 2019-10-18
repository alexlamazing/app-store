import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// components
import ListItem from "./list-item";
import ListItemSkeleton from "./list-item-skeleton";

// actions
import { fetchFreeApp } from "./actions";

// styles
import "./app-list.scss";

function AppList(props) {
    const { apps, isFetching, fetchFreeApp } = props;
    React.useEffect(() => {
        fetchFreeApp();
    }, [fetchFreeApp]);
    return (
        <div className="app-list">
            <div className="content">
                {
                    isFetching && (
                        <ul>
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                            <ListItemSkeleton />
                        </ul>
                    )
                }
                <ul>
                    {apps && apps.map((app, index) => <ListItem key={index} index={index + 1} app={app} />)}
                </ul>
            </div>
        </div>
    );
}

AppList.propTypes = {
    apps: PropTypes.array,
    isFetching: PropTypes.bool,
    fetchFreeApp: PropTypes.func
}

const mapStateToProps = state => {
    const { apps, isFetching } = state.topFree;
    return { apps, isFetching }
}

export default connect(mapStateToProps, { fetchFreeApp })(AppList);