import React from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const userData = useSelector((store) => store.user)
  const navigate = useNavigate()

  const handleSignOut = () => {

signOut(auth).then(() => {
  // Sign-out successful.
  navigate("/")
}).catch((error) => {
  // An error happened.
  console.log(error.message);
});
  }

  return (
    <div className=' absolute w-screen flex justify-between bg-gradient-to-b from-black items-center '>
    
    <div className=' w-60  py-2 px-4  '>
        <img className=' z-10' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' />
    </div>
    {userData && <div>
      <img className=' w-12 h-12 ' src={userData?.photoURL} />
      <button className=' px-3 py-2  bg-red-500 rounded-md' onClick={handleSignOut}>Sign out</button>
      <p>{userData?.displayName}</p>
    </div>}

    </div>
  )
}

export default Header