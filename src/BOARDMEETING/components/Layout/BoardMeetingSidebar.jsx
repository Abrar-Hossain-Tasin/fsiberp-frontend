import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DehazeIcon from '@mui/icons-material/Dehaze';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavbarImage from '../../../assets/mega.png'; 

const BoardMeetingSidebar = () => {
    const [isCreateMeetingVisible, setIsCreateMeetingVisible] = useState(false);
    const [isCreateMeetingMinutesVisible, setIsCreateMeetingMinutesVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const popoverRef = useRef(null); // Reference for the popover

    const isPathActive = () => {
        return location.pathname.startsWith(id);
    };

    const handleNavigate = (path) => {
        navigate(path);
        hidePopover();
    };

    const togglePopover = () => {
        setIsPopoverVisible(prev => !prev);
        setIsCreateMeetingVisible(false); // Hide resources menu when toggling popover
        setIsCreateMeetingMinutesVisible(false); // Hide minutes menu when toggling popover
    };

    const hidePopover = () => {
        setIsPopoverVisible(false);
        setIsCreateMeetingVisible(false); // Hide resources menu when hiding popover
        setIsCreateMeetingMinutesVisible(false); // Hide minutes menu when hiding popover
    };

    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target) && !event.target.closest('.dehaze-icon')) {
            hidePopover();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const CreateMeeting = () => {
        return (
            <div className="absolute left-full top-0 mt-2 bg-[#f0f0f0] border border-slate-500 rounded-lg shadow-md w-64 text-sm">
                <div className="p-3">
                    <a href="/board-meetings/create-board-meeting" className="block p-2 bg-[#a3a3c2] mb-2 text-black rounded-lg hover:bg-[#666699]">Create Meeting</a>
                    <a href="/board-meetings/board-meeting-dashboard" className="block p-2 bg-[#a3a3c2] mb-2 text-black rounded-lg hover:bg-[#666699]">Meeting Dashboard</a>
                </div>
            </div>
        );
    };

    // const CreateMeetingMinutes = () => {
    //     return (
    //         <div className="absolute left-full top-0 mt-2 bg-[#f0f0f0] border border-slate-500 rounded-lg shadow-md w-64 text-sm">
    //             <div className="p-3">
    //                 <a href="/board-meetings/create-meeting-minutes" className="block p-2 bg-[#a3a3c2] mb-2 text-black rounded-lg hover:bg-[#666699]">Create Meeting Minutes</a>
    //                 <a href="/board-meetings/meeting-minutes-dashboard" className="block p-2 bg-[#a3a3c2] mb-2 text-black rounded-lg hover:bg-[#666699]">Meeting Minutes Dashboard</a>
    //             </div>
    //         </div>
    //     );
    // };

    const BoardMeetingButton = ({ title, path }) => {
        const BoardMeetingClassName = `flex justify-center bg-[#a3a3c2]  mb-2 items-center text-sm font-[500] border p-2 rounded-lg hover:bg-[#666699] ${
            isPathActive()
                ? "text-[#e9e9e9] border-white border-2"
                : "text-black border-transparent"
        } hover:text-black`;
        

        return (
            <div 
                onMouseEnter={() => {
                    if (title === "Board Meeting") setIsCreateMeetingVisible(true);
                    if (title === "Meeting Minutes") setIsCreateMeetingMinutesVisible(true);
                }} 
                onMouseLeave={() => {
                    if (title === "Board Meeting") setIsCreateMeetingVisible(false);
                    if (title === "Meeting Minutes") setIsCreateMeetingMinutesVisible(false);
                }}
                className="relative"
            >
                <a
                    className={BoardMeetingClassName}
                    onClick={() => handleNavigate(path)}
                    
                >
                    <span className="relative transition-colors duration-300 delay-200 ease text-md">
                        {title}
                    </span>
                    {title === "Board Meeting" && (
                        <ExpandMoreIcon 
                            className={`h-4 w-4 ml-2 transition-transform duration-200 ${isCreateMeetingVisible ? 'rotate-180' : ''}`} 
                        />
                    )}
                    {title === "Meeting Minutes" && (
                        <ExpandMoreIcon 
                            className={`h-4 w-4 ml-2 transition-transform duration-200 ${isCreateMeetingMinutesVisible ? 'rotate-180' : ''}`} 
                        />
                    )}
                </a>
                {title === "Board Meeting" && isCreateMeetingVisible && (
                    <div className="mt-2">
                        <CreateMeeting />
                    </div>
                )}
                {title === "Meeting Minutes" && isCreateMeetingMinutesVisible && (
                    <div className="mt-2">
                        <CreateMeetingMinutes />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="relative flex items-center font-bold text-2xl text-black">
            <div className="relative">
                <DehazeIcon 
                    sx={{ color: 'white' }} 
                    className="mr-2 cursor-pointer dehaze-icon" // Added class for easy targeting
                    onClick={togglePopover} // Change to click event
                />

                {/* Popover */}
                {isPopoverVisible && (
                    <div 
                        ref={popoverRef} // Attach ref to the popover
                        data-popover 
                        role="tooltip" 
                        className="absolute z-10 w-72 "
                        // className="absolute z-10 bg-black border border-gray-200 rounded-lg shadow-md w-72 "
                        style={{ 
                            top: '100%', 
                            left: '50%', 
                            transform: 'translate(5px)', 
                            marginTop: '5px' 
                        }} 
                    >
                        <div className="p-3 bg-[#f0f0f0] border border-slate-500 shadow-lg opacity 0.5 rounded-lg "
                        // style={{
                        //     background: `
                        //       url(${NavbarImage}) no-repeat center,
                        //     `,
                        //     backgroundSize: "cover",
                        //   }}
                        >
                            <BoardMeetingButton title="Dashboard" path="dashboard" />
                            <BoardMeetingButton title="Board Meeting" />
                            <BoardMeetingButton title="Meeting Minutes Dashboard" path="meeting-minutes-dashboard" />
                            <BoardMeetingButton title="Agenda Dashboard" path="agenda-dashboard" />
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardMeetingSidebar;
