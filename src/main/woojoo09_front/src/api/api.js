import axios from "axios";
import { useContext } from 'react'; // useContext를 불러온다.
import { UserInfoContextStore } from "../stores/UserInfoContext"
import { getCookie } from "../util/cookie";
const HEADER = {"Content-type" : "application/json"}
// const HEADER = 'application/json';
const BASE_URL = "http://localhost:9009/developerkirby/";

axios.defaults.withCredentials = true; // withCredentials 전역 설정
  // const cookieSet = {
  //   withCredentials: true
  // 안되면 헤더 앞에 이 object 추가해서 보내기}
const api = {
  tokencheck: async function() {
    const tokenCmd = {
      cmd : "tokencheck"
    }
    return await axios.post(BASE_URL + "tokencheck", tokenCmd, HEADER);
  },

  maketokentest: async function() {
    const testCmd = {
      cmd: "test"
    }
    return await axios.post(BASE_URL+ "test", testCmd, HEADER);
  },
  tradeSearchSelect: async function(target, page, size) {
    const searchSelectCmd = {
      target: target,
      page: page,
      size: size
    }
    return await axios.post(BASE_URL+ "searchselect", searchSelectCmd, HEADER);
  },
  chatReadCheck: async function() {
    const chatReadCheckCmd = {
      cmd: "chatReadCheck"
    }
    return await axios.post(BASE_URL+ "chatreadcheck", chatReadCheckCmd, HEADER);
  },
  tradeSelect: async function(option, city, town, page, size) {
    const tradeSelectCmd = {
      option: option,
      city: city,
      town: town,
      page: page,
      size: size
    }
    return await axios.post(BASE_URL+ "tradeselect", tradeSelectCmd, HEADER);
  },
  tradeSelectCategory: async function(category, option, city, town, page, size) {
    const tradeSelectCmd = {
      category: category,
      option: option,
      city: city,
      town: town,
      page: page,
      size: size
    }
    return await axios.post(BASE_URL+ "tradeselectcategory", tradeSelectCmd, HEADER);
  },
  starInsert: async function(target) {
    const starInsertCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "starinsert", starInsertCmd, HEADER);
  },
  starDelete: async function(target) {
    const starDeleteCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "stardelete", starDeleteCmd, HEADER);
  },
  tradeCount: async function() {
    const tradeDetailSelectCmd = {
      cmd: "countTrade"
    }
    return await axios.post(BASE_URL+ "tradecount", tradeDetailSelectCmd, HEADER);
  },
  tradeInsert: async function( imgUrl, representUrl, category, product, price, 
    limitPartner, dueDate, tradeMethod, city, town, tradePlace, productDetail) {
    const tradeInsertCmd = {
      representUrl: representUrl,
      category : category,
      product: product,
      price: price,
      limitPartner: limitPartner,
      dueDate: dueDate,
      tradeMethod: tradeMethod,
      city: city,
      town: town,
      tradePlace: tradePlace,
      productDetail: productDetail,
      imgUrl: imgUrl
    }
    return await axios.post(BASE_URL+ "tradeinsert", tradeInsertCmd, HEADER);
  },
  tradeImgUpdate: async function(tradeNum) {
    const tradeImgUpdateCmd = {
      tradeNum: tradeNum
    }
    return await axios.post(BASE_URL+ "tradeimgupdate", tradeImgUpdateCmd, HEADER);
  },
  countNthTrade: async function(tradeNum) {
    const countNthTradeCmd = {
      tradeNum: tradeNum
    }
    return await axios.post(BASE_URL+ "countnthtrade", countNthTradeCmd, HEADER);
  },
  tradeUpdate: async function( tradeNum, imgUrl,
    representUrl, category, product, price, limitPartner, dueDate, tradeMethod, city, town, tradePlace, productDetail) {
    const tradeUpdateCmd = {
      tradeNum :  tradeNum,
      representUrl: representUrl,
      category : category,
      product: product,
      price: price,
      limitPartner: limitPartner,
      dueDate: dueDate,
      tradeMethod: tradeMethod,
      city: city,
      town: town,
      tradePlace: tradePlace,
      productDetail: productDetail,
      imgUrl: imgUrl
    }
    return await axios.post(BASE_URL+ "tradeupdate", tradeUpdateCmd, HEADER);
  },
  tradeDetailSelect: async function(target) {
    const tradeDetailSelectCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "tradedetailselect", tradeDetailSelectCmd, HEADER);
  },
  tradeDetailImgSelect: async function(target) {
    const tradeDetailImgSelectCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "tradedetailimgselect", tradeDetailImgSelectCmd, HEADER);
  },
  partnerInsert: async function(target) {
    const partnerInsertCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "partnerinsert", partnerInsertCmd, HEADER);
  },
  partnerDelete: async function(target) {
    const partnerDeleteCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "partnerdelete", partnerDeleteCmd, HEADER);
  },
  partnerDeleteHost: async function(target, partner) {
    const partnerDeleteHostCmd = {
      target: target,
      partner : partner
    }
    return await axios.post(BASE_URL+ "partnerdeletehost", partnerDeleteHostCmd, HEADER);
  },
  partnerAccept: async function(target, partner) {
    const partnerAcceptCmd = {
      target: target,
      partner : partner
    }
    return await axios.post(BASE_URL+ "partnerinsert", partnerAcceptCmd, HEADER);
  },
  complainInsert: async function(target) {
    const complainInsertCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "complaininsert", complainInsertCmd, HEADER);
  },
  tradeDelete: async function(target) {
    const tradeDeleteCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "tradedelete", tradeDeleteCmd, HEADER);
  },
  tradeClose: async function(tradeNum) {
    const tradeCloseCmd = {
      tradeNum: tradeNum
    }
    return await axios.post(BASE_URL+ "tradeclose", tradeCloseCmd, HEADER);
  },
  tradeFinish: async function(tradeNum) {
    const tradeFinishCmd = {
      tradeNum: tradeNum
    }
    return await axios.post(BASE_URL+ "tradefinish", tradeFinishCmd, HEADER);
  },
  doneTradeUpdateFull: async function(target) {
    const doneTradeUpdateFullCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "donetradeupdatefull", doneTradeUpdateFullCmd, HEADER);
  },
  doneTradeUpdateDone: async function(target) {
    const doneTradeUpdateDoneCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "donetradeupdatedone", doneTradeUpdateDoneCmd, HEADER);
  },
  hostTradeSelect: async function() {
    const hostTradeSelectCmd = {
      cmd : "hostTradeSelect"
    }
    return await axios.post(BASE_URL+ "hosttradeselect", hostTradeSelectCmd, HEADER);
  },
  partnertTradeSelectReject: async function(target) {
    const partnertTradeSelectRejectCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "partnertradeselectreject", partnertTradeSelectRejectCmd, HEADER);
  },
  partnerTradeSelectOngoing: async function(target) {
    const partnerTradeSelectOngoingCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "partnertradeselectongoing", partnerTradeSelectOngoingCmd, HEADER);
  },
  partnerTradeSelectDone: async function(target) {
    const partnerTradeSelectDonetCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "partnertradeselectdone", partnerTradeSelectDonetCmd, HEADER);
  },
  starTradeSelect: async function(target) {
    const starTradeSelectCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "startradeselect", starTradeSelectCmd, HEADER);
  },
  goodInsert: async function(target) {
    const goodInsertCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "goodinsert", goodInsertCmd, HEADER);
  },
  dislikeInsert: async function(target) {
    const dislikeInsertCmd = {
      target: target
    }
    return await axios.post(BASE_URL+ "dislikeinsert", dislikeInsertCmd, HEADER);
  },
  bannerSelect: async function() {
    const bannerSelectCmd = {
      cmd: "bannerSelect"
    }
    return await axios.post(BASE_URL+ "bannerselect", bannerSelectCmd, HEADER);
  },  
  bannerInsert: async function(name, url) {
    const bannerInsertCmd = {
      name: name,
      url : url
    }
    return await axios.post(BASE_URL+ "bannerinsert", bannerInsertCmd, HEADER);
  },  
  bannerUpdate: async function(bannerNum, name, url, isActive) {
    const bannerUpdateCmd = {
      bannerNum : bannerNum,
      name: name,
      url : url,
      isActive : isActive
    }
    return await axios.post(BASE_URL+ "bannerupdate", bannerUpdateCmd, HEADER);
  },  
  bannerDelete: async function(bannerNum) {
    const bannerDeleteCmd = {
      bannerNum: bannerNum
    }
    return await axios.post(BASE_URL+ "bannerdelete", bannerDeleteCmd, HEADER);
  },  
  //회원가입
  memberReg: async function(regId, regPwd, regNick, regName, regEmail, birthDate, regPhone) {
    const regCheck = {
      regId : regId,
      regPwd : regPwd,
      regNick : regNick,
      regName : regName,
      regEmail : regEmail,
      birthDate : birthDate,
      regPhone : regPhone,
      adOk : localStorage.getItem("adOk")
    }
    return await axios.post(BASE_URL + "memberinsert", regCheck, HEADER);
  },

  //가입축하이메일
  celMailSend: async function(regEmail) {
    const celMail = {
      regEmail: regEmail
    }
    return await axios.post(BASE_URL + "sendcelmail", celMail, HEADER);
  },

  //아이디 중복체크
  memberIdDup: async function(regId) {
    const regIdDup = {
      regId : regId
    }
    return await axios.post(BASE_URL + "iddup", regIdDup, HEADER);
  },

  //닉네임 중복체크
  memberNickDup: async function(regNick) {
    const regNickDup = {
      regNick: regNick
    }
    return await axios.post(BASE_URL + "nickdup", regNickDup, HEADER);
  },

  //아이디 찾기
  memberfindId: async function(findIdName, findIdEmail) {
    const findId = {
      findIdName: findIdName,
      findIdEmail: findIdEmail
    }
    return await axios.post(BASE_URL + "findid", findId, HEADER);
  },

  //이메일로 회원정보 가져오기
  memberinfoFindId: async function(findIdEmail) {
    const finIdMember = {
      findIdEmail: findIdEmail
    }
    return await axios.post(BASE_URL + "findidmember", finIdMember, HEADER);
  },

  //비밀번호 찾기
  nameEmailCk: async function(findPwdName, findPwdEmail) {
    const findPwd = {
      findPwdName: findPwdName,
      findPwdEmail: findPwdEmail
    }
    return await axios.post(BASE_URL + "findpwd", findPwd, HEADER);
  },

  //휴대폰번호 인증
  memberPhoneReg: async function(regPhone) {
    const regPhoneCk = {
      regPhone: regPhone
    }
    return await axios.post(BASE_URL + "phoneverify", regPhoneCk, HEADER);
  },


  // 채팅 리스트 가져오기
  chatList: async function(chatListContent){
    const chatList = {

    }
    return await axios.post(BASE_URL + "chatListSelect", chatList, HEADER);
  }
  
}

export default api;