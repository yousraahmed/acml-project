//here we create the buttons and icons of the sidebar

import React from 'react'

import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as ImIcons from 'react-icons/im';
import * as GoIcons from 'react-icons/go';
import * as CgIcons from 'react-icons/cg';
import * as HiIcons from 'react-icons/hi';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
// import * as FaRegIcons from 'react-icons/faReg';


export const SidebarDataBrian = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Assign Instructor',
        path: '/instructorAssign',
        icon: <BsIcons.BsFillPersonPlusFill />,
        cName: 'nav-text'
    },
    {
        title: 'Delete Instructor',
        path: '/instructorDelete',
        icon: <BsIcons.BsFillPersonDashFill />,
        cName: 'nav-text'
    },
    {
        title: 'Update Instructor',
        path: '/instructorUpdate',
        icon: <BsIcons.BsFillPersonCheckFill />,
        cName: 'nav-text'
    },
    {
        title: 'View Staff By Department',
        path: '/viewStaffByDepartment',
        icon: <HiIcons.HiUserGroup />,
        cName: 'nav-text'
    },
    {
        title: 'View Staff By Course',
        path: '/viewStaffByCourse',
        icon: <ImIcons.ImBooks />,
        cName: 'nav-text'
    },
    {
        title: 'View Day Off All',
        path: '/daysOffAllStaff',
        icon: <ImIcons.ImBlocked />,
        cName: 'nav-text'
    },
    {
        title: 'View Day Off Single',
        path: '/daysOffSingleStaff',
        icon: <ImIcons.ImBlocked />,
        cName: 'nav-text'
    },
    {
        title: 'View Change Day Off Requests',
        path: '/requestsChangeDayOff',
        icon: <CgIcons.CgViewList/>,
        cName: 'nav-text'
    },
    {
        title: 'View Leave Requests',
        path: '/requestsLeave',
        icon: <CgIcons.CgViewList/>,
        cName: 'nav-text'
    },
    {
        title: 'Accept Change Day Off Requests',
        path: '/acceptChangeDayOffRequests',
        icon: <FaIcons.FaThumbsUp />,
        cName: 'nav-text'
    },
    {
        title: 'Accept Leave Requests',
        path: '/acceptLeaveRequests',
        icon: <FaIcons.FaThumbsUp />,
        cName: 'nav-text'
    },
    {
        title: 'Reject Change Day Off Requests',
        path: '/rejectChangeDayOffRequests',
        icon: <GoIcons.GoThumbsdown />,
        cName: 'nav-text'
    },
    {
        title: 'Reject Leave Requests',
        path: 'rejectLeaveRequests',
        icon: <GoIcons.GoThumbsdown />,
        cName: 'nav-text'
    },

    {
        title: 'View Coverage',
        path: '/coverage',
        icon: <GiIcons.GiChecklist/>,
        cName: 'nav-text'
    },
    {
        title: 'View Teaching Assignments',
        path: '/teachingAssignments',
        icon: <GiIcons.GiTeacher />,
        cName: 'nav-text'
    },
]