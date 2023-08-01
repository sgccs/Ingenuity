import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

const Problem = (props) => {
  const navigate = useNavigate();

  const submissionPage = () => {
    navigate(`/problem/${props.problem._id}`);
    console.log('clicked');
  };

  const listsubmissions = () => {
    navigate(`/submissions/${props.problem._id}`);
    console.log('clicked submissions');
  };
  return (
    <div>
      <ListItemButton alignItems="flex-start" >
        <ListItemText
          primary={props.problem.name}
          secondary={
            <React.Fragment>
              Submitted {"— I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
        <Button variant="contained" onClick={submissionPage}>Code</Button>
        <Button variant="contained" onClick={listsubmissions} style={{paddingLeft: '10px',marginLeft: '10px'}}>Submissions</Button>
      </ListItemButton>
    </div>
  );
};

export default Problem;
