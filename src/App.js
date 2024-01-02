import React from "react";
import Chat from "./components/Chat";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LogOut from "./components/LogOut";
import SignIn from "./components/SignIn";

const style = {
  appContainer: `h-screen mx-auto text-center bg-[#121212] overflow-hidden`,
  sectionContainer: `flex flex-col justify-between h-[64vh] w-[76vw] bg-[#626262] bg-opacity-[0.15] backdrop-blur-xl shadow-xl border relative border-[1px] border-white border-opacity-15 rounded-[16px] max-md:mb-[4vh]`,
  Container: `relative`,
  cyrcle: `h-[553px] w-[553px] bg-[#22FF95] rounded-full absolute -top-[150px] -left-[200px] opacity-60 max-md:h-[300px] max-md:w-[300px]`,
  cyrcle1: `h-[377px] w-[377px] rounded-full bg-gradient-to-br from-[#22FF95] to-transparent absolute -top-[200px] left-[50px] border-[10px] border-[#22FF95] opacity-80 max-md:h-[300px] max-md:w-[300px] max-md:h-[300px] max-md:-top-[230px] max-md:-left-[100px]`,
  MidleGradient: `flex h-screen w-screen items-center justify-center`,
  cyrcle2: `w-[746px] h-[746px] bg-[#22FF95] rounded-full absolute -bottom-[400px] -right-[100px] opacity-20 max-md:h-[350px] max-md:w-[350px] max-md:-bottom-[250px] max-md:-right-[50px]`,
  cyrcle3: `w-[746px] h-[746px] bg-[#22FF95] rounded-full absolute -bottom-[300px] -right-[350px] opacity-80 max-md:h-[350px] max-md:w-[350px] max-md:-bottom-[200px] max-md:-right-[200px]`,
  chatContainer: `absolute top-0 w-full h-full flex justify-center`,
  navBar: `w-full h-[10vh] flex justify-center items-center p-4 absolute z-10`,
  heading: `text-3xl text-[#E5E5E5] font-bold tracking-[0.5px]`,
  nav: ``,
  buttonPosition: `absolute font-[600] top-0 right-0 h-[10vh] flex items-center justify-center py-4 pr-16 max-md:top-16 max-md:right-0 max-md:w-full max-md:pr-0 max-md:h-[5vh] max-sm:h-[3vh] max-sm:top-20`,
};

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className={style.appContainer}>
      <div className={style.navBar}>
        <div>
          <h1 className={style.heading}>Chat App</h1>
        </div>
        <div className={style.buttonPosition}>
          <div className={style.nav}>{user ? <LogOut /> : <SignIn />}</div>
        </div>
      </div>
      <div className={style.Container}>
        <div className={style.cyrcle}></div>
        <div className={style.cyrcle1}></div>
      </div>
      <div className={style.MidleGradient}>
        <div className="bg-gradient-circle">
          <div className={style.gradientCircle}></div>
        </div>
      </div>
      <div className={style.Container}>
        <div className={style.cyrcle2}></div>
        <div className={style.cyrcle3}></div>
      </div>
      <div className={style.chatContainer}>
        <div className="w-full flex flex-col items-center mt-[100px] max-md:mt-[120px]">
          <section className={style.sectionContainer}>
            {user ? <Chat /> : null}
          </section>
          <h2 className="text-[#E5E5E5] font-[Montserrat] font-400 leading-6	mt-[28px]">
            Developed by Sevan Babakhanloo
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
