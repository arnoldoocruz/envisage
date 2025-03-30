import {
  SET_NAVBAR_NUM,
  SET_DISPLAY_PROJECT_PANEL,
  SET_SHOW_DETAIL,
  SET_HOME_BACK_NUM,
  SET_FIFTH_SHOW_DETAIL,
  SET_PROJECT_DETAIL_IMAGE_NUM,
  SET_PROJECT_SUMMARY_IMAGE_NUM,
  SET_SHOW_MENU,
  SET_SHOW_LINK
} from '../constants/actionTypes';

export default (state = { navbarNum: 0, 
                          displayProjectPanel: false, 
                          showDetail: false, 
                          homeBackNum: 0, 
                          fifthShowDetail: false, 
                          projectDetailImageNum: 0, 
                          projectSummaryImageNum: 0,
                          showMenu: false,
                          showLink: false,
                         }, action) => {
  switch (action.type) {
    case SET_NAVBAR_NUM:
      return {
        ...state,
        navbarNum: action.payload,
      };
    case SET_DISPLAY_PROJECT_PANEL:
      return {
        ...state,
        displayProjectPanel: action.payload,
      }
    case SET_SHOW_DETAIL:
      return {
        ...state,
        showDetail: action.payload,
      }
    case SET_HOME_BACK_NUM:
      return {
        ...state,
        homeBackNum: action.payload,
      }
    case SET_FIFTH_SHOW_DETAIL:
      return {
        ...state,
        fifthShowDetail: action.payload,
      }
    case SET_PROJECT_DETAIL_IMAGE_NUM:
      return {
        ...state,
        projectDetailImageNum: action.payload,
      }
    case SET_PROJECT_SUMMARY_IMAGE_NUM:
      return {
        ...state,
        projectSummaryImageNum: action.payload,
      }
    case SET_SHOW_MENU:
      return{
        ...state,
        showMenu: action.payload,
      }
    case SET_SHOW_LINK:
      return{
        ...state,
        showLink: action.payload,
      }
    default:
      return state;
  }
};
