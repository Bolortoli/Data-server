import React, { useState, useEffect } from "react";
import axios from "axios";

const DataList = (props) => {
   const [data, setData] = useState([1]);

   const fetchData = () => {
      axios
         .get("127.0.0.1:8000/")
         .then((res) => {
            alert(JSON.stringify(res));
         })
         .catch((err) => {
            alert(JSON.stringify(err));
         });
   };

   useEffect(() => {
      fetchData();
   }, []);

   return <>{JSON.stringify(data)}</>;
};

export default DataList;
