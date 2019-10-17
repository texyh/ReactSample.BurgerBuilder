import React, {FC, Fragment, Component, useEffect, useState} from 'react'
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDraw from '../../components/Navigation/SideDraw/SideDrawer';

export type layoutState = {
    showSideDrawer : boolean
}
const  Layout = props => {
    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawer(!showSideDrawer)
    }

    return (
        <Fragment>
        <ToolBar drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDraw open={showSideDrawer} closed={sideDrawerClosedHandler} />
        <main className={classes.Content}>
            {props.children}
        </main>
        </Fragment>
    );
}

export default Layout;