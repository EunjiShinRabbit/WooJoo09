
import { useState,  useEffect } from "react";
import { NavLink } from "react-router-dom";
import fashion from "../resources/fashion_sample.png";
import "../style/chat.scss"
import "../style/common.scss"
import api from "../api/api"

const ChatList = () =>{

  const [seller, setSeller] = useState('');
  const [lists, setLists] = useState('');
  const [loading, setLoading] = useState(false);
  const [prepared, setPrepared] = useState(false);

  const onChangeSeller = () => {

  }

  useEffect(() => {
    const fetchData = async () => {
     setLoading(true);
      try {
        const response = await api.chatList();
        setLists(response.data[0]);
        console.log(response.data);
        console.log(response.data[0]);
        setPrepared(true);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return(
    <div className="wrapperLeft">
            <div className="chatList">
                채팅목록
            </div>
            { prepared && 
            lists.chatListContent.map(({nickname, img_url, chat_time, chat_content, is_read }) => (
                <div className="chatDetail">
              <div className="chatButton">
                  <NavLink to="/chat" onChange={onChangeSeller} >
                    <p>
                      <div><img src = {img_url} alt="물품이미지"/></div>
                      <p className="chatDetailNick">{nickname}</p>
                      <p className="chatTime">{chat_time.substr(0,11)}</p>
                      <div className="chatRecent">{chat_content}</div>
                      {is_read === "UNREAD" && <p className="chatAlert"/>}
                    </p>
                  </NavLink> 
                </div>
            </div>
            

              ))
            }
            

    </div>
  );
}
export default ChatList