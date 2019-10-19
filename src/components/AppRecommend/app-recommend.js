import React from "react";
import { connect } from "react-redux";

// components
import ListItem from "./list-item";
import ListItemSkeleton from "./list-item-skeleton";

// actions
import { fetchGrossingApp, filterRecommendApp } from "./actions";

// styles
import "./app-recommend.scss";

function AppRecommend(props) {
    const { apps, appsFiltered, fetchGrossingApp, filterRecommendApp, isFetching, keyword } = props;

    React.useEffect(() => {
        fetchGrossingApp();
    }, []);

    React.useEffect(() => {
        filterRecommendApp(keyword);
    }, [keyword]);

    return (
        <div className="recommend-list">
            <div className="content">
                <h1>推介</h1>
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

const mapStateToProps = state => {
    const {
        keyword,
        topGrossing: {
            apps,
            appsFiltered,
            isFetching
        }
    } = state;
    return {
        apps, appsFiltered, isFetching, keyword
    }
}

export default connect(mapStateToProps, {
    fetchGrossingApp,
    filterRecommendApp
})(AppRecommend);