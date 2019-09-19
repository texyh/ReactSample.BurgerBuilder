import React, {FC, Fragment, Component} from 'react'
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDraw from '../../components/Navigation/SideDraw/SideDrawer';

export type layoutState = {
    showSideDrawer : boolean
}
class Layout extends Component<{}, layoutState> {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prestate) => {
            return {showSideDrawer: !prestate.showSideDrawer}
        })
    }

    render() {
        return (
            <Fragment>
            <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDraw open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Fragment>
        );
    }
    
}

export default Layout;