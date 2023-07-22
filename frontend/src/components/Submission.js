import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

const Submission = (props) => {
    const navigate = useNavigate();

    const submittedCode = () => {
      navigate(`/submission/${props.Submission._id}`);
      console.log('clicked');
    };

    return (
        <div>
          <ListItemButton alignItems="flex-start" onClick={submittedCode}>
            <ListItemText
              primary={props.Submission.userID}
              secondary={
                <React.Fragment>
                  Verdict {props.Submission.verdict}
                </React.Fragment>
              }
            />
            <Button variant="contained">submitted Code</Button>
            </ListItemButton>
        </div>
      );
};

export default Submission;