import { createContext, useContext } from "react";
import userReducer, { initialState } from "./useReducer";
import React from "react";
import 'react-native-get-random-values';
import { useReducer } from "react";
import { API, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from 'native-base';
// import * as journeyService from '../services/journeyService'
export const userActionTypes = {
  SET_CONFIRMATION_EMAIL: "SET_CONFIRMATION_EMAIL",
  SET_USER: "SET_USER",
  CREATE_JOURNEY: "CREATE_JOURNEY",
  CREATE_JOURNEY_LOADING: "CREATE_JOURNEY_LOADING",
  GET_JOURNEYS: "GET_JOURNEYS",
  GET_JOURNEYS_LOADING: "GET_JOURNEYS_LOADING",
  DELETE_JOURNEY: "DELETE_JOURNEY",
  DELETE_JOURNEY_LOADING: "DELETE_JOURNEY_LOADING",
  UPDATE_JOURNEY: "UPDATE_JOURNEY",
  UPDATE_JOURNEY_LOADING: "UPDATE_JOURNEY_LOADING",
  GET_JOURNEYS_BY_DATE: "GET_JOURNEYS_BY_DATE",
  GET_JOURNEYS_BY_DATE_LOADING: "GET_JOURNEYS_BY_DATE_LOADING",
}

const UserContext = createContext(initialState);

const handleNotification = (message, type) => {
  let backgroundColor = "#000";
  if(type === "success") backgroundColor = "#00b894";
  if(type === "error") backgroundColor = "#d63031";
  if(type === "warning") backgroundColor = "#fdcb6e";

  Toast.show({
    title: type,
    description: message,
    placement: "top",
    duration: 3000,
    variant: "solid",
    isClosable: true,
    style: {
      backgroundColor,
      borderRadius: 10,
      padding: 15,
      margin: 10,
      width: "100%",
      alignSelf: "center",
    },
  })
}


export const UserProvider = ({children})=>{
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => {
    dispatch({
      type: userActionTypes.SET_USER,
      user,
    });
  };

  const setConfirmationEmail = (confirmationEmail) => {
    dispatch({
      type: userActionTypes.SET_CONFIRMATION_EMAIL,
      confirmationEmail,
    });
  };


  const createJourney = async (title, description, content, descHTML, mood, imageKey, date, callback) =>{
    const journeyId = uuidv4();
    try{
      createJourneyLoading(true)
      const createdJourney = await journeyService.createJourney(state.user.username, title, description, content, descHTML, mood, imageKey);
      console.log(createdJourney, 'created journey')
      dispatch({
        type: userActionTypes.CREATE_JOURNEY,
        createdJourney
      })
      createJourneyLoading(false)
      if(callback) callback()
       handleNotification("Journey created successfully", "success")
    } catch (err) {
      createJourneyLoading(false)
      console.log(err)
      handleNotification("Error creating journey", "error")
    }
  } 

  const createJourneyLoading = (createJourneyLoadingState) => {
    dispatch({
      type: userActionTypes.CREATE_JOURNEY_LOADING,
      createJourneyLoadingState
    })
  }



  const getJourney = async (createdAt, journeyId) =>{
    try{
      getJourneyLoading(true);
      const journeys =  await journeyService.getJourneys(state.user.username, createdAt, journeyId) 
      console.log('journalsWithImages' , journeys)
      dispatch({
        type: userActionTypes.GET_JOURNEYS,
        journeys 
      })
      getJourneyLoading(false);
    }catch(err){
      getJourneyLoading(false)
      console.log(err, 'error')
    }
  }

  const getJourneyLoading = (getJourneyLoadingState) =>{
    dispatch({
      type: userActionTypes.GET_JOURNEYS_LOADING,
      getJourneyLoadingState
    })
  }


  const deleteJourney = async (journeyId, createdAt, callback  ) =>{
    try{
      deleteJourneyLoading(true)
      const deletedJourney = await journeyService.deleteJourney(state.user.username, journeyId, createdAt)
      dispatch({
        type: userActionTypes.DELETE_JOURNEY,
        deletedJourney
      })
      deleteJourneyLoading(false)
      handleNotification("Journey deleted successfully", "success")
      if(callback) callback()
    }catch(err){
      deleteJourneyLoading(false)
      console.log(err)
      handleNotification("Journey not deleted", "error")
    }
  }

const deleteJourneyLoading = (deleteJourneyLoading) =>{
    dispatch({
      type: userActionTypes.DELETE_JOURNEY_LOADING,
      deleteJourneyLoading
    })
  }

  const updateJourney = async (journeyId, title, description, content) =>{
    try{
      updateJourneyLoading(true)
      const updatedJourney = await  journeyService.updateJourney(state.user.username, journeyId, title, description, content)
      dispatch({
        type: userActionTypes.UPDATE_JOURNEY,
        updatedJourney
      })
      updateJourneyLoading(false)
      handleNotification('Journey Updated', 'success')
    }catch(err){
      updateJourneyLoading(false)
      console.log(err)
      handleNotification('Journey Update Failed', 'error')
    }
  }

  const updateJourneyLoading = (updateJourneyLoading) =>{
    dispatch({
      type: userActionTypes.UPDATE_JOURNEY_LOADING,
      updateJourneyLoading
    })
  }


  const getJourneyByDate = async (date) =>{
    try{
      getJourneyByDateLoading(true)
      const journeys = await journeyService.getJourneys(state.user.username, date) 
      console.log('journalsWithImages' , journeys)
      dispatch({
        type: userActionTypes.GET_JOURNEYS_BY_DATE,
        journeysByDate : journeys
      })
      getJourneyByDateLoading(false)
    }catch(err){
      getJourneyByDateLoading(false)
      console.log(err)
    }
  }

  const getJourneyByDateLoading = (getJourneyByDateLoadingState) =>{
    dispatch({
      type: userActionTypes.GET_JOURNEYS_BY_DATE_LOADING,
      getJourneyByDateLoadingState
    })
  }



  const value = {
    user: state.user,
    confirmationEmail: state.confirmationEmail,
    journeys: state.journeys,
    journeysByDate : state.journeysByDate,
    setUser,
    setConfirmationEmail,
    createJourneyLoading,
    createJourney,
    getJourney,
    getJourneyLoading,
    deleteJourney,
    deleteJourneyLoading,
    updateJourney,
    updateJourneyLoading,
    getJourneyByDate,
    getJourneyByDateLoading
  };


  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
};

const useAppContext = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error("useContext must be used within UserContext")
  }
  
  return context;
}
  
export default useAppContext;