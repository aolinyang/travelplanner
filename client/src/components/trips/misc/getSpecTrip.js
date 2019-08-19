import React from "react";
import { inject, observer } from "mobx-react";
import { when } from "mobx";

@inject("userStore")
@observer
export default function(PageComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                tripToRender: undefined
            }
        }

        componentDidMount() {
            when(
                () => Array.isArray(this.props.userStore.all_trips),
                () => { 
                    let userStore = this.props.userStore;
                    let trip_id = this.props.match.params.trip_id;
                    let tripToRender;
                    let n = 0;
                    while (n < userStore.all_trips.length) {
                        if (userStore.all_trips[n].trip_id === parseInt(trip_id)) {
                            tripToRender = userStore.all_trips[n];
                            break;
                        }
                        n++;
                    }
    
                    this.setState({
                        tripToRender: tripToRender
                    });
                }
              );
        }

        render() {
            if (typeof this.state.tripToRender === 'undefined') {
                return <PageComponent {...this.props} />
            } else{
                return <PageComponent {...this.props} tripToRender={this.state.tripToRender} />
            }
        }
    }
}