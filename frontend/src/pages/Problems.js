import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import axios from 'axios';
import { baseUrl } from '../constants';
import Problem from '../components/Problem';

const Problems = () => {
    
    const [problems,setProblems] = useState([]);
    
    useEffect(() => {
        // fetch problems
        fetchProblems();
    },[]) 

    const fetchProblems = () => {
        axios.get(baseUrl + '/problems').then(res => {
            console.log(res.data);
            // set problems
            setProblems(res.data); // problems = [{],{}]
        }).catch(err => console.log("Error in fetching details", err));

    }

    return (
        <div>
            <h1>Problems</h1>
            <List style={{margin: "100px"}}>
            {problems?.map((problem) => (
                <Problem problem={problem} />
            ))}
            </List>
        </div>
    );
};

export default Problems;
