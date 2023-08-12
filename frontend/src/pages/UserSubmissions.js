import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import axios from 'axios';
import { baseUrl } from '../constants';
import Usersubmissions from '../components/UserSubmission';
import { useNavigate } from 'react-router-dom';


const UserSubmissions = () => {
    
    const [submissions,setSubmissions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // fetch problems
        const fetchSubmissions = () => {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('username');
            console.log(token);
            
            axios.get(baseUrl + '/usersubmissions/'+id,{headers:{authorization: token, 'Access-Control-Allow-Origin': '*'}}).then(res => {
                console.log(res.data);
                // set problems
                setSubmissions(res.data); // problems = [{],{}]
            }).catch(err => {
                console.log("Error in fetching details", err);
                navigate('/logout');
            });
    
        }
        fetchSubmissions();
    },[navigate]) 


    return (
        <div>
            <h1>Submissions</h1>
            <List style={{margin: '0px 100px 100px 100px'}}>
            {submissions && submissions.length>0?submissions?.map((submission) => (
                <Usersubmissions key = {submission._id} submission={submission} />
            )):
            <p>submissions loading...</p>}
            </List>
        </div>
    );
};

export default UserSubmissions;
