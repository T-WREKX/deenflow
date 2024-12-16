'use client'
import Image from "next/image";
import Clock from 'react-live-clock';
import dynamic from "next/dynamic";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";
import useLogout from "../hooks/useLogout";
import { useRouter } from 'next/navigation'
import {
  HStack,
  Card, CardHeader, CardBody, CardFooter,
  useDisclosure,
  InputGroup,
  InputRightElement,
  InputRightAddon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  Checkbox,
  IconButton,
  Box,
  CloseButton,
  Icon,
  useColorModeValue,
  Text,
  BoxProps,
  FlexProps,
  Flex ,
  InputAddon,
  Group
} from '@chakra-ui/react'
import $ from "jquery";
import image1 from "/public/resources/images/1.png";
import image2 from "/public/resources/images/2.png";
import {  useState, useEffect } from 'react'
import useShowToast from "../hooks/useShowToast";



const Home =() => {
const router = useRouter()
const [user] = useAuthState(auth);
const [hour , setHour] = useState('HH:mm')
const [bgSoundOn , setBgSoundOn] = useState(false);
const [bgSound , setBgSound] = useState('rain')
const { isOpen: isFirstDraweOpen , onOpen: onFirstDrawerOpen, onClose: onFirstDrawerClose } = useDisclosure()
const { isOpen: isSecondDraweOpen , onOpen: onSecondDrawerOpen, onClose: onSecondDrawerClose } = useDisclosure()
const { isOpen:isModalOpen, onOpen:onModalOpen, onClose:onModalClose } = useDisclosure()
const [focus , setFocus] = useState(false)
const [imageUrl , setImageUrl] = useState("resources/images/1.png")
const [rain, setRain] = useState(typeof Audio !== "undefined" && new Audio("/resources/rain.mp3")); 
const [ocean, setOcean] = useState(typeof Audio !== "undefined" && new Audio("/resources/ocean.mp3")); 
const [priority1 , setPriority1] = useState("");
const [priority2 , setPriority2] = useState("");
const [priority3 , setPriority3] = useState("");
const [priority1C , setPriority1C] = useState(false);
const [priority2C , setPriority2C] = useState(false);
const [priority3C , setPriority3C] = useState(false);
const [priority0 , setPriority0] = useState("What do you want to focus on? ✎");
const [pomodoro , setPomodoro] = useState('focus')
const [ focusMinutes, setFocusMinutes ] =  useState(25);
const [focusTime , setFocusTime] = useState(focusMinutes+':00')
const [ shortMinutes, setShortMinutes ] =  useState(10);
const [short, setShort] = useState(shortMinutes+":00")
const [ longMinutes, setLongMinutes ] =  useState(20);
const [long , setLong] = useState(longMinutes+":00")
const [ minutes, setMinutes ] =  useState(0);
const [ seconds, setSeconds ] =  useState(0);
const [startTimer, setStart] = useState(false)
const [homeImage, setHomeImage] = useState('1');
const [focusImage, setFocusImage] = useState('2');
const showToast = useShowToast();
const  { handleLogout, isLoggingOut, error }= useLogout();
const sounds = {
  rain: {
    img: '🌧️',
    src: function () {
      rain.src= rain.src;
    },
    loop: function () {
      rain.loop = true;
    },
    play: function () {
      rain.play();
    },
    pause: function () {
      rain.pause();
    }
  },
  ocean: {
    img: '🌊',
    src: function () {
      ocean.src= ocean.src;
    },
    loop: function () {
      ocean.loop = true;
    },
    play: function () {
      ocean.play();
    },
    pause: function () {
      ocean.pause();
    }
  },
};


const authUser = useAuthStore((state) => state.user);

    useEffect(() => {
      let myInterval = setInterval(() => {
              if (seconds > 0) {
                  setSeconds(seconds - 1);

              }
              if (seconds === 0) {
                  if (minutes === 0 ) {
                      clearInterval(myInterval)
                      if(pomodoro=='focus' && startTimer)
                      {
                      setPomodoro('short')
                      setMinutes(shortMinutes)
                      }
                      else if (pomodoro=='short' && startTimer)
                      {
                        setPomodoro('focus')
                        setMinutes(focusMinutes)
                      }

                  } else {
                      setMinutes(minutes - 1);
                      setSeconds(59);
                  }
              } 
          }, 1000)
          return ()=> {
              clearInterval(myInterval);
              };
    },)
    
   const upgrade = async() =>
   {
    !user?
    showToast("Error", "Login", "error")
    :
    router.push('/upgrade')
   }
  
    useEffect(() => {
     
    }, [homeImage, focusImage])

    const switchTheme = async(no,theme)  => 
    {
      if(theme=="focus")
      {
        setFocusImage(no)
        if (focus) 
        {
          bg.classList.remove('fade-in-image1');
          await sleep(10)
          bg.classList.add('fade-in-image1');
          setImageUrl("resources/images/"+no+".png")
        }
      }
      else
      {
        setHomeImage(no)
        if (!focus) 
        {
        bg.classList.remove('fade-in-image1');
        await sleep(10)
        bg.classList.add('fade-in-image1');
        setImageUrl("resources/images/"+no+".png")
        }
         
      }

    }    
    
    
    
    function cancelFullScreen() {
      var el = document;
      var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen;
      if (requestMethod) { // cancel full screen.
          requestMethod.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
              wscript.SendKeys("{F11}");
          }
      }
    }

    function requestFullScreen(el) {
        // Supports most browsers and their versions.
        var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

        if (requestMethod) { // Native full screen.
            requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
        return false
    }

    function toggleFullScreen(el) {
        if (!el) {
            el = document.body; // Make the body go full screen.
        }
        var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);

        if (isInFullScreen) {
            cancelFullScreen();
        } else {
            requestFullScreen(el);
        }
        return false;
    }
   

    function togglBgSound(){
      if (bgSoundOn)
      {
        
         
        setBgSoundOn(false);
        sounds[bgSound].pause()
        sounds[bgSound].src()
          // rain.pause();
          // rain.src = rain.src
       
        
      }
      else
      {
        setBgSoundOn(true)
        sounds[bgSound].loop()
        sounds[bgSound].play()
      }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    const togglMode= async()=>{
   
      let bg = document.getElementById("bg");
      if ($(':checkbox').is(':checked')){
        let time = document.getElementById("time");
        time.classList.add('hidden');
        let home_text = document.getElementById("home-text");
        home_text.classList.add('hidden');
        time.classList.remove('fade-in-image');
        bg.classList.remove('fade-in-image1');
        $(':checkbox').prop('checked', true).attr('checked', 'checked');
        setFocus(true)
        await sleep(1)
        let time1 = document.getElementById("time1");
        let focus_text = document.getElementById("focus-text");
        time1.classList.add('hidden');
        focus_text.classList.add('hidden');
        await sleep(10)

        bg.classList.add('fade-in-image1');
        setImageUrl("resources/images/"+focusImage+".png")
        
        time1.classList.remove('hidden');
        time1.classList.add('fade-in-image');
        
        focus_text.classList.remove('hidden');
        focus_text.classList.add('fade-in-image');
        
       // console.log("Focus")
    }
    else {
        let time1 = document.getElementById("time1");
        time1.classList.add('hidden');
        let focus_text = document.getElementById("focus-text");
        focus_text.classList.add('hidden');
        time1.classList.remove('fade-in-image');
        bg.classList.remove('fade-in-image1');
        $(':checkbox').prop('checked', false).removeAttr('checked');
        //console.log("Home")
        setFocus(false)
        await sleep(1)
        let time = document.getElementById("time");
        let home_text = document.getElementById("home-text");
        time.classList.add('hidden');
        home_text.classList.add('hidden');
        await sleep(10)

        bg.classList.add('fade-in-image1');

        setImageUrl("resources/images/"+homeImage+".png")

        time.classList.remove('hidden');
        time.classList.add('fade-in-image');

        home_text.classList.remove('hidden');
        home_text.classList.add('fade-in-image');
        
    } 
    }

    function reset (){
      setPriority0("What do you want to focus on? ✎");
      setPriority1("")
      setPriority2("")
      setPriority3("")
      setPriority1C(false)
      setPriority2C(false)
      setPriority3C(false)
    }

    function start (){
      if(pomodoro=='focus')
      {
        setMinutes(focusMinutes-1)
        setSeconds(59)
        setStart(true)
      }
      else if (pomodoro == 'short')
      {        
        setMinutes(shortMinutes-1)
        setSeconds(59)
        setStart(true)
      }
      else{
        setMinutes(longMinutes-1)
        setSeconds(59)
        setStart(true)
      }

    }
    
    function stop () {
      setMinutes(0)
      setSeconds(0)
      setStart(false)
    }

  return (
    <>
    <div id="bg"  
    // style={{'--image-url': `url(${imageUrl})`}} 
    // className='bg-[image:var(--image-url)]'
    style={{ backgroundImage: `url('${imageUrl}')`}}
    >
      <div id="top">
        <div style={{ userSelect: 'none' }}  id="top-left" >
        <Image
          priority
          style={{ userSelect: 'none' }} 
          src="/logo.png"
          width={100}
          height={100}
          alt="Logo"
          /> 
        </div>
        <div id="top-right" >
        <h1 id="top-right-text" className="text-white"> "If you are persistent, you'll get it"</h1>
        </div>
      </div>
      <div id="hero">
      {!focus?
      <div id="home" className="fade-in-image" >
         <div className=" flex relative justify-center"> 
          {user?
          <div style={{ userSelect: 'none' }}  id="home-text" className="text-white ">{"You nailed it, "+authUser?.username+". Time to unwind."}</div>
          :
          <div style={{ userSelect: 'none' }}  id="home-text" className="text-white ">{"You nailed it. Time to unwind."}</div>
          }
          </div>
          <div className=" flex relative justify-center"> 
        
            <div  style={{ userSelect: 'none' }}   id="time" className="text-white">
            {typeof window !== 'undefined' &&
            <Clock key={hour} format={hour} ticking={true}  />
          }
            </div> 
           
          </div>
      </div>
      :
      <div id="focus" className="fade-in-image" > 
       <div style={{ userSelect: 'none' }}  className="flex relative  justify-center">
      <button onClick={onModalOpen} id="focus-text" className=" z-20  text-white">{priority0}</button>
      </div>
      
      <div style={{ userSelect: 'none' }} className="flex relative  justify-center">
      <button className="btn" onClick={()=>{setPomodoro('focus'), setStart(false)}} style={{background:pomodoro=='focus'?'#7432FF':'',border:pomodoro=='focus'?'3px solid #7432FF':''}} ><Text id="text" >Focus</Text></button>
      <button className="btn" onClick={()=>{setPomodoro('short'), setStart(false)}}   style={{background:pomodoro=='short'?'#7432FF':'',border:pomodoro=='short'?'3px solid #7432FF':''}} ><Text id="text" >Short Break</Text></button>
      <button className="btn" onClick={()=>{setPomodoro('long'),  setStart(false)}}   style={{background:pomodoro=='long'?'#7432FF':'',border:pomodoro=='long'?'3px solid #7432FF':''}} ><Text id="text">Long Break</Text></button>
      </div>
      {!startTimer?
      <>
       {pomodoro=='focus' &&  <div  id="time1" className="z-10 fade-in-image1 text-white ">{focusTime}</div>}
       {pomodoro=='short' &&  <div id="time1" className="z-10 fade-in-image1 text-white ">{short}</div>}
       {pomodoro=='long' &&  <div id="time1" className="z-10 fade-in-image1 text-white">{long}</div>}
      </>
      :
      <>

      {pomodoro=='focus' &&  <div id="time1"  className="z-10 fade-in-image1 text-white">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>}
      {pomodoro=='short' &&  <div id="time1" className="z-10 fade-in-image1 text-white">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>}
      {pomodoro=='long' &&  <div id="time1" className="z-10 fade-in-image1 text-white">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>}
      </>
      }
      <div style={{ userSelect: 'none' }} className="flex  relative  justify-center">
      {!startTimer?
      <button  onClick={()=>start()} className=" button2  text-white" >Start</button>
      : 
      <button onClick={()=>stop()} className=" button2  text-white"  >Stop</button>
        }
      </div>
     
      </div>
      
      }
      </div>
      <div id="bottom">
        <div style={{ userSelect: 'none' }}  id="bottom-left" className="flex" >
        <button className="button"  onClick={onFirstDrawerOpen}>
        🕮
        </button>
        </div>
        <div style={{ userSelect: 'none' }} id="bottom-right" className="flex">

        <div className="switch-toggle m-0.5" >
          <input className="switch-toggle-checkbox" type="checkbox" id="focus"  onChange={()=>togglMode()}/>
          <label className="switch-toggle-label" htmlFor="focus">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="20" viewBox="0 2 24 20">
            <path fill="#fff" d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
        </svg></span>
            <span><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="20" viewBox="0 2 50 40">
        <path fill="#fff" d="M 25 3 C 16.730469 3 10 9.730469 10 18 C 10 24.167969 12.785156 27.140625 14.8125 29.3125 C 16.089844 30.683594 17 31.667969 17 33 L 17 38 L 24 38 L 24 23.40625 L 20.28125 19.71875 C 19.890625 19.328125 19.890625 18.671875 20.28125 18.28125 C 20.671875 17.890625 21.328125 17.890625 21.71875 18.28125 L 25 21.59375 L 28.28125 18.28125 C 28.671875 17.890625 29.328125 17.890625 29.71875 18.28125 C 30.109375 18.671875 30.109375 19.328125 29.71875 19.71875 L 26 23.40625 L 26 38 L 33 38 L 33 33 C 33 31.085938 34.105469 29.925781 35.5 28.46875 C 37.507813 26.371094 40 23.773438 40 18 C 40 9.730469 33.269531 3 25 3 Z M 17 40 L 17 43 C 17 44.652344 18.347656 46 20 46 L 21.15625 46 C 21.601563 47.722656 23.140625 49 25 49 C 26.859375 49 28.398438 47.722656 28.84375 46 L 30 46 C 31.652344 46 33 44.652344 33 43 L 33 40 Z"></path>
        </svg></span>
          </label>
        </div>
        <button className="button" onClick={onSecondDrawerOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="20" viewBox="0 0 48 48">
        <path fill="#ffff" d="M39.139,26.282C38.426,25.759,38,24.919,38,24.034s0.426-1.725,1.138-2.247l3.294-2.415	c0.525-0.386,0.742-1.065,0.537-1.684c-0.848-2.548-2.189-4.872-3.987-6.909c-0.433-0.488-1.131-0.642-1.728-0.38l-3.709,1.631	c-0.808,0.356-1.749,0.305-2.516-0.138c-0.766-0.442-1.28-1.23-1.377-2.109l-0.446-4.072c-0.071-0.648-0.553-1.176-1.191-1.307	c-2.597-0.531-5.326-0.54-7.969-0.01c-0.642,0.129-1.125,0.657-1.196,1.308l-0.442,4.046c-0.097,0.88-0.611,1.668-1.379,2.11	c-0.766,0.442-1.704,0.495-2.515,0.138l-3.729-1.64c-0.592-0.262-1.292-0.11-1.725,0.377c-1.804,2.029-3.151,4.35-4.008,6.896	c-0.208,0.618,0.008,1.301,0.535,1.688l3.273,2.4C9.574,22.241,10,23.081,10,23.966s-0.426,1.725-1.138,2.247l-3.294,2.415	c-0.525,0.386-0.742,1.065-0.537,1.684c0.848,2.548,2.189,4.872,3.987,6.909c0.433,0.489,1.133,0.644,1.728,0.38l3.709-1.631	c0.808-0.356,1.748-0.305,2.516,0.138c0.766,0.442,1.28,1.23,1.377,2.109l0.446,4.072c0.071,0.648,0.553,1.176,1.191,1.307	C21.299,43.864,22.649,44,24,44c1.318,0,2.648-0.133,3.953-0.395c0.642-0.129,1.125-0.657,1.196-1.308l0.443-4.046	c0.097-0.88,0.611-1.668,1.379-2.11c0.766-0.441,1.705-0.493,2.515-0.138l3.729,1.64c0.594,0.263,1.292,0.111,1.725-0.377	c1.804-2.029,3.151-4.35,4.008-6.896c0.208-0.618-0.008-1.301-0.535-1.688L39.139,26.282z M24,31c-3.866,0-7-3.134-7-7s3.134-7,7-7	s7,3.134,7,7S27.866,31,24,31z"></path>
        </svg>
        </button>
        <button className="button" onClick={()=>toggleFullScreen()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="24" viewBox="0 0 24 24" id="fullscreen">
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path fill="#fff" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
        </svg>
        </button>
        <button className="button" onClick={()=>togglBgSound()}>
          <div style={{width:35 , justifyItems:'center', opacity:bgSoundOn?1:0.5}}>
          <svg viewBox="0 0 24 24"  width="35" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 11V13M6 8V16M9 10V14M12 7V17M15 4V20M18 9V15M21 11V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>
        </button>
        </div>
      </div>
      <Drawer placement={'left'} onClose={onFirstDrawerClose} isOpen={isFirstDraweOpen}>
        <DrawerOverlay />
        <DrawerContent  backgroundColor="#000">
        <DrawerCloseButton color="#fff" />
          <DrawerHeader color="#fff" >Qur'an</DrawerHeader>
          <DrawerBody>
            <Text color="#fff" >Coming Soon...</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer placement={'right'} onClose={onSecondDrawerClose} isOpen={isSecondDraweOpen}  size={'xl'}>
        <DrawerOverlay />
        <DrawerContent  color="#fff" backgroundColor="#000">
        <DrawerCloseButton  />
          <DrawerHeader  >
            { !user ?
            <Button onClick={() => router.push('/login')} >Login</Button>
            :
            <Text ml={1} fontSize='2xl' as='b'>Hey, {authUser?.username}!</Text>
            } 
          </DrawerHeader>
          <DrawerBody  >
          <Box >
            <Flex direction={"column"} className="left">
              <Flex>
             <svg width="20px" height="20px" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M45.22 35.581C45.2395 35.5367 45.2666 35.4961 45.3 35.461C45.3235 35.4253 45.3503 35.3919 45.38 35.361L45.5 35.241C45.55 35.201 45.59 35.151 45.65 35.111C45.74 35.031 45.85 34.941 45.97 34.851C46.11 34.751 46.26 34.651 46.42 34.541C46.71 34.341 47.03 34.131 47.35 33.941C47.67 33.751 47.99 33.541 48.28 33.371C51.97 31.161 58.12 27.471 55.94 19.881C55.9206 19.7878 55.8904 19.6972 55.85 19.611C55.8388 19.558 55.8185 19.5072 55.79 19.461C55.7775 19.4226 55.7607 19.3857 55.74 19.351C53.2711 14.8634 49.5318 11.205 44.9913 8.83486C40.4508 6.4647 35.3114 5.48842 30.2181 6.02853C25.1248 6.56864 20.3044 8.60108 16.362 11.8708C12.4195 15.1405 9.53067 19.5018 8.05789 24.4074C6.58512 29.313 6.59406 34.5443 8.08359 39.4448C9.57312 44.3453 12.4769 48.6967 16.4305 51.9529C20.384 55.2091 25.2113 57.2251 30.3064 57.7478C35.4016 58.2705 40.5376 57.2767 45.07 54.891C45.162 54.8509 45.2492 54.8006 45.33 54.741C45.3584 54.7235 45.3852 54.7034 45.41 54.681C48.06 52.801 50.45 49.081 48.48 44.771C47.94 43.591 47.43 42.571 46.97 41.681C46.3626 40.5906 45.8507 39.4497 45.44 38.271C45.3907 38.1237 45.3506 37.9734 45.32 37.821C45.1458 37.0943 45.1085 36.3414 45.21 35.601C45.21 35.591 45.22 35.591 45.22 35.581ZM18.01 31.881C18.01 30.9614 18.2827 30.0623 18.7937 29.2976C19.3046 28.533 20.0308 27.9369 20.8805 27.585C21.7302 27.2331 22.6652 27.141 23.5672 27.3204C24.4692 27.4998 25.2977 27.9427 25.9481 28.593C26.5984 29.2433 27.0412 30.0719 27.2206 30.9739C27.4001 31.8759 27.308 32.8108 26.956 33.6605C26.6041 34.5102 26.0081 35.2364 25.2434 35.7474C24.4787 36.2583 23.5797 36.531 22.66 36.531C21.4271 36.53 20.2449 36.0397 19.3731 35.1679C18.5013 34.2961 18.0111 33.114 18.01 31.881ZM26.43 45.711C25.7284 45.712 25.0424 45.5048 24.4586 45.1157C23.8749 44.7265 23.4198 44.1729 23.1508 43.525C22.8819 42.877 22.8113 42.1638 22.9479 41.4757C23.0845 40.7875 23.4222 40.1554 23.9183 39.6593C24.4144 39.1633 25.0465 38.8255 25.7346 38.6889C26.4227 38.5523 27.136 38.6229 27.7839 38.8918C28.4319 39.1608 28.9855 39.6159 29.3746 40.1997C29.7638 40.7834 29.971 41.4695 29.97 42.171C29.9682 43.1093 29.5946 44.0087 28.9311 44.6721C28.2676 45.3356 27.3683 45.7092 26.43 45.711ZM32.94 28.131C31.6479 28.13 30.3851 27.7461 29.3112 27.0276C28.2373 26.3092 27.4005 25.2885 26.9065 24.0946C26.4125 22.9007 26.2835 21.5871 26.5358 20.3199C26.7881 19.0527 27.4104 17.8887 28.3241 16.9751C29.2377 16.0615 30.4017 15.4392 31.6689 15.1869C32.9361 14.9345 34.2496 15.0635 35.4435 15.5575C36.6374 16.0515 37.6581 16.8884 38.3766 17.9623C39.095 19.0362 39.479 20.299 39.48 21.591C39.479 23.3249 38.7894 24.9873 37.5631 26.2129C36.3367 27.4386 34.6738 28.127 32.94 28.127V28.131Z" fill="#fff"></path> </g></svg>
              <Text ml={1} fontSize='lg' as='b'>Themes</Text>
              </Flex>
              <div>
           
                <Box margin={5} ml={5} >
                  <Text fontSize='md' as='b'>Home Theme</Text>
                 <HStack  w={'full'} overflow='auto' whiteSpace={'nowrap'}  scrollbar="hidden" mt={2} spacing='24px'>
                  <Button className="theme" style={{border:homeImage=='1'?'3px solid #7432FF':''}}  onClick={()=>switchTheme(1,"home")}  height={100} width={40}>
                      <Image alt="1" fill sizes="100"  src={image1} style={{
                        borderRadius: '3%',
                       
                      }}/>
                  </Button>
                  <Button className="theme" style={{border:homeImage=='2'?'3px solid #7432FF':''}}   onClick={()=>switchTheme(2,"home")}  height={100} width={40}>
                      <Image alt="2"  fill sizes="100" src={image2} style={{
                        borderRadius: '3%',
                      }}/>
                  </Button>
                  </HStack>
                </Box>
                <Box margin={5} ml={5} >
                  <Text fontSize='md' as='b'>Focus Theme</Text>
                  <HStack  w={'full'} overflow='auto' whiteSpace={'nowrap'}  scrollbar="hidden" mt={2} spacing='24px'>
                  <Button  className="theme" style={{border:focusImage=='1'?'3px solid #7432FF':''}}  onClick={()=>switchTheme(1,"focus")}  height={100} width={40}>

                      <Image alt="1"  fill sizes="100" src={image1} style={{
                       borderRadius: '3%',
                      }}/>
                      
                  </Button>
                  <Button className="theme" style={{border:focusImage=='2'?'3px solid #7432FF':''}}  onClick={()=>switchTheme(2,"focus")}  height={100} width={40}>
                      <Image alt="2"  fill sizes="100" src={image2}  style={{
                        borderRadius: '3%',
                      }}/>
                  </Button>
                  </HStack>
                </Box>
              </div>
              <div>
                <Flex>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              <Text ml={1} fontSize='lg' as='b'>Clock & Timer</Text>
              </Flex>
              <HStack w={'full'} spacing={4} mb={4} overflow='auto' whiteSpace={'nowrap'}  scrollbar="hidden" ml={5}>

                <Flex direction={'column'}>
                <Text  fontSize='md' as='b'>Clock</Text>
                <HStack ml={5} w={'full'} overflow='auto' whiteSpace={'nowrap'}  scrollbar="hidden" mt={2} spacing='24px'>
                  <Button className="theme" style={{border:hour=='h:mm'?'2px solid #7432FF':''}}  onClick={()=>{ setHour('h:mm');}}  height={10} width={20}>
                    <div style={{ opacity:hour=='h:mm'?1:0.5}}>
                    12 Hour   
                    </div>
                  </Button>
                  <Button className="theme" style={{border:hour=='HH:mm'?'2px solid #7432FF':''}}   onClick={()=>{setHour('HH:mm');}}  height={10} width={20}>
                  <div style={{ opacity:hour=='HH:mm'?1:0.5}}>
                    24 Hour     
                    </div>
                  </Button>
                  </HStack>   
                </Flex>

               

               


                </HStack>                         
              <HStack w={'full'} spacing={4} overflow='auto' whiteSpace={'nowrap'}  scrollbar="hidden" ml={5}>

                <Flex direction={'column'}>
                <Text  fontSize='md' as='b'>Pomodoro</Text>
                <InputGroup m={2}>
                <Input  value={focusMinutes} width={20} type="number" onChange={(e)=>{ if((e.currentTarget.value).replace(/^0+/,'')<240){setFocusMinutes((e.currentTarget.value).replace(/^0+/,'')); setFocusTime(`${(e.currentTarget.value).replace(/^0+/,'')}:00`)}} } />
                <InputRightAddon  color="#000" >mins</InputRightAddon>
                </InputGroup>     
                
             
                </Flex>

                <Flex direction={'column' } >
                <Text  fontSize='md' as='b'>Short Break</Text>
                <InputGroup m={2}>
                <Input  value={shortMinutes}   width={20} type="number"  onChange={(e)=>{ if((e.currentTarget.value).replace(/^0+/,'')<240 ){setShortMinutes((e.currentTarget.value).replace(/^0+/,''));  setShort(`${(e.currentTarget.value).replace(/^0+/,'')}:00`)}} }/>
                <InputRightAddon  color="#000">mins</InputRightAddon>
                </InputGroup>
                </Flex>

                <Flex direction={'column'}>
                <Text  fontSize='md' as='b'>Long Break</Text>
                <InputGroup m={2}>
                <Input  value={longMinutes}  width={20} type="number"  onChange={(e)=>{ if((e.currentTarget.value).replace(/^0+/,'')<240){setLongMinutes((e.currentTarget.value).replace(/^0+/,'')); setLong(`${(e.currentTarget.value).replace(/^0+/,'')}:00`)}} } />
                <InputRightAddon  color="#000">mins</InputRightAddon>
                </InputGroup>
                </Flex>
               
              
              </HStack>
              </div>
              <div>
                <Flex>
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="soundsIconTitle" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="soundsIconTitle">Sounds</title> <path d="M12 7L12 17"></path> <path d="M15 10L15 14"></path> <path d="M18 8L18 16"></path> <path d="M21 13L21 11"></path> <path d="M9 4L9 20"></path> <path d="M6 9L6 15"></path> <path d="M3 13L3 11"></path> </g></svg>
              <Text ml={1} color={"white"} fontSize='lg'  as='b'>Sounds</Text>
              </Flex>
              <HStack ml={5} w={'full'} overflow='auto' whiteSpace={'nowrap'}  scrollbar="hidden" mt={2} spacing='24px'>
                  <Button className="theme" style={{border:bgSound=='rain'?'3px solid #7432FF':''}}  onClick={()=>{ if(bgSoundOn){togglBgSound();}setBgSound("rain")}}  height={20} width={20}>
                    <div style={{width:40 , opacity:bgSound=='rain'?1:0.5}}>
                    🌧️   
                    </div>
                  </Button>
                  <Button className="theme" style={{border:bgSound=='ocean'?'3px solid #7432FF':''}}   onClick={()=>{if(bgSoundOn){togglBgSound();}setBgSound("ocean")}}  height={20} width={20}>
                  <div style={{width:35 , opacity:bgSound=='ocean'?1:0.5}}>
                    🌊     
                    </div>
                  </Button>
              </HStack>
              </div>
              {user?
              (authUser?.premium==false &&
              <Flex ml={5}>
              <button   onClick={()=>upgrade()} className=" flex button2  " >
                Upgrade  
                <svg  width="15px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#ffdd00"></path> </g></svg>
                </button>  
              </Flex>
              )
              :
              <Flex ml={5}>
              <button   onClick={()=>upgrade()} className=" flex button2  " >
                Upgrade  
                <svg  width="15px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#ffdd00"></path> </g></svg>
                </button>  
              </Flex>
              }
            </Flex>
          </Box>
          </DrawerBody>
          <DrawerFooter >
          {user && <Button isLoading={isLoggingOut} onClick={() => handleLogout()} >Logout</Button>}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ userSelect: 'none' }}>Focus Priorities</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Stack spacing={4}>

              <Flex  spacing={1}>
              <Checkbox size='lg' isChecked={priority1C} onChange={(e)=>{setPriority1C(e.target.checked),e.target.checked?((!priority2C&&priority2!="")?setPriority0(priority2):((!priority3C&&priority3!="")?setPriority0(priority3):setPriority0("What do you want to focus on?"))):(setPriority0(priority1)) }} colorScheme='pink' >
              </Checkbox>
              <Input focusBorderColor='pink.400' value={priority1} onChange={(e)=>{setPriority1(e.target.value),!priority1C&&setPriority0(e.target.value)}} placeholder={'Type your priority here'} size='lg' />
              </Flex>

              <Flex>
              <Checkbox size='lg'  isChecked={priority2C} onChange={(e)=>{setPriority2C(e.target.checked),e.target.checked?((!priority3C&&priority3!="")?setPriority0(priority3):priority1C&&setPriority0("What do you want to focus on?")):priority1C&&setPriority0(priority2)}}  colorScheme='pink'>
              </Checkbox>
              <Input focusBorderColor='pink.400' value={priority2} onChange={(e)=>{setPriority2(e.target.value),priority1C&&!priority2C&&setPriority0(e.target.value)}} placeholder='Type your priority here' size='lg' />
              </Flex>

              <Flex>
              <Checkbox size='lg' isChecked={priority3C} onChange={(e)=>{setPriority3C(e.target.checked),e.target.checked?(priority1C&&priority2C&&setPriority0("What do you want to focus on?")):(priority1C&&priority2C&&setPriority0(priority3))}}colorScheme='pink'>
              </Checkbox>
              <Input focusBorderColor='pink.400' value={priority3} onChange={(e)=>{setPriority3(e.target.value),priority1C&&priority2C&&!priority3C&&setPriority0(e.target.value)}} placeholder='Type your priority here' size='lg' />
              </Flex>

            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Button colorScheme='red' variant='outline' onClick={()=>{reset()}}>Reset</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});