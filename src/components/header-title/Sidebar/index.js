import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from './DesktopSidebar'


const Sidebar = ({currentPath}) => {

    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    return isMobile ? <MobileSidebar currentPath={currentPath}/> : <DesktopSidebar currentPath={currentPath}/>
}

export default Sidebar
