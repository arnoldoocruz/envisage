import {
  SET_NAVBAR_NUM,
  SET_DISPLAY_PROJECT_PANEL,
  SET_SHOW_DETAIL,
  SET_HOME_BACK_NUM,
  SET_FIFTH_SHOW_DETAIL,
  SET_PROJECT_DETAIL_IMAGE_NUM,
  SET_PROJECT_SUMMARY_IMAGE_NUM,
  SET_SHOW_MENU,
  SET_SHOW_LINK,
} from "../constants/actionTypes";

export function setNavbarNum(data) {
  return {
    type: SET_NAVBAR_NUM,
    payload: data,
  };
}
export function setDisplayProjectPanel(data) {
  return {
    type: SET_DISPLAY_PROJECT_PANEL,
    payload: data,
  };
}
export function setShowDetail(data) {
  return {
    type: SET_SHOW_DETAIL,
    payload: data,
  };
}
export function setHomeBackNum(data) {
  return {
    type: SET_HOME_BACK_NUM,
    payload: data,
  };
}
export function setFifthShowDetail(data) {
  return {
    type: SET_FIFTH_SHOW_DETAIL,
    payload: data,
  };
}
export function setProjectDetailImageNum(data) {
  return {
    type: SET_PROJECT_DETAIL_IMAGE_NUM,
    payload: data,
  };
}
export function setProjectSummaryImageNum(data) {
  return {
    type: SET_PROJECT_SUMMARY_IMAGE_NUM,
    payload: data,
  };
}
export function setShowMenu(data) {
  return {
    type: SET_SHOW_MENU,
    payload: data,
  };
}
export function setShowLink(data) {
  return {
    type: SET_SHOW_LINK,
    payload: data,
  };
}
