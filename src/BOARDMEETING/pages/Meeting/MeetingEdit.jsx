import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { decryptId } from "../../../pages/Encrypted/Encrypted";
import { Base_api } from "../../../utils/api/Base_api";

const MeetingEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetingLink, setMeetingLink] = useState(""); 
  const decryptedId = decryptId(id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Base_api}/api/meetings/view/${decryptedId}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const result = await response.json();
        console.log({ result });
        
        // Set state with fetched data
        setTitle(result.title);
        setType(result.type);
        setPlace(result.place);
        setDate(result.date);
        setTime(result.time);
        setMeetingLink(result.meetingLink || ''); // Set meetingLink from fetched data
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch meeting details.", {
          autoClose: 2000,
        });
      }
    };
    fetchData();
  }, [decryptedId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("place", place);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("meetingLink", meetingLink);
  
    try {

      const response = await fetch(
        `${Base_api}/api/meetings/update/${decryptedId}`,
        {
          method: "PUT", // Use PUT for updates
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      toast.success("Meeting updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce,
      });
      
      setTimeout(() => {
        navigate("../board-meeting-dashboard");
      }, 2000);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="mt-6 mb-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-1/2">
      <h2 className="text-center text-2xl font-bold mb-4">Edit Meeting</h2>
      <form onSubmit={handleUpdate}>
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
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Select a meeting type</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>

        {type === "Online" && (
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

        {type === "Hybrid" && (
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
              value="Update"
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            />
          </div>
      </form>
    </div>
  );
};

export default MeetingEdit;
