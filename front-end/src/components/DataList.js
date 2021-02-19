import React, { useState, useEffect } from "react";
import axios from "axios";

const DataList = (props) => {
   const [data, setData] = useState([]);
   const [input, setInput] = useState("");
   const [isServerAlive, setIsServerAlive] = useState(true);

   const postRequestToServer = (data) => {
      axios
         .post("http://127.0.0.1:8000", {
            data: data,
         })
         .then((res) => {
            setInput("");
            setIsServerAlive(true);
         })
         .catch((error) => {
            localStorage.setItem(
               `pendingData${
                  parseInt(localStorage.getItem("pendingDataCount")) + 1
               }`,
               input
            );

            localStorage.setItem(
               "pendingDataCount",
               `${parseInt(localStorage.getItem("pendingDataCount")) + 1}`
            );
            setInput("");
            setIsServerAlive(false);
         });
   };

   const sendToDatabase = () => {
      postRequestToServer(input);
      if (isServerAlive) {
         for (
            let i = 1;
            i <= parseInt(localStorage.getItem("pendingDataCount"));
            i++
         ) {
            if (localStorage.getItem(`pendingData${i}`) != null) {
               console.log(localStorage.getItem(`pendingData${i}`));
               postRequestToServer(localStorage.getItem(`pendingData${i}`));
            }
         }
         fetchData();
      }
   };

   const handleInputChange = (event) => {
      setInput(event.target.value);
   };

   const fetchData = () => {
      axios
         .get("http://127.0.0.1:8000")
         .then((res) => {
            console.log(res.data);
            setData(res.data);
         })
         .catch((err) => {
            alert(JSON.stringify(err));
         });
   };

   useEffect(() => {
      if (localStorage.getItem("pendingDataCount") == null)
         localStorage.setItem("pendingDataCount", 0);
      fetchData();
   }, []);

   return (
      <div
         style={{ flex: 1, backgroundColor: "#506289", flexDirection: "row" }}
      >
         <div style={{ flex: 1, backgroundColor: "#058813" }}>
            <ul>
               {data.map((d) => (
                  <li key={d.id}>
                     <h4>{d.data}</h4>
                     <h6> Added date: {new Date(d.date).toLocaleString()}</h6>
                  </li>
               ))}
            </ul>
         </div>
         <div style={{ flex: 1, backgroundColor: "#058813" }}>
            <label htmlFor="data-input">Type data to store database: </label>
            <input
               type="text"
               id="data-input"
               onChange={handleInputChange}
               value={input}
            />
            <button onClick={sendToDatabase}>Send</button>
         </div>
      </div>
   );
};

export default DataList;
