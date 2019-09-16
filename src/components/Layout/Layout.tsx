import React, {FC, Fragment} from 'react'

const layout:FC = (props) => {
    return (
        <Fragment>
        <div>ToolBar, SideBar, BackDrop</div>
        <main>
            {props.children}
        </main>
        </Fragment>
    );
}

export default layout;