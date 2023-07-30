import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const ProblemView = (props) => {
    const problem = props.problem;


      const handleCopyInput = () => {
        navigator.clipboard.writeText(problem.input[0]);
      };
    
      const handleCopyOutput = () => {
        navigator.clipboard.writeText(problem.output[0]);
      };

  return (
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
        <h3>
          Input:
          <IconButton onClick={handleCopyInput} style={{ marginLeft: "10px" }}>
            <FileCopyIcon />
          </IconButton>
        </h3>
        <hr />
        {problem && problem.input && problem.input.length > 0 && (
          <>
            <pre style={{ fontStyle: "oblique", padding: "10px" }}>
              {problem.input[0]}
            </pre>
          </>
        )}
      </div>
      <div class="output" style={{ textAlign: "left", margin: "10px" }}>
        <h3>
          Output:
          <IconButton onClick={handleCopyOutput} style={{ marginLeft: "10px" }}>
            <FileCopyIcon />
          </IconButton>
        </h3>
        <hr />
        {problem && problem.output && problem.output.length > 0 && (
          <>
            <pre style={{ fontStyle: "oblique", padding: "10px" }}>
              {problem.output[0]}
            </pre>
          </>
        )}
      </div>
    </div>
  );
};

export default ProblemView;
