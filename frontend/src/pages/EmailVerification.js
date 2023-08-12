import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios"; // Import Axios
import { baseUrl } from '../constants';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    // Make the PATCH request to your backend endpoint for email verification
    axios
      .patch(`${baseUrl}/verify/${token}`)
      .then((response) => {
        console.log(response); // Log the response from the backend (optional)
        setLoading(false); // Set loading to false after the verification process
        setVerificationResult('success');

        // After successful verification, wait for a few seconds before navigating to the login page
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Adjust the delay time (in milliseconds) as needed
      })
      .catch((error) => {
        console.log("Error in email verification", error); // Log the error (optional)
        setLoading(false); // Set loading to false even if verification failed (you can handle this differently)
        setVerificationResult('error');

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      });
  }, [token, navigate]);

  const handleCloseSnackbar = () => {
    setVerificationResult(null);
  };

  return (
    <div>
{loading ? (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
    <CircularProgress />
  </div>
) : (
  verificationResult === 'success' ? (
    <h2>Email verified!</h2>
  ) : (
    <h2>Signup failed!</h2>
  )
)}


      <Snackbar
        open={verificationResult !== null}
        autoHideDuration={5000} // Adjust the duration as needed (in milliseconds)
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={verificationResult === 'success' ? 'success' : 'error'}
        >
          {verificationResult === 'success' ? 'Email verification successful!' : 'Email verification failed!'}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default EmailVerification;
