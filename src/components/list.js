import React, { useEffect, useState, useRef } from 'react';
import './list.css'

const getNewUsers = async()=>{
    console.log("fetching data...")
    const response = await fetch('https://randomuser.me/api/?results=20', {
        method: 'GET'
    });
    const data = await response.json();
    return data.results;
}
export default function List() {
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(1);
    useEffect(() =>{
        async function fetchData(){
            setTimeout(()=>{
                setIsLoading(false);
            }, 1000);
            const users = await getNewUsers();
            // console.log(users);
            setUserList([...userList, ...users]);
        }
        fetchData();
    }, [loading]);

    const listInnerRef = useRef();
    const onScroll = () => {
        // console.log(listInnerRef)
        if (listInnerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        console.log(scrollTop, scrollHeight, clientHeight)
        if (scrollTop + clientHeight === scrollHeight) {
            // TO SOMETHING HERE
            setLoading(loading+1);
            setIsLoading(true);
            console.log('Reached bottom')
        }
        }
    };
    return (
        <div className='wrapper'>
            {
                isLoading &&
                <div className="loading">
                    Loading...
                </div>
            }
            
            <div className='listItem listTop'>
                <div>Infinite Scroll List</div>
            </div>

            <div className="list" onScroll={() => onScroll()} ref={listInnerRef}>
                <div className='listItem'>
                    <p>Sandeep Singh</p>
                    <img src='https://picsum.photos/200/300' />
                </div>
                {
                    userList.map((user)=>{
                        // console.log(user);
                        return  <div className='listItem'>
                                    <p>{user.name.first+ " " + user.name.last}</p>
                                    <img src={user.picture.medium} />
                                </div>
                    })
                }
            </div>
        </div>
        
    )
}
