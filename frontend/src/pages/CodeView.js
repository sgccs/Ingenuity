import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useParams } from "react-router";
import { baseUrl } from "../constants";

const CodeView = () => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [codeValue, setCodeValue] = useState('console.log("hello world!")');
  const [problem, setProblem] = useState("");

  const fetchProblem = () => {
    axios
      .get(baseUrl + "/problems/" + id)
      .then((res) => {
        console.log(res.data);
        // set problems
        setProblem(res.data); // problems = [{],{}]
      })
      .catch((err) => console.log("Error in fetching details", err));
  };
  useEffect(() => {
    // fetch problem
    fetchProblem();
  });

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const handleCodeChange = (value) => {
    setCodeValue(value);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          flex: "50%",
          borderRight: "1px solid black",
          overflow: "auto",
        }}
      >
        <h1>{problem.name}</h1>
        <div class="problem-description">
          <p style={{ fontStyle: "italic" }}>{problem.description}</p>
        </div>
        <div class="constraints" style={{ textAlign: "left", margin: "10px" }}>
          <h3>constraints:</h3>
          <hr></hr>
          <p style={{ fontStyle: "oblique" }}>{problem.constraints}</p>
        </div>
        <div class="input" style={{ textAlign: "left", margin: "10px" }}>
          <h3>Input:</h3>
          <hr />
          {problem && problem.input && problem.input.length > 0 && (
            <p style={{ fontStyle: "oblique" }}>{problem.input[0]}</p>
          )}
        </div>
        <div class="output" style={{ textAlign: "left", margin: "10px" }}>
          <h3>Output:</h3>
          <hr />
          {problem && problem.output && problem.output.length > 0 && (
            <p style={{ fontStyle: "oblique" }}>{problem.output[0]}</p>
          )}
        </div>
      </div>
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
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div style={{ marginRight: "10px", flex: "50%" }}>
            <InputLabel id="theme-select-label">Theme</InputLabel>
            <Select
              labelId="theme-select-label"
              id="theme-select"
              value={selectedTheme}
              onChange={handleThemeChange}
              style={{ fontSize: "0.8rem", padding: "4px" }}
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
              }}
            >
              <MenuItem value="vs-dark">Dark</MenuItem>
              <MenuItem value="vs-light">Light</MenuItem>
              <MenuItem value="hc-black">High Contrast</MenuItem>
            </Select>
          </div>
          <div style={{ flex: "50%" }}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              style={{ fontSize: "0.8rem", padding: "4px" }}
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
              }}
            >
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="java">Java</MenuItem>
            </Select>
          </div>
        </div>
        <div style={{ height: "calc(100vh - 48px)" }}>
          <Editor
            height="100%"
            language={selectedLanguage}
            theme={selectedTheme}
            value={codeValue}
            onChange={handleCodeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeView;
