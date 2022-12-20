import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"
import "../style/common.scss"
import "../style/member.scss"
import MemberInfoList from "../components/MemeberInfoList";
import fashionImg from "../resources/fashion_sample.png"
import angel from "../resources/angel_gray4.png"
import angel_lemon from "../resources/angel_lemon.png"
import angel_yellow from "../resources/angel_yellow.png"
import devil from "../resources/devil_gray4.png"
import devil_pink from "../resources/devil_pink.png"
import devil_red from "../resources/devil_red.png"
import {useLocation} from 'react-router-dom';
import api from "../api/api";
import useInfiniteScroll from "../util/useInfiniteScroll"
import { defaultImgs } from "../util/util";

const MyTradePage =() =>{
  const [thisDate, setThisDate] =  useState(new Intl.DateTimeFormat('kr').format(new Date()));
  const [lists, setLists] = useState([]);
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const [isLogin, setIsLogin] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const changeIsLogin = (value) => {
      setIsLogin(value);
  };
  const changeIsAdmin = (value) => {
      setIsAdmin(value);
  };


  const location = useLocation();
  const name = location.state.name;
  const value = location.state.value;
  const memberInfo = location.state.memberInfo;

  const [changeGood, setChangeGood] = useState(false);
  const [changeDislike, setChangeDislike] = useState(false);
  const [tradeCloseMsg, setTradeCloseMsg] = useState();

  const TradeSelect = async () => {
    if(value === "myHostTrade"){
      try {
        const fetchData = async () => {
          const response = await api.hostTradeSelect(page, size);
          setLists(prev => ([...prev, ...response.data.content.content]));;
          setPage(page + 1);
          if(response.data.content.last === true) setIsLastPage(true)
        }
        fetchData();
      } catch(e) {
        console.log(e);
      };
    } else if(value === "myWaitTrade"){
      try {
        const fetchData = async () => {
          const response = await api.partnerTradeSelectReject(page, size);
          setLists(prev => ([...prev, ...response.data.content.content]));;
          setPage(page + 1);
          if(response.data.content.last === true) setIsLastPage(true)
        }
        fetchData();
      } catch(e) {
        console.log(e);
      };
    } else if(value === "myJoinTrade"){
      try {
        const fetchData = async () => {
          const response = await api.partnerTradeSelectOngoing(page, size);
          setLists(prev => ([...prev, ...response.data.content.content]));;
          setPage(page + 1);
          if(response.data.content.last === true) setIsLastPage(true)
        }
        fetchData();
      } catch(e) {
        console.log(e);
      };
    } else if(value === "myDoneTrade"){
      try {
        const fetchData = async () => {
          const response = await api.partnerTradeSelectDone(page, size);
          setLists(prev => ([...prev, ...response.data.content.content]));;
          setPage(page + 1);
          if(response.data.content.last === true) setIsLastPage(true)
        }
        fetchData();
      } catch(e) {
        console.log(e);
      };
    } else{
      try {
        const fetchData = async () => {
          const response = await api.starTradeSelect(page, size);
          setLists(prev => ([...prev, ...response.data.content.content]));;
          setPage(page + 1);
          if(response.data.content.last === true) setIsLastPage(true)
        }
        fetchData();
      } catch(e) {
        console.log(e);
      };
    }
  }

  useEffect(() => {
    TradeSelect();
  }, []);

  const tradeFinish = (tradeNum) =>{
    const fetchData = async () => {
      try {
        const response = await api.tradeFinish(tradeNum);
        console.log(response.data);
        if(response.data.finishTrade === "loginError") {
          setTradeCloseMsg("로그인 상태를 확인해주세요");
        } else if(response.data.finishTrade === "duplicate"){
          setTradeCloseMsg("이미 종료한 공동구매 입니다");
        }
        else setTradeCloseMsg("종료 처리 되었습니다");
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }

  return(
    <div>
      <Header
      isLogin={isLogin} 
      changeIsLogin={changeIsLogin}
      isAdmin={isAdmin}
      changeIsAdmin={changeIsAdmin}/>  
      <div className="memberinfomain">
      <MemberInfoList memberInfo={memberInfo}/>
        <div className="memberinfocenter">
        
          <div className="MyTradeWrapper"> 
          <p>{name}</p>
          {lists && lists.map(list => (
          <p className="MyTradePos">
            <Link to = {`/detail/${list.tradeNum}`} className="MyTradeImg">
              {list.representImg? <img src={list.representImg} alt="상품 대표 이미지"/> : 
              <img src={list.categoryName === "패션" ? defaultImgs.패션.imgUrl :
              (list.categoryName === "뷰티" ? defaultImgs.뷰티.imgUrl : 
              (list.categoryName === "생활" ? defaultImgs.생활.imgUrl : 
              (list.categoryName === "식품" ? defaultImgs.식품.imgUrl :
              (list.categoryName === "취미" ? defaultImgs.취미.imgUrl : defaultImgs.반려동물.imgUrl))))
              } alt="상품 대표 이미지"/>}
            </Link>
            <Link to = {`/detail/${list.tradeNum}`}>{list.product}</Link>
            <p>D {Math.floor((new Date(list.dueDate).getTime() - new Date(thisDate).getTime()) / (1000 * 60 * 60 * 24)) > 0?
              ` - ${Math.floor((new Date(list.dueDate).getTime() - new Date(thisDate).getTime()) / (1000 * 60 * 60 * 24))}` :
              (Math.floor((new Date(list.dueDate).getTime() - new Date(thisDate).getTime()) / (1000 * 60 * 60 * 24)) < 0 ? 
              ` + ${Math.abs(Math.floor((new Date(list.dueDate).getTime() - new Date(thisDate).getTime()) / (1000 * 60 * 60 * 24)))}`
              : ` - DAY`)
              }</p>
            {value === "myDoneTrade" &&
            <>
              <div className="MyTradeGood" onClick={()=> {setChangeGood(true)}}>
                <img src={angel} alt="기본 좋아요" className="MyTradeImg"/>
                <img src={angel_lemon} alt="hover시 좋아요" className="MyTradeImg2"/>
                {!changeDislike && changeGood && <img src={angel_yellow} alt="좋아요 누름" className="MyTradeImg3"/>}
              </div>
              <div className="MyTradeDislike" onClick={()=> {setChangeDislike(true)}}>
                <img src={devil} alt="기본 싫어요" className="MyTradeImg"/>
                <img src={devil_pink} alt="hover시 싫어요" className="MyTradeImg2"/>
                {!changeGood&& changeDislike &&<img src={devil_red} alt="싫어요 누름" className="MyTradeImg3"/>}
              </div>
            </>
            }
            {value === "myHostTrade" && list.doneTrade === "FULL" &&
            <div className="MyTradeGood">
              <button style = {{zIndex : 100}} onClick={()=>{tradeFinish(list.tradeNum)}}>거래 종료하기</button>
              {tradeCloseMsg && <p>{tradeCloseMsg}</p>}
            </div>
            }
          </p>        
          ))}
          {!isLastPage && <button onClick={TradeSelect}>더보기</button>}
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default MyTradePage;