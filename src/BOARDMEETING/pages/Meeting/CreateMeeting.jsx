import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Ensure you have this package installed
import { useNavigate } from 'react-router-dom';
import { Base_api } from "../../../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";

const CreateMeeting = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [place, setPlace] = useState('');
    const [meetingLink, setMeetingLink] = useState("");
    const { userid } = decoded;
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = {
            id,
            title,
            date,
            time,
            type,
            place,
            meetingLink,
        };

        try {
            const response = await fetch(`${Base_api}/api/meetings/save/${userid}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(formData), // Convert form data to JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                // Display the error message from the backend
                if (errorData.error) {
                    toast.error(errorData.error, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                toast.success("Meeting Created Successfully...", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate("../board-meeting-dashboard");
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An unexpected error occurred.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="mt-6 mb-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-1/2">
            <h2 className="text-center text-2xl font-bold mb-4">Create a Meeting</h2>
            <form onSubmit={handleSubmit}>

                <div className="flex space-x-4 mb-2">
                    <label className="flex-1">
                        Meeting Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </label>

                    <label className="flex-1">
                        Meeting Time:
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </label>
                </div>

                <label className="block mb-2">
                    Meeting Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </label>

                <label className="block mb-2">
                    Meeting Type:
                    <select
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            // Reset additional info when the meeting type changes
                            setMeetingLink('');
                        }}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>Select a meeting type</option>
                        <option value="Offline">Offline</option>
                        <option value="Online">Online</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </label>

                {(type === "Online" || type === "Hybrid") && (
                    <label className="block mb-2">
                        Meeting Link 
                        <input
                            type="text"
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </label>
                )}

                <label className="block mb-2">
                    Meeting Place:
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </label>

                <div className="flex justify-center mt-5 mb-5">
                    <input
                    type="submit"
                    value="Create Meeting"
                    className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateMeeting;
