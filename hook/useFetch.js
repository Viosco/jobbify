import { useState, useEffect } from 'react';
import axios from 'axios';
import { RAPID_API_KEY } from '@env';

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ error, setError] = useState(null);
    
    const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
    };

    // const options = {
    //     method: 'GET',
    //     url: 'https://jsearch.p.rapidapi.com/search',
    //     params: {query: 'Python developer in Texas, USA', page: '1', num_pages: '1'},
    //     headers: {
    //       'X-RapidAPI-Key': '7d11d4e15cmshe3f18ad55521047p1c0ca4jsne9ff6bd61534',
    //       'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    //     }
    //   };

    const fetchData = async () => {
        setIsLoading(true);
    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    //     //setData()
    // }).catch(function (error) {
    //     console.error(error);
    // });   
   try {
        const response = await axios.request(options); 
        setData(response.data.data);
        setIsLoading(false);
       } catch (error) {
        setError(error);
        alert('There is an error')
       } finally {
        setIsLoading(false);
       }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const refetchData = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetchData };
    
}

export default useFetch;
