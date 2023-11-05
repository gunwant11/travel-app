export const initialState = {
    user: {
      username: null
    },
    confirmationEmail:'gunwant7272@gmail.com',
    createJourneyLoading: false,
    createdJourney: null,
    getJourneyLoadingState: false,
    getJourney: null,
    categories: null,
    deleteJourneyLoadingState: false,
    deleteJourney: null,
    updateJourneyLoading: false,
    updateJourney: null,
    journeys: null,
  
  
  };
  
  const userReducer = (state =initialState , action) => {
  
    switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_CONFIRMATION_EMAIL":
      return {
        ...state,
        confirmationEmail: action.confirmationEmail,
      };
    case "CREATE_JOURNEY_LOADING":
      return {
        ...state,
        createJourneyLoading: action.createJourneyLoading
      }
    case "CREATE_JOURNEY":
      return {
        ...state,
        createdJourney: action.createdJourney
      }
    case "GET_JOURNEYS_LOADING":
      return {
        ...state,
        getJourneyLoadingState: action.getJourneyLoadingState
      }
    case "GET_JOURNEYS":
      return {
        ...state,
        journeys: action.journeys
      }
    case "UPDATE_JOURNEY_LOADING":
      return {
        ...state,
        updateJourneyLoading: action.updateJourneyLoading
      }
    case "UPDATE_JOURNEY":
      return {
        ...state,
        updateJourney: action.updateJourney
      }
    case "DELETE_JOURNEY_LOADING":
      return {
        ...state,
        deleteJourneyLoading: action.deleteJourneyLoading
      }
    case "DELETE_JOURNEY":
      return {
        ...state,
        deleteJourney: action.deleteJourney
      }
    case "GET_JOURNEYS_BY_DATE":
      return {
        ...state,
        journeysByDate: action.journeysByDate
      }
    case "GET_JOURNEYS_BY_DATE_LOADING":
      return {
        ...state,
        getJourneyByDateLoadingState: action.getJourneyByDateLoadingState
      }
    default:
      return state;
    }
  }
  
  export default userReducer