// import React, { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// const Hello = () => {
//   const [CITOUserId, setCITOUserId] = useState("");
//   const token =
//     "eyJhbGciOiJIUzI1NiJ9.eyJjYnN1c2VyIjoib2xkIiwib25tcyI6MSwidW5pdCI6OSwibG9nX3N0YXR1cyI6IlkiLCJ1c2VyX3JvbGVpZCI6MywiZG9tYWludXNlciI6Im9sZCIsImVtYWlsdXNlciI6Im9sZCIsImJtcyI6IlVzZXIiLCJvZmZpY2lhbCI6MCwiZGl2aGVhZCI6IjAiLCJjaXRvIjoiMDUzODMifQ.vw2YBnac9gvc2RbSS7TPXBH4PA0M2j5L9Uj0R8nTWnE";
//   const decoded = jwtDecode(token);
//   (decoded);
//   const { cito } = decoded;
//   useEffect(() => {
//     setCITOUserId(cito);
//   }, []);

//   (decoded);

//   return <div>CITO User Id : {CITOUserId}</div>;
// };

// export default Hello;
import React, { useEffect } from "react";

// Hello component
const Hello = () => {
  useEffect(() => {
    ("Parent Component");
  }, []);

  return (
    <div>
      <h1>Parent</h1>
      <Child />
    </div>
  );
};

// Child component
const Child = () => {
  useEffect(() => {
    ("Child Component");
  }, []);

  return (
    <div>
      <h1>Child</h1>
      <GrandChild />
    </div>
  );
};

// Grandchild component
const GrandChild = () => {
  useEffect(() => {
    ("GrandChild Component");
  }, []);

  return <h1>GrandChild</h1>;
};

export default Hello;
