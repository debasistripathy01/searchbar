import React, { useEffect, useState } from 'react'
import Search from './Search'
// import {countries} from "../db.json";
import {countries} from "../db"




const SearchBar = () => {
    const [qurey, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState([]);

    const [data, setData] = useState(null);

    // useEffect(()=>{
    //     const fetcheData= async()=>{
    //         let res = await fetch("http://localhost:3000/countries");
    //         let NewData = await res.json();
    //         setData(NewData.data);

    //     }
    //     fetcheData();
    // }, [])
    useEffect(()=>{
        if(qurey === ""){
            setSuggestion([]);
        }
        else{
            let newLength = countries.filter((item)=> item.country.toLowerCase().indexOf(qurey)!==-1 ? true: false).map((item)=> item.country);
            setSuggestion(newLength);
        }
        setTimeout(()=>{
            setLoading(false)
        }, 1000);
    }, [qurey]);


    console.log(countries)
  return (
    <div>
        <h1>Search Bar</h1>
        <Search  loading={loading} suggestion={suggestion} onChangeText={(val)=> setQuery(val)} setLoading={setLoading}/>
    </div>
  )
}

export default SearchBar