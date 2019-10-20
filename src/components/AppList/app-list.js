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
    const {
        apps,
        appsFiltered,
        error,
        isFetching,
        isLoadingMore,
        keyword,
        fetchFreeApp,
        filterFreeApp
    } = props;

    React.useEffect(() => {
        fetchFreeApp();
    }, []);

    React.useEffect(() => {
        filterFreeApp(keyword);
    }, [keyword]);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = (event) => {
        const body = document.body,
              html = document.documentElement;
    
        const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

        if (isLoadingMore) { return; }

        if (window.innerHeight + document.documentElement.scrollTop >= height - 300) {
            // if (onLoadMore) {
            //     onLoadMore();
            // }
            console.log(`load more`);
        }
    }

    return (
        <div className="app-list">
            <div className="content">
                {
                    isFetching ? (
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
                    ) : (
                        error.length > 0 ? (
                            <div className="message">
                                {error}
                            </div>
                        ) : (
                            keyword.length > 0 &&
                            appsFiltered.length === 0 &&
                            <div className="message">
                                沒有相關結果
                            </div>
                        )
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
    error: PropTypes.string,
    fetchFreeApp: PropTypes.func,
    isFetching: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    keyword: PropTypes.string
}

const mapStateToProps = state => {
    const { keyword } = state;
    const { apps, appsFiltered, error, isFetching, isLoadingMore } = state.topFree;
    return { apps, appsFiltered, error, isFetching, isLoadingMore, keyword }
}

export default connect(mapStateToProps, {
    fetchFreeApp,
    filterFreeApp
})(AppList);