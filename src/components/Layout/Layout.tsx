import React, {FC, Fragment} from 'react'
import classes from './Layout.module.css';
const layout:FC = (props) => {
    return (
        <Fragment>
        <div>ToolBar, SideBar, BackDrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
        </Fragment>
    );
}

export default layout;