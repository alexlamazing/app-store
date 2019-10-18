import React from "react";
import { connect } from "react-redux";

// components
import ListItem from "./list-item";
import ListItemSkeleton from "./list-item-skeleton";

// actions
import { fetchGrossingApp } from "./actions";

// styles
import "./app-recommend.scss";

function AppRecommend(props) {
    const { apps, fetchGrossingApp, isFetching } = props;
    React.useEffect(() => {
        fetchGrossingApp();
    }, [fetchGrossingApp]);
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
                    {apps && apps.map((app, index) => <ListItem key={index} index={index + 1} app={app} />)}
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const {
        topGrossing: {
            apps,
            isFetching
        }
    } = state;
    return {
        apps, isFetching
    }
}

export default connect(mapStateToProps, { fetchGrossingApp })(AppRecommend);