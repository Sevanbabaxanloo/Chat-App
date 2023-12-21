import React from 'react'
import {auth} from '../firebase'

const style = {
  button: `bg-[#395DFF] px-4 py-2 hover:bg-[#395DFF] rounded-lg text-white font-bold`,
};


const LogOut = () => {
const signOut = () => {
    signOut(auth)
}

  return (
    <button onClick={() => auth.signOut()} className={style.button}>
        Logout
    </button>
  )
}

export default LogOut