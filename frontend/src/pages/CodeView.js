import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import { useParams } from "react-router";
import { baseUrl } from "../constants";
import { IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import ProblemView from "../components/ProblemView";


const CodeView = (props) => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [codeValue, setCodeValue] = useState("");
  const [problem, setProblem] = useState("");
  const [submit, setSubmit] = useState(false);
  const [verdict, setVerdict] = useState(false);
  const [output, setOutput] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [run, setRun] = useState(false);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const fetchProblem = () => {
    const token = localStorage.getItem('token');

    axios
      .get(baseUrl + "/problems/" + id,{headers:{authorization: token, 'Access-Control-Allow-Origin': '*'}})
      .then((res) => {
        // set problems
        setProblem(res.data); // problems = [{],{}]
      })
      .catch((err) => {
        console.log("Error in fetching details", err);
      });
  };

  useEffect(() => {
    // fetch problem
    fetchProblem();
  }, [id]);

  useEffect(() => {
    // update default code based on selected language
    const getDefaultCode = () => {
      switch (selectedLanguage) {
        case "cpp":
          return '#include<bits/stdc++.h> \n\n using namespace std; \n\n  int main(){ \n\n  cout<<"hello World!"<<endl; \n\n  return 0; \n\n }';
        case "js":
          return 'console.log("Hello, World!");';
        case "py":
          return 'print("Hello, World!")';
        case "java":
          return 'class main { \n\n public static void main(String[] args) { \n\n System.out.println("Hello, World!"); \n\n} \n\n}';
        default:
          return "";
      }
    };

    setCodeValue(getDefaultCode());
  }, [selectedLanguage]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const handleCodeChange = (value) => {
    setCodeValue(value);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeValue);
  };

  const handleCopyCustomInput = () => {
    navigator.clipboard.writeText(customInput);
  };

  const handleCopyUserOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const handleSubmit = () => {
    setSubmit(true);
    const username = props.username;
    const body = {
      problemID: id,
      userID: username, 
      code: codeValue,
      language: selectedLanguage,
      input: problem.input,
      output: problem.output,
    };
    const token = localStorage.getItem('token');
    axios
      .post(baseUrl + "/submission", body,{headers:{authorization: token, 'Access-Control-Allow-Origin': '*'}})
      .then((res) => {
        console.log(res);
        if (res.data.verdict === "AC") {
          setSubmit(true);
          setVerdict(true);
        } else {
          setSubmit(false);
          setVerdict(true);
          setOutput(res.data.userOutput);
          console.log(res.data.userOutput);
        }
      })
      .catch((err) => console.log("Error in fetching details", err));
  };
  const handleRun = () => {
    setRun(true);
    const username = props.username;
    const body = {
      problemID: id,
      userID: username, 
      code: codeValue,
      language: selectedLanguage,
      input: customInput,
    };
    const token = localStorage.getItem('token');
    axios
      .post(baseUrl + "/run", body,{headers:{authorization: token, 'Access-Control-Allow-Origin': '*'}})
      .then((res) => {
        console.log(res.data.userOutput)
        setOutput(res.data.userOutput);
      })
      
      .catch((err) => console.log("Error in fetching details", err));
  };

  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  };
  return (
    <div style={{ display: "flex", height: "100%" }}>

      <ProblemView problem = {problem}></ProblemView>
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
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
              }}
            >
              <MenuItem value="vs-dark">Dark</MenuItem>
              <MenuItem value="vs-light">Light</MenuItem>
              <MenuItem value="hc-black">High Contrast</MenuItem>
            </Select>
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              style={{ margin: "25px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
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
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
              }}
            >
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="js">JavaScript</MenuItem>
              <MenuItem value="py">Python</MenuItem>
              <MenuItem value="java">Java</MenuItem>
            </Select>
          </div>
        </div>
        <div style={{ height: "calc(90vh - 48px)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <IconButton
              onClick={handleCopyCode}
              style={{ marginRight: "10px" }}
            >
              <FileCopyIcon />
            </IconButton>
            <IconButton onClick={handleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </div>
          <Editor
            height="100%"
            language={selectedLanguage}
            theme={selectedTheme}
            value={codeValue}
            onChange={handleCodeChange}
          />
          {submit && !verdict && (
            <>
              <Alert severity="info">
                <AlertTitle>Processing</AlertTitle>
                Running testcases — <strong>Submission Queued!</strong>
              </Alert>
            </>
          )}
          {submit && verdict && (
            <>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                testcases passed — <strong>Submited succesfully!</strong>
              </Alert>
            </>
          )}
          {!submit && verdict && (
            <>
              <Alert severity="warning">
                <AlertTitle>Failed</AlertTitle>
                testcases failed — <strong>Wrong submission</strong>
              </Alert>
              <h3>Expected Output:</h3>
              <hr></hr>
              <pre>{problem.output[0]}</pre>
              <h3>Recived Output:</h3>
              <hr></hr>
              <pre>{output[0]}</pre>
            </>
          )}
          {!submit && !verdict && problem && !run && (
            <>
              <textarea
                style={{ margin: "50px", alignContent: "left" }}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                rows="5"
                cols="50"
                placeholder={problem.input[0]}
              />
              <ColorButton variant="contained" onClick={handleRun}>
                RUN
              </ColorButton>
            </>
          )}
          {!submit && !verdict && run && output &&(
            <>
              <div>
                <div>
                  <h3>
                    Input:
                    <IconButton
                      onClick={handleCopyCustomInput}
                      style={{ marginLeft: "10px" }}
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </h3>
                  <hr />
                  <textarea
                    style={{ margin: "50px", alignContent: "left" }}
                    value={customInput}
                    onChange={(e) => {
                      setCustomInput(e.target.value);
                      setRun(false);
                    }}
                    rows="5"
                    cols="50"
                  />
                </div>
                <div>
                  <h3>
                    Output:
                    <IconButton
                      onClick={handleCopyUserOutput}
                      style={{ marginLeft: "10px" }}
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </h3>
                  <hr />
                  <textarea
                    style={{ margin: "50px", alignContent: "left" }}
                    value={output}
                    rows="5"
                    cols="50"
                    readOnly
                  />
                </div>
                <div>
                  <ColorButton variant="contained" onClick={handleRun}>
                    RUN
                  </ColorButton>
                </div>
              </div>
            </>
          )}
          {!submit && !verdict && run && !output &&(
            <>
              <Alert severity="info">
                <AlertTitle>Processing</AlertTitle>
                Running testcases — <strong>Submission Queued!</strong>
              </Alert>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeView;
