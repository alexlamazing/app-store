import React, { Component } from "react";
import LazyLoad from "react-lazyload";

function withLazyLoad(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <LazyLoad height={96}>
                    <WrappedComponent
                        {...this.props}
                    />
                </LazyLoad>
            );
        }
    }
}

export default withLazyLoad;