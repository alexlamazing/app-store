import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// components
import ListItem from "./list-item";
import ListItemSkeleton from "./list-item-skeleton";

// actions
import { fetchFreeApp, filterFreeApp } from "./actions";

// styles
import "./app-list.scss";

function AppList(props) {
    const { apps, appsFiltered, isFetching, keyword, fetchFreeApp, filterFreeApp } = props;
    React.useEffect(() => {
        fetchFreeApp();
    }, []);
    React.useEffect(() => {
        filterFreeApp(keyword);
    }, [keyword]);
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
                    {
                        keyword.length === 0
                        ? apps && apps.map((app, index) => <ListItem key={index} index={index + 1} app={app} />)
                        : appsFiltered && appsFiltered.map((app, index) => <ListItem key={index} index={index + 1} app={app} />)
                    }
                </ul>
            </div>
        </div>
    );
}

AppList.propTypes = {
    apps: PropTypes.array,
    appsFiltered: PropTypes.array,
    isFetching: PropTypes.bool,
    fetchFreeApp: PropTypes.func,
    keyword: PropTypes.string
}

const mapStateToProps = state => {
    const { keyword } = state;
    const { apps, appsFiltered, isFetching } = state.topFree;
    return { apps, appsFiltered, isFetching, keyword }
}

export default connect(mapStateToProps, {
    fetchFreeApp,
    filterFreeApp
})(AppList);