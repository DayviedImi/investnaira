import React from "react";
import { Route } from "react-router-dom";
import { networkAvailability, NetworkAvailabilityContext } from "../utils/http";

class DefaultLayout extends React.Component {
  state = {
    offline: false,
  };

  componentDidMount() {
    networkAvailability(this);
  }

  render() {
    const { offline } = this.state;
    const { component: Component, history, ...rest } = this.props;
    const temp = this.props.location.pathname.split("/");
    const id = temp[3];
    return (
      <NetworkAvailabilityContext.Provider
        value={{
          offline,
        }}>
        <Route
          {...rest}
          render={(matchProps) => <Component history={history} id={id} {...matchProps} />}
        />
      </NetworkAvailabilityContext.Provider>
    );
  }
}
export default DefaultLayout;
