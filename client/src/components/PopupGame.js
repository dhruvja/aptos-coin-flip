

import React, {useRef, useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import { Button } from 'semantic-ui-react';
import EyeIcon from '../icons/Eyeicon';
import createUpdater from 'react-component-updater';



function PopupGame(props) {

  const ref = useRef();  

    const openTooltip = () => ref.current.open();  
    const closeTooltip = () => ref.current.close();  
    const toggleTooltip = () => ref.current.toggle();

  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(true);
  const [timerId, setTimerId] = useState();

  const [useMyComponentUpdater, updateMyComponent] = createUpdater();



  useEffect(() => {
    if (timer) {
    let id = setTimeout(() => {
      setLoading(false);
    }, 1000);
    setTimerId(id);
    } else if (!timer && timerId) {
    clearTimeout(timerId);
    setLoading(true);
    }
    return () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    }
  }, [timer]);

    
  function stopTimer(){
    updateMyComponent();
    props.blurBg(false);

    clearTimeout(timerId);

    setLoading(true);
    closeTooltip();
    updateMyComponent();
  }

  function newTimer(){
    updateMyComponent();
    props.blurBg();

    setLoading(true);
    clearTimeout(timerId);

    setTimer(timerId);
    updateMyComponent();
  }

  useEffect(() => {
    if (props.gameplayed !== props.gameplayed) {            
    }

    return () => {
      console.log(`prevProps`)

      setLoading(true);
      let id = setTimeout(() => {
        setLoading(false);
      }, 3000);
      setTimer(timerId);
      updateMyComponent();

    }
       
    },[props.gameplayed]);
    
  return (
  <>
  <Popup
    trigger={<Button onclick={()=>updateMyComponent(true)} color={props.gameplayed > 0 ? (null) : ("green")} className="!w-8 !flex !align-center !justify-center !items-center button"> {props.gameplayed > 0 ? (<EyeIcon/>) : ('Play')} </Button>}
    modal
    nested
    ref={ref}
    onOpen={newTimer}
    onClose={stopTimer}
    >
    {close => 
      (
      <>
      <div className="modal">
      {loading ?
        <div className="videopopup">
          <h3>{props.gameplayed > 0 ? ("Launching ...") : (null)}</h3>
      </div>  
      :     
      <div className="videopopup">
        <>{props.gameplayed > 0 ? (<video autoPlay muted className='max-w-screen-md videocoin'>
        <>{props.gameresultvec[0] === "0" ? (<source src='./WAVE_001OK.mp4' type='video/mp4'/>) : (<source src='./WAVE_000OK.mp4' type='video/mp4'/>)} </>
        </video>) : (<></>)}</>
      </div>
      }
        <div className="header !pt-6"> Game: {props.gameid} </div>
        <div className="content">
          <h3>Bet amount: {props.betamount}</h3>
          <h3>Owner choice: {props.ownerchoice}</h3>
        </div>
        <div className='flex align-center justify-center items-center z-10 !h-full'>
          <Button color="green" className={props.gameplayed > 0 ? ('invisible') : ('button !m-3 !mt-4')} onClick={props.playGame}>PLAY</Button>
        </div>
        <div className="actions">
          <div className='flex'>
          <Button className={props.gameplayed > 0 ? ('button !m-3') : ('button invisible !m-3')} onClick={props.claimClick}>CLAIM</Button>
          <Button className="button !m-3" onClick={() => {close()}}>CLOSE</Button>
          </div>
        </div>     
        </div>
        </>
      )}

  </Popup>
  </>
  )

};

export default PopupGame