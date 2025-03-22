import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';
import { BiLogOut } from "react-icons/bi";
// import userConversation from '../../Zustans/useConversation';

const Sidebar = ({ onSelectUser }) => {
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
   // const { selectedConversation, setSelectedConversation } = userConversation();

    // Fetch users the current user has chatted with
    useEffect(() => {
        const fetchChatUsers = async () => {
            
            setLoading(true);
            try {
                const response = await axios.get(`/api/user/currentChatters`);
                const data = response.data;
                if (!data.success) {
                    console.log(data.message);
                } else {
                    setChatUser(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchChatUsers();
    }, []);

    // Handle user search
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`/api/user/search?search=${searchInput}`);
            const data = response.data;
            if (!data.success) {
                console.log(data.message);
            }
            if (data.length === 0) {
                toast.info("User Not Found");
            } else {
                setSearchUser(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle user selection
    const handleUserClick = (user) => {
        onSelectUser(user);
       // setSelectedConversation(user);
        setSelectedUserId(user._id);
    };

    // Handle search reset
    const handleSearchBack = () => {
        setSearchUser([]);
        setSearchInput('');
    };

    // Handle logout
    const handleLogout = async () => {
        const confirmLogout = window.prompt("Type 'UserName' to LOGOUT");
        if (confirmLogout === authUser.username) {
            setLoading(true);
            try {
                const response = await axios.post('/api/auth/logout');
                const data = response.data;
                if (!data.success) {
                    console.log(data.message);
                } else {
                    toast.info(data.message);
                    localStorage.removeItem('chatApp');
                    setAuthUser(null);
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        } else {
            toast.info("Logout Cancelled");
        }
    };

    return (
        <div className='h-full w-auto px-1'>
            <div className='flex justify-between gap-2'>
                <form onSubmit={handleSearchSubmit} className='w-auto flex items-center justify-between bg-white rounded-full '>
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type='text'
                        className='px-4 w-auto bg-transparent outline-none rounded-full'
                        placeholder='Search user'
                    />
                    <button className='btn btn-circle bg-sky-700 hover:bg-gray-950'>
                        <FaSearch />
                    </button>
                </form>
                <img
                    onClick={() => navigate(`/profile/${authUser?._id}`)}
                    src={authUser?.profilepic}
                    className='self-center h-12 w-12 hover:scale-110 cursor-pointer'
                    alt="Profile"
                />
            </div>
            <div className='divider px-3'></div>

            {/* Show search results if there are any */}
            {searchUser?.length > 0 ? (
                <>
                    <div className="min-h-[70%] max-h-[80%] overflow-y-auto scrollbar">
                        <div className='w-auto'>
                            {searchUser.map((user) => (
                                <div key={user._id}>
                                    <div
                                        onClick={() => handleUserClick(user)}
                                        className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${
                                            selectedUserId === user._id ? 'bg-sky-500' : ''
                                        }`}
                                    >
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img src={user.profilepic} alt='User' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col flex-1'>
                                            <p className='font-bold text-gray-950'>{user.username}</p>
                                        </div>
                                    </div>
                                    <div className='divider divide-solid px-3 h-[1px]'></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mt-auto px-1 py-1 flex'>
                        <button onClick={handleSearchBack} className='bg-white rounded-full px-2 py-1 self-center'>
                            <IoArrowBackSharp size={25} />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="min-h-[70%] max-h-[80%] overflow-y-auto scrollbar">
                        <div className='w-auto'>
                            {chatUser.length === 0 ? (
                                <div className='font-bold flex flex-col items-center text-xl text-yellow-500'>
                                    <h1>Why are you alone? 🤔</h1>
                                    <h1>Search for a user to chat!</h1>
                                </div>
                            ) : (
                                chatUser.map((user) => (
                                    <div key={user._id}>
                                        <div
                                            onClick={() => handleUserClick(user)}
                                            className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${
                                                selectedUserId === user._id ? 'bg-sky-500' : ''
                                            }`}
                                        >
                                            <div className="avatar">
                                                <div className="w-12 rounded-full">
                                                    <img src={user.profilepic} alt='User' />
                                                </div>
                                            </div>
                                            <div className='flex flex-col flex-1'>
                                                <p className='font-bold text-gray-950'>{user.username}</p>
                                            </div>
                                        </div>
                                        <div className='divider divide-solid px-3 h-[1px]'></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className='mt-auto px-1 py-1 flex'>
                        <button onClick={handleLogout} className='hover:bg-red-600 w-10 cursor-pointer hover:text-white rounded-lg'>
                            <BiLogOut size={25} />
                        </button>
                        <p className='text-sm py-1'>Logout</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
