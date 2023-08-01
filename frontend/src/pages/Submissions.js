import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import axios from 'axios';
import { baseUrl } from '../constants';
import Submission from '../components/Submission';
import { useParams } from 'react-router';

const token = localStorage.getItem('token');


const Submissionslist = () => {
    const { id } = useParams();
    const [submissions,setSubmissions] = useState([]);

    useEffect(() => {
        // fetch problems
        fetchSubmissions();
    },[id]) 

    const fetchSubmissions = () => {
    const token = localStorage.getItem('token');
    axios.get(baseUrl + '/submissions/'+id,{headers:{authorization: token, 'Access-Control-Allow-Origin': '*'}}).then(res => {
            console.log(res.data);
            // set submissins
            setSubmissions(res.data); // submissions = [{],{}]
        }).catch(err => console.log("Error in fetching details", err));

    }

    return (
        <div >
            <h1>Submissions</h1>
            <List style={{margin: "100px"}}>
            {submissions?.map((submissions) => (
                <Submission Submission={submissions} />
            ))}
            </List>
        </div>
    );

};

export default Submissionslist;