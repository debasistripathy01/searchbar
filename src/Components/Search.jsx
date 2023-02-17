import React, { useEffect, useRef, useState } from 'react'
import {Link} from "react-router-dom"
import styled from "styled-components";
import {useThrottle} from "use-throttle";

const SearchBarDiv = styled.div `
    display:flex;
    border: 2px solid greenyellow;
    padding: 10px;
    align-items: center;
    border-top-left-radius: 20px;
`

const DummyImage = styled.img`

    height: 20px;
    paddingright: 20px;
`
const Input = styled.input`
    border:none;
    outline:none;
    font-size:20px;
    flex:1;
    padding-left:20px;
`
 
const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 24px;
  height: 24px;
  
  & .path {
    stroke: #5652BF;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;


const RightSide = styled.div`

`
const SuggestionBox = styled.div`
display:flex;
flex-direction:column;
flex: 0 0 auto;
max-height:200px;
border: 2px solid black;
overflow:auto;
border-bottom-right-radius:20px;
border-bottom-left-radius:20px;
& * {
  flex:1;
  text-align:left;
  padding:10px;
  padding-left:50px;
}
border-top-color:${({len})=>(len? "transparent":"black")};
& :nth-child(${({active})=>active})
{
  background:lightblue;
  color:black;
  font-weight:700;
  cursor:pointer
}
`

const Search = ({loading,onChangeText,suggestion, setLoading}) => {

    const [value, settValue] = useState("");
    const [start, setStart] = useState(0);
    const scrollRef = useRef();

    const throttleText = useThrottle(value, 1000);


    useEffect(()=>{
        onChangeText(throttleText);

    }, [throttleText, onChangeText])
    const handleChangeInput=(e)=>{
        settValue(e.target.value);
        setLoading(true);
    }

    const handleClear = ()=>{
        settValue("");
        setLoading(false);
    }


    const handleSuggestions = (e)=>{
        switch(e.keyCode){
            case 40:
                if(start >=5){
                    settValue((prev)=>prev+1);
                    scrollRef.current.scrollTop += 38.5;

                }
                else{
                    settValue((prev)=>prev+1);
                }
                break;
            case 38:
                if(value <=2){
                    scrollRef.current.scrollTop -= 38.5;
                    settValue((prev)=>prev-1);
                }
                else{
                    settValue((prev)=>prev-1);
                }
                break;
            case 13:
                break;

        default:
            return;
        }
    }

 
  return (
    <>
        <SearchBarDiv onKeyUp={handleSuggestions} len={suggestion.length || 0}>
            <DummyImage src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"></DummyImage>

                <Link>
                    <Input value={value} onChange={handleChangeInput}></Input>
                </Link>
            <RightSide>
                { value&&<DummyImage src='https://www.freeiconspng.com/uploads/exit-icon-png-close-0.png' style={{cursor:"pointer"}} onClick={handleClear}/>}
                {loading&&<StyledSpinner viewBox="0 0 50 50"><circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"/></StyledSpinner>}
            </RightSide>
        </SearchBarDiv>

    {
    !loading&&suggestion.length>0&&(
    <SuggestionBox  limit={7} active={start} ref={scrollRef}>
            {
            suggestion.map((item,index)=>
            {
                return <div key={item} onMouseOver={()=>setStart(index+1)}>{item}</div>
            })
            }
    </SuggestionBox>
    )
  }
    </>
  )
}

export default Search