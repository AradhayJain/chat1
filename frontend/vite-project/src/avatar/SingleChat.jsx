import React, { useState } from 'react'
import { ChatState } from '../provider/ChatProvider'
import { Box, Text } from '@chakra-ui/react'
import { getSender } from '../config/chatLogics.js'
// import { IconButton } from '@chakra-ui/react'
import { Icon } from "@chakra-ui/react"
import "/src/css/single.css"
import { CloseButton } from "@/components/ui/close-button"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
const SingleChat = ({fetchAgain,setFetchAgain }) => {

    const {user,selectedChat,setSelectedChat}=ChatState()
    const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
    const handleClick=()=>{
        setIsProfileBoxOpen(true)
    }

    const closeProfileBox = () => {
        setIsProfileBoxOpen(false);
    }
    const removeFromGroup = async (user1) => {
        if(selectedChat.groupAdmin._id!==user._id){
            toast.error('You are not the admin of this group')
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
    
            const { data } = await axios.put('/api/chat/groupremove', {
                chatId: selectedChat._id,
                userId: user1._id,
            }, config);
    
            // Update the selectedChat state to reflect the changes after user removal
            if (user1._id === user._id) {
                // If the current user is removed, set selectedChat to null (or a fallback chat)
                setSelectedChat(); // You can decide what to set in case of current user removal
            } else {
                setSelectedChat(data); // Update the selectedChat with the new group data
            }
    
            // Display success message
            toast.success('User removed from group chat');
    
            // Trigger re-fetching of chat data
            setFetchAgain(!fetchAgain);
        } catch (err) {
            console.error('Error removing user from group chat:', err.response?.data || err.message);
            toast.error('Failed to remove user from group chat');
        }
    };
    


  return (
    <>
        
       {
        selectedChat?(
            <>
                <div>
                <ToastContainer/>
                    {!selectedChat.isGroupChat?(
                        <>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                          {getSender(user,selectedChat.users)}
                          <div onClick={handleClick}><Icon fontSize="40px" color="red.500">
                                <svg viewBox="0 0 32 32">
                                    <g fill="currentColor">
                                    <path d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z" />
                                    <path d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z" />
                                    </g>
                                </svg>
                                </Icon>
                          </div>
                          
                            
                            

                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"380px","marginTop":"20px"}}>
                            <div style={{width:"100%",height:"100%",overflowY:"hidden",backgroundColor:"#D3D3D3",borderRadius:"10px"}}>

                            </div>
                        </div>
                        

                        </>
                        

                    ):(
                        <>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        {selectedChat.chatName}
                          <div onClick={handleClick}><Icon fontSize="40px" color="red.500">
                                <svg viewBox="0 0 32 32">
                                    <g fill="currentColor">
                                    <path d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z" />
                                    <path d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z" />
                                    </g>
                                </svg>
                                </Icon>
                          </div>
                          
                            
                            

                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"70vh","marginTop":"20px"}}>
                            <div style={{width:"100%",height:"100%",overflowY:"hidden",backgroundColor:"#D3D3D3",borderRadius:"10px"}}>

                            </div>
                        </div>
                        

                        </>
                    )}

                        {isProfileBoxOpen && (
                        <div
                            style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '400px',
                            backgroundColor: '#fff',
                            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                            borderRadius: '10px',
                            padding: '20px',
                            textAlign: 'center',
                            zIndex: 2000,
                            }}
                        >
                            <h2 style={{ marginBottom: '20px' }}>Profile</h2>

                            {/* Display chat name */}
                            <p>
                            <strong>Name:</strong> {!selectedChat.isGroupChat ? selectedChat.users[1].name : selectedChat.chatName}
                            </p>

                            {/* Render group members if it's a group chat */}
                            {selectedChat.isGroupChat && (
                            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                                <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>Group Members:</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {selectedChat.users.map((user) => (
                                        <li
                                        key={user._id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between', // Ensures spacing between content and CloseButton
                                            marginBottom: '10px',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            backgroundColor: '#f5f5f5',
                                            transition: 'background-color 0.3s ease',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#e0e0e0'; // Hover color
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f5f5f5'; // Original color
                                        }}
                                        >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                            src={user.pic}
                                            alt={user.name}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '50%',
                                                marginRight: '10px',
                                            }}
                                            />
                                            <span style={{ fontSize: '14px', fontWeight: '500' }}>{user.name}</span>
                                        </div>
                                        <CloseButton onClick={()=>removeFromGroup(user)}/>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            )}

                            <button
                            onClick={closeProfileBox}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            >
                            Close
                            </button>
                        </div>
                        )}


               </div>
            </>
        ):(
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <h1>please select a chat</h1>
            </div>
        )
       }
    </>
    )
  
}

export default SingleChat