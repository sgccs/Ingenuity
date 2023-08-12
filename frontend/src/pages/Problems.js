import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import axios from 'axios';
import { baseUrl } from '../constants';
import Problem from '../components/Problem';
import { useNavigate } from "react-router-dom";


const Problems = () => {
    
    const [problems,setProblems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // fetch problems
        const fetchProblems = () => {
            const token = localStorage.getItem('token');
            console.log(token);
            
            axios.get(baseUrl + '/problems',{headers:{authorization: token, 'Access-Control-Allow-Origin': '*'}}).then(res => {
                console.log(res.data);
                // set problems
                setProblems(res.data); // problems = [{],{}]
            }).catch(err => {
                console.log("Error in fetching details", err);
                navigate('/logout');
                
            });
    
        }
        fetchProblems();
    },[navigate]) 


    return (
        <div>
            <h1>Problems</h1>
            <List style={{margin: '0px 100px 100px 100px'}}>
            {problems && problems.length>0?problems?.map((problem) => (
                <Problem key = {problem._id} problem={problem} />
            )):
            <p>problems loading...</p>}
            </List>
        </div>
    );
};

export default Problems;
