import { useEffect } from "react";

const AutoRefreshComponent = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 420000); // 5000 milliseconds = 5 seconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <></>
    // <div>
    //   <h1>Auto Refresh Every 5 Seconds</h1>
    //   <p>This page will refresh every 5 seconds.</p>
    // </div>
  );
};

export default AutoRefreshComponent;
