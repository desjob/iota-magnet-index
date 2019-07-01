import Menu from '../../components/menu';
import React from "react";
import {connect} from "react-redux";

import {
    changeRoute,
    openNavBar,
    closeNavbar
} from './actions';

const mapStateToProps = (state) => {
    return {
        navOpen: state.navigation.navOpen,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRouteChange: (route) => dispatch(changeRoute(route)),
        handleDrawerOpen: () => dispatch(openNavBar()),
        handleDrawerClose: () => dispatch(closeNavbar()),
    }
};

const Navigation = (props) => {
    return (
        <Menu
            handleDrawerOpen={props.handleDrawerOpen}
            handleDrawerClose={props.handleDrawerClose}
            open={props.navOpen}
            onRouteChange={props.onRouteChange}
        >
        {props.children}
        </Menu>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);