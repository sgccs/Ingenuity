import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useParams } from "react-router";
import { baseUrl } from "../constants";

const Viewsubmission = () => {
  const { id } = useParams();
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [submission, setSubmission] = useState(null);

  
  useEffect(() => {
    const fetchCode = () => {
      const token = localStorage.getItem('token');
      axios
        .get(baseUrl + "/submission/" + id,{headers:{authorization: token, 'Access-Control-Allow-Origin': '*'}})
        .then((res) => {
          console.log(res.data);
          setSubmission(res.data);
        })
        .catch((err) => console.log("Error in fetching details", err));
    };
    fetchCode();
  }, [id]);

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "50%",
          overflow: "auto",
          margin: "10px",
          padding: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {submission ? (
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ marginRight: "10px" }}>
                <h3>User: {submission.userID}</h3>
                <h3>Language: {submission.language}</h3>
                <h3>Verdict: {submission.verdict}</h3>
              </div>
            </div>
          ) : (
            <div>Loading submission...</div>
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputLabel
              id="theme-select-label"
              style={{ marginRight: "10px" }}
            >
              Theme
            </InputLabel>
            <Select
              labelId="theme-select-label"
              id="theme-select"
              value={selectedTheme}
              onChange={handleThemeChange}
              style={{ fontSize: "0.8rem", padding: "4px" }}
              MenuProps={{
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
              }}
            >
              <MenuItem value="vs-dark">Dark</MenuItem>
              <MenuItem value="vs-light">Light</MenuItem>
              <MenuItem value="hc-black">High Contrast</MenuItem>
            </Select>
          </div>
        </div>
        <div style={{ height: "calc(100vh - 48px)" }}>
          {submission && (
            <Editor
              height="100%"
              language={submission.language}
              theme={selectedTheme}
              value={submission.code}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewsubmission;
