'use client'
import Image from "next/image";
import { useState  , useEffect} from "react";
import { useDisclosure} from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import {
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
} from '@chakra-ui/react'
import $ from "jquery";
import { Flex } from "@chakra-ui/react";


export default function Home() {
const [bgSound , setBgSound] = useState(false);
const { isOpen: isFirstDraweOpen , onOpen: onFirstDrawerOpen, onClose: onFirstDrawerClose } = useDisclosure()
const { isOpen: isSecondDraweOpen , onOpen: onSecondDrawerOpen, onClose: onSecondDrawerClose } = useDisclosure()
const { isOpen:isModalOpen, onOpen:onModalOpen, onClose:onModalClose } = useDisclosure()
const currentTime = new Date();
const hours = currentTime.getHours().toString().padStart(2, '0');
const minutes1 = currentTime.getMinutes().toString().padStart(2, '0');
const [time, setTime] = useState(`${hours}:${minutes1}`)
const [focus , setFocus] = useState(false)
const [imageUrl , setImageUrl] = useState("https://app.flocus.com/ccb0d385a36dc1178827.jpg")
const [rain, setRain] = useState(typeof Audio !== "undefined" && new Audio("/resources/test.mp3")); 
const [priority1 , setPriority1] = useState("");
const [priority2 , setPriority2] = useState("");
const [priority3 , setPriority3] = useState("");
const [priority1C , setPriority1C] = useState(false);
const [priority2C , setPriority2C] = useState(false);
const [priority3C , setPriority3C] = useState(false);
const [priority0 , setPriority0] = useState("What do you want to focus on?");
const [pomodoro , setPomodoro] = useState('focus')
const [focusTtme , setFocusTime] = useState('25:00')
const [short, setShort] = useState("10:00")
const [long , setLong] = useState("20:00")
const [ minutes, setMinutes ] =  useState(0);
const [ seconds, setSeconds ] =  useState(0);
const [startTimer, setStart] = useState(false)

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
                    setSeconds(5)
                    }
                    else if (pomodoro=='short' && startTimer)
                    {
                      setPomodoro('focus')
                      setSeconds(10)
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
  
   
    // window.onload = displayClock;
    useEffect(() => {
      displayClock()
    }, [])
    
    
    function displayClock(){
      var dateWithoutSecond = new Date().toLocaleTimeString([], {  hour: '2-digit', minute: '2-digit'});
      if(time!=dateWithoutSecond)
      {
        setTime(dateWithoutSecond);
      }
      
      setTimeout(displayClock, 3000); 
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
      if (bgSound)
      {
        setBgSound(false);
        rain.pause();
        rain.src =rain.src
      }
      else
      {
        setBgSound(true)
        rain.loop = true;
        rain.play();
      }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    const togglMode= async()=>{
      setImageUrl("")
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
        setImageUrl("https://app.flocus.com/792e25b707a50d2d7551.jpg")
        
        time1.classList.remove('hidden');
        time1.classList.add('fade-in-image');
        
        focus_text.classList.remove('hidden');
        focus_text.classList.add('fade-in-image');
        
        console.log("Focus")
    }
    else {
        let time1 = document.getElementById("time1");
        time1.classList.add('hidden');
        let focus_text = document.getElementById("focus-text");
        focus_text.classList.add('hidden');
        time1.classList.remove('fade-in-image');
        bg.classList.remove('fade-in-image1');
        $(':checkbox').prop('checked', false).removeAttr('checked');
        console.log("Home")
        setFocus(false)
        await sleep(1)
        let time = document.getElementById("time");
        let home_text = document.getElementById("home-text");
        time.classList.add('hidden');
        home_text.classList.add('hidden');
        await sleep(10)

        bg.classList.add('fade-in-image1');

        setImageUrl("https://app.flocus.com/ccb0d385a36dc1178827.jpg")

        time.classList.remove('hidden');
        time.classList.add('fade-in-image');

        home_text.classList.remove('hidden');
        home_text.classList.add('fade-in-image');
        
    } 
    }

    function reset (){
      setPriority0("What do you want to focus on?");
      setPriority1("")
      setPriority2("")
      setPriority3("")
      setPriority1C(false)
      setPriority2C(false)
      setPriority3C(false)
    }

    function start (){
      const regex = /\d+(?=:)/g;
      // const regex1 = /:\s*(\d+)/g;
      if(pomodoro=='focus')
      {
        let minutes1 = regex.exec(focusTtme)
        setMinutes(minutes1[0]-1)
        // let seconds1 = regex1.exec(focusTtme)
        setSeconds(59)
        setStart(true)
      }
      else if (pomodoro == 'short')
      {
        let minutes1 = regex.exec(short)
        setMinutes(minutes1[0]-1)
        setSeconds(59)
        setStart(true)
      }
      else{
        let minutes1 = regex.exec(long)
        setMinutes(minutes1[0]-1)
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
    style={{'--image-url': `url(${imageUrl})`}} 
    className='bg-[image:var(--image-url)]'>
      <div id="top">
        <div id="top-left" >
        <Image
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
      <div id="home" className="fade-in-image " > 
      <div id="home-text" className="text-white">You nailed it, Azim. Time to unwind.</div>
      <div id="time" className="text-white">{time}</div>
      </div>
      :
      <div id="focus" className="fade-in-image" > 
      <button onClick={onModalOpen} id="focus-text" className="relative z-20 hidden">{priority0}</button>
      <div className="flex relative  justify-center">
      <button className="button1" onClick={()=>{setPomodoro('focus'), setStart(false)}} style={{background:pomodoro=='focus'?'#7432FF':'',border:pomodoro=='focus'?'1px solid #7432FF':''}} >Focus</button>
      <button className="button1" onClick={()=>{setPomodoro('short'), setStart(false)}}   style={{background:pomodoro=='short'?'#7432FF':'',border:pomodoro=='short'?'1px solid #7432FF':''}} >Short Break</button>
      <button className="button1" onClick={()=>{setPomodoro('long'),  setStart(false)}}   style={{background:pomodoro=='long'?'#7432FF':'',border:pomodoro=='long'?'1px solid #7432FF':''}} >Long Break</button>
      </div>
      {!startTimer?
      <>
       {pomodoro=='focus' &&  <div id="time1" className="z-10 fade-in-image1">{focusTtme}</div>}
       {pomodoro=='short' &&  <div id="time1" className="z-10 fade-in-image1">{short}</div>}
       {pomodoro=='long' &&  <div id="time1" className="z-10 fade-in-image1">{long}</div>}
      </>
      :
      <>
      {pomodoro=='focus' &&  <div id="time1" className="z-10 fade-in-image1">{minutes}:{seconds}</div>}
      {pomodoro=='short' &&  <div id="time1" className="z-10 fade-in-image1">{minutes}:{seconds}</div>}
      {pomodoro=='long' &&  <div id="time1" className="z-10 fade-in-image1">{minutes}:{seconds}</div>}
      </>
      }
      <div className="flex relative  justify-center">
      {!startTimer?
      <button onClick={()=>start()} className=" button2 mt-10" >Start</button>
      :
      <button onClick={()=>stop()} className=" button2 mt-10"  >Stop</button>
        }
      </div>
     
      </div>
      
      }
      </div>
      <div id="bottom">
        <div id="bottom-left" className="flex" >
        <button className="button" onClick={onFirstDrawerOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="20" viewBox="0 0 24 24" color="#ffff">
          <path fill="#ffff" d="M 13 3 C 11.895 3 11 3.895 11 5 L 11 8 L 11 14.541016 A 4 4 0 0 0 9 14 A 4 4 0 0 0 5 18 A 4 4 0 0 0 9 22 A 4 4 0 0 0 13 18 L 13 8 L 16.5 8 C 17.881 8 19 6.881 19 5.5 C 19 4.119 17.881 3 16.5 3 L 13 3 z"></path>
        </svg>
        </button>
        </div>
        <div id="bottom-right" className="flex">

        <div className="switch-toggle m-0.5" >
          <input className="switch-toggle-checkbox" type="checkbox" id="focus"  onChange={()=>togglMode()}/>
          <label className="switch-toggle-label" for="focus">
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
          <div style={{width:35 , opacity:bgSound?1:0.5}}>
          🌊     
          </div>
        </button>
        </div>
      </div>
      <Drawer placement={'left'} onClose={onFirstDrawerClose} isOpen={isFirstDraweOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer placement={'right'} onClose={onSecondDrawerClose} isOpen={isSecondDraweOpen}  size={'xl'}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Focus Priorities</ModalHeader>
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
