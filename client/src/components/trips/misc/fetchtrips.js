//class purpose: to make sure that userStore always fetches newly updated trips upon page load.

import React from "react";
import { inject, observer } from "mobx-react";

@inject("userStore")
@observer
export default function(PageComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            let all_trips = this.props.userStore.all_trips;
            if (typeof all_trips === 'undefined' || all_trips === 500) {
                this.props.userStore.fetch_trips();
            }
        }

        render() {
            return <PageComponent {...this.props} />
        }
    }
}