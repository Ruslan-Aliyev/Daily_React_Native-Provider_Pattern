import { useState, useEffect, createContext, useContext } from 'react';
import Daily from '@daily-co/react-native-daily-js';


const MyDailyContext = createContext({});

const MyDailyProvider = ({ children }) => {
  const [call, setCall] = useState();

  useEffect(() => {
    if (call) return;

    const callObject = Daily.createCallObject();
    callObject.setLocalVideo(false);
    setCall(callObject);
  }, [Daily, call]);

  useEffect(() => {
    if (!call) return;

    call
      .on('joined-meeting', () => handleDailyEvents)
      .on('left-meeting', () => handleDailyEvents)
      .on('participant-joined', () => handleDailyEvents)
      .on('participant-updated', () => handleDailyEvents)
      .on('participant-left', () => handleDailyEvents)
      .on('error', () => handleDailyEvents);
  }, [call]);

  const handleDailyEvents = (event) => {
    if (!call) return;

    console.log({event});
    console.log(event.action);
  };

  return <MyDailyContext.Provider value={{call}}>{children}</MyDailyContext.Provider>;
};

const useMyDaily = () => {
  return useContext(MyDailyContext);
};

export { MyDailyProvider, useMyDaily };