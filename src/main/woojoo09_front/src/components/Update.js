import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Map from './Map'
import {categories, citys, towns, uuidv4} from "../util/util"
import { storage } from "../api/firebase"
import representIcon from "../resources/representImg_icon.png"
import imgIcon from "../resources/images_icon.png"
import api from '../api/api'

const Update = () =>{
  const navigate = useNavigate();
  const location = useLocation();

  const tradeNum = location.state.tradeNum;
  const memberNum = location.state.memberNum;
  const previousData = location.state.data.detail;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.tradeImgUpdate(tradeNum);
        // console.log(response.data);
        if(response.data.tradeImageUpdate === "OK"){
          if(response.data.images){
            setUrls(response.data.images);
          }
          setRepresentUrl(response.data.representImg[0]);
        } else{
          
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.countnthtrade(tradeNum);
  //       console.log(response.data);
  //       if(response.data.numOfTrade === "error"){
  //         navigate('/main');
  //       } else{
  //         setNumOfTrade(response.data.numOfTrade);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const [category, setCategory] = useState(previousData.categoryName);
  const [name, setName] = useState(previousData.product);
  const [price, setPrice] = useState(previousData.price);
  const [city, setCity] = useState(previousData.city);
  const [town, setTown] = useState(previousData.town);
  const [countPartner, setCountPartner] = useState(String(previousData.limitPartner));
  const [productDetail, setProductDetail] = useState(previousData.productDetail);
  var now = new Date();
  const [thisDate, setThisDate] =  useState(new Intl.DateTimeFormat('kr').format(now));
  const firstDate = new Date(now.setDate(now.getDate() + 1)); // ?????? 1?????????
  const middleDate = new Date(now.setDate(now.getDate() + 7)); // ????????? ??????
  const lastDate = new Date(now.setDate(now.getDate() + 14)); // ?????? 14???
  var prevDateStr = String(previousData.dueDate);
  const [dueYear, setDueYear] = useState(Number(prevDateStr.split('-')[0]));
  const [dueMonth, setDueMonth] = useState(Number(prevDateStr.split('-')[1]));
  const [dueDay, setDueDay] = useState(Number(prevDateStr.split('-')[2].substring(0,2))); // ????????? ?????????
  var prevDate = new Date(dueYear, dueMonth, dueDay);
  const [dueDate, setDueDate] = useState(prevDate.getFullYear() +
  '-' + ( (prevDate.getMonth()+1) < 9 ? "0" + (prevDate.getMonth()+1) : (prevDate.getMonth()+1) )+
  '-' + ( (prevDate.getDate()) < 9 ? "0" + (prevDate.getDate()) : (prevDate.getDate()) ))
  const [tradeMethod, setTradeMethod] = useState(previousData.tradeMethod.toLowerCase());
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [representImg, setRepresentImg] = useState(null);
  const [representUrl, setRepresentUrl] = useState("");
  const [representErr, setRepresentErr] = useState("");
  const [error, setError] = useState("");

  const [categoryErr, setCategoryErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [limitPartErr, setLimitPartErr] = useState("");
  const [tradeMethodErr, setTradeMethodErr] = useState("");
  const [dueDateErr, setDueDateErr] = useState("");
  const [detailErr, setDetailErr] = useState("");

  const [isName, setIsName] = useState(true);
  const [isPrice, setIsPrice] = useState(true);
  const [isTradeMethod, setIsTradeMethod] = useState(true);
  const [isDetail, setIsDetail] = useState(true);
  const [isDate, setIsDate] = useState(true);

  const [inputTradePlace, setInputTradePlace] = useState(previousData.tradePlace);
  const [tradePlace, setTradePlace] = useState(previousData.tradePlace);

  const [displayMap, setDisplayMap] = useState(false);
  const [insertMsg, setInsertMsg] = useState("");

  const [numOfTrade, setNumOfTrade] = useState("");

  const [tradePlaceErr, setTradePlaceErr] = useState("");

  const tradeUpdate = () =>{
    //imgUrl,representUrl, category, product, price, limitPartner, 
    //dueDate, tradeMethod, city, town, tradePlace, productDetail
    // console.log("imgUrl : " + urls + "\nrepresentUrl : " + representUrl + "\ncategory : " + category +
    // "\nname : " + name +"\nprice : "+ price + "\ncountPartner : " + countPartner + "\ndueDate : " + dueDate +
    //   "\ntradeMethod : " + tradeMethod + "\ncity : " + city + "\ntown : " + town + 
    //   "\ninputTradePlace : " + inputTradePlace + "\nproductDetail : " + productDetail)
    const fetchData = async () => {
      try {
        const response = await api.tradeUpdate(tradeNum, urls, representUrl, category, name, String(price), countPartner,
          dueDate, tradeMethod, city, town, inputTradePlace, productDetail);
        // console.log(response.data);
        if(response.data.completeTrade === "loginError") {
          setInsertMsg("????????? ????????? ?????? ????????????");
        } 
        else if(response.data.completeTrade === "OK"){
          setInsertMsg("??????????????? ?????? ???????????????\n ???????????? ???????????????");
          setTimeout(()=>{ 
            navigate(`detail/${tradeNum}`);
          }, 2500);
        }else{
          setInsertMsg("???????????? ????????? ??????????????????");
        }
      } catch (e) {
        console.log(e);
      }
      // setLoading(false);
    };
    fetchData();
  }

  function checkValidDate(y, m ,d) {
    var result = true;
    try {
        var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
        result = dateRegex.test(d+'-'+m+'-'+y);
    } catch (err) {
      result = false;
    }    
      return result;
  }

  const onChangeDueYear = (e) => {
    const year = e.target.value;
    setDueYear(e.target.value);
    if(year < 1000){
      setDueDateErr("?????? ????????? ??????????????????");
      setIsDate(false);
    }else{
      const month = (String(dueMonth -1).length === 1 ? "0"+String(dueMonth -1) : String(dueMonth -1));
      const day = (String(dueDay).length === 1 ? "0"+String(dueDay) : String(dueDay));
      var date = new Date(String(year), month, day);  
      if((date.getTime() >= firstDate.getTime()) && (date.getTime() <= lastDate.getTime())){
        setDueDateErr("");
        setIsDate(true);
        setDueDate(date.getFullYear() +
        '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
        '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) ));   
      }
      else{
        setDueDateErr("???????????? ?????? 1????????? ?????? 14????????? ???????????????");
        setIsDate(false);
      }
    }
  }

  const onChangeDueMonth = (e) => {
    const month = e.target.value;
    setDueMonth(e.target.value);
    if(month > 12 || month < 1){
      setDueDateErr("?????? ????????? ??????????????????");
      setIsDate(false);
      setDueMonth(month);
    }
    else{
      const monthStr = (String(month -1).length === 1 ? "0"+String(month -1) : String(month -1));
      const day = (String(dueDay).length === 1 ? "0"+String(dueDay) : String(dueDay));
      var date = new Date(dueYear, monthStr, day);
      if((date.getTime() >= firstDate.getTime()) && (date.getTime() <= lastDate.getTime())){
        setDueDateErr("");
        setIsDate(true);
        setDueDate(date.getFullYear() +
        '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
        '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) ));   
      }
      else{
        setDueDateErr("???????????? ?????? 1????????? ?????? 14????????? ???????????????");
        setIsDate(false);
      }
    }
  }

  const onChangeDueDay = (e) => {
    const day =  e.target.value;
    setDueDay(e.target.value);
    const month = (String(dueMonth -1).length === 1 ? "0"+String(dueMonth -1) : String(dueMonth -1));
    const dayStr = (String(day).length === 1 ? "0"+String(day) : String(day));
    var date = new Date(dueYear, month, dayStr);
    if(checkValidDate(dueYear, dueMonth, day)){
      if((date.getTime() >= firstDate.getTime()) && (date.getTime() <= lastDate.getTime())){
        setDueDateErr("");
        setIsDate(true);
        setDueDate(date.getFullYear() +
        '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
        '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) ));   
      } else{
        setDueDateErr("???????????? ?????? 1????????? ?????? 14????????? ???????????????");
        setIsDate(false);
      }
    }else{
      setDueDateErr("?????? ????????? ??????????????????");
      setDueDay(day);
      setIsDate(false);
    }
  }

  const onChangeName = (e) => {
    // console.log("dueDate: " + dueDate);
    setName(e.target.value);
    const name = e.target.value;
    if(name.length > 30){
      setIsName(false);
      setNameErr("???????????? ?????? 30???????????? ???????????????!");
    } else{
      setIsName(true);
      setNameErr("");
    }
  }

  const onChangePrice = (e) => {
    setPrice(e.target.value);
    const price = e.target.value;
    if(price > 9999999){
      setIsPrice(false);
      setPriceErr("????????? ?????? ?????? ????????? ???????????????!");
    } else{
      setIsPrice(true);
      setPriceErr("");
    }
  }

  const onChangeTradePlace = (e) => {
    setInputTradePlace(e.target.value);
  }

  const onChangeTradeMethod = (e) => {
    setTradeMethod(e.target.value);
    setIsTradeMethod(true);
  }

  const onChangeProductDetail = (e) =>{
    if(e.target.value.length < 10) {
      setDetailErr("?????? ????????? 10??? ?????? ??????????????????")
      setProductDetail(e.target.value);
      setIsDetail(false);
    }
    else if(e.target.value.length <= 2000) {
      setProductDetail(e.target.value);
      setDetailErr("");
      setIsDetail(true);
    }
    else{
      e.target.value = e.target.value.substr(0, 2001);
    }
  }

  const handleAddress = () => {
    setTradePlace(inputTradePlace);
    setDisplayMap(true);
  }
  const handleDisplayMap = () => {
    setDisplayMap(false);
  }

  const handleImage = (e) => {
    setUrls([]);
    let imgNum = 0;

    if(!representUrl){
      setError("?????? ???????????? ?????? ??????????????????!");
      return;
    }

    if (e.target.files.length === 0) {
      // console.log("????????? ???????????? ???????????????");
      setError("????????? ???????????? ???????????????");
      setImages([]);
      setUrls([]);
      return;
    }

    for(const image of e.target.files){
      setImages((prevState) => [...prevState, image]);
      imgNum++;
      // console.log(imgNum);

      if(imgNum > 5){
        // setError("????????? ?????? ??????");
        break;
      }
    }
    if(imgNum > 5) {
      setError("???????????? ??????????????? ?????? ?????? 6????????? ?????? ???????????????");
      setImages([]);
    } 
    else setError("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (images.length < 1) {
      // console.log("????????? ???????????? ???????????????");
      setError("????????? ???????????? ???????????????");
      return;
    }

    if ( images.length > 5){
      // console.log("???????????? ??????????????? ?????? ?????? 6????????? ?????? ???????????????");
      setError("???????????? ??????????????? ?????? ?????? 6????????? ?????? ???????????????");
      setImages([]);
      return;
    }

    let imgNum = 1;

    for (const image of images){
       // ????????? ??????
      // console.log("????????? ??????");
      const storageRef = storage.ref("woojoo09/tradeImg/"); //?????? ?????? ????????? ????????? ??????
      const imgName = (memberNum + "host"+ numOfTrade + "thTrade" + imgNum + "thImg"+uuidv4());
      const imagesRef = storageRef.child(imgName);
      // const imagesRef = storageRef.child(uuidv4());
      // const imagesRef = storageRef.child(image.name); //?????????

      // console.log("????????? ??????????????? ??????");
      const upLoadTask = imagesRef.put(image);
      // console.log("????????? ?????? ???");

      upLoadTask.on(
        "state_changed",
        (snapshot) => {
          // console.log("snapshot", snapshot);
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(percent + "% done");
        },
        (error) => {
          console.log("err", error);
          setError("?????? ???????????? ??????????????????." + error);
        },
        () => {
          upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // console.log("File available at", downloadURL);
            setUrls((prevState) => [...prevState, downloadURL]);
          });
        }
      );
      imgNum++;
    }
    setImages([]);
  };

  const handleImageRepresent = (event) => {
    setRepresentUrl("");
    const image = event.target.files[0];
    if (!image) {
      // console.log("????????? ???????????? ???????????????");
      setRepresentErr("????????? ???????????? ???????????????");
      setRepresentImg("");
      setRepresentUrl("");
      return;
    }
    setRepresentImg(image);
    // console.log(image);
    setRepresentErr("");
  };

  const onSubmitRepresent = (event) => {
    event.preventDefault();
    setError("");
    if (representImg === "") {
      // console.log("????????? ???????????? ???????????????");
      setRepresentErr("????????? ???????????? ???????????????");
      return;
    }
    // ????????? ??????
    // console.log("????????? ??????");
    const storageRef = storage.ref("woojoo09/tradeImg/"); //?????? ?????? ????????? ????????? ??????
    // const imgName = (memberNum + "host" + numOfTrade + "thTradeRepresentImg");
    // const imagesRef = storageRef.child(imgName);
    const imagesRef = storageRef.child(uuidv4());
    // const imagesRef = storageRef.child(image.name); //?????????

    // console.log("????????? ??????????????? ??????");
    const upLoadTask = imagesRef.put(representImg);
    // console.log("????????? ?????? ???");

    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        // console.log("snapshot", snapshot);
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(percent + "% done");
      },
      (error) => {
        console.log("err", error);
        // setRepresentErr("?????? ???????????? ??????????????????." + error);
      },
      () => {
        upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setRepresentUrl(downloadURL);
        });
      }
    );
    setRepresentImg('');
  };

  return(
    <div className="write">
      <p className="writeTitle">?????? ?????? ??????</p>
      <div className="writeInput">
      <div className='representInput'>
          <form className="writeRepresentInput" onSubmit={onSubmitRepresent}>
            <label><span>?????? ?????????</span>
            <img src={representIcon} alt="?????????????????????"/>
            <input type="file" accept="image/*" onChange={handleImageRepresent} />
            </label>
            {representImg && <p className='imglst'>{representImg.name}</p>}
            {representImg && <button onClick={onSubmitRepresent}>?????? ????????? ??????</button>}
          </form>
          {representErr && <p className='imgErr'>{representErr}</p>}
          {representUrl && (
            <div className="imgPreview">
              <p className='representpreview'>????????? ????????????</p>
              <div>
              <img className="representImgPreview" src={representUrl} alt="uploaded" />
              </div>
            </div>
          )}
      </div>
      <div className="imgInput">
        <form className="writeImgInput" onSubmit={onSubmit}>
          <label><span>?????? ?????????</span>
          <img src={imgIcon} alt="?????????????????????"/>
          <input multiple type="file" accept="image/*" onChange={handleImage} />
          </label>
          {images.length > 0 && 
          images.map((image)=>(<p className='imglst'>{image.name}</p>))}
          {images.length > 0 && 
          <button onClick={onSubmit}>?????? ????????? ??????</button>}
        </form>
        {error && <p className='imgErr'>{error}</p>}
        {(urls.length >= 1) && (
          <div className="imgPreview">
            <p>????????? ????????????</p>
            <div>
            {urls.map((imageUrl)=>(<img className="writeImgPreview" src={imageUrl} alt="uploaded"/>))}
            </div>
          </div>
        )}
      </div>
      <div className="categoryInput">
        <label><span>???????????? ??????<span className="essential7">*</span></span>
        <select
          value={category}
          onChange={({ target: { value } }) => {
            setCategory(value);
            // console.log(value)
          }}
          onClick={()=>{setCategoryErr("");}}
        >
          {categories.map((e) => (
            <option key={e.value} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        </label>
        {categoryErr && <span className="writeErr">{categoryErr}</span>}
      </div>
      <div className="nameInput">
        <label><span>?????????<span className="essential3">*</span></span>
        <input value={name} onChange={onChangeName}/></label>
        {!isName && <span className="writeErr">{nameErr}</span>}
      </div>
      <div className="priceInput">
        <label><span>??????<span className="essential2">*</span></span>
        <input type="number" value = {price} onChange={onChangePrice}/>
        <span>???</span></label>
        {!isPrice && <span className="writeErr">{priceErr}</span>}
      </div>
      <div className="countPartnerInput">
      <label className="pageselect">
        <span>????????? ?????? ???<span className="essential8">*</span></span>
            <select
              value={countPartner}
              onChange={({ target: { value } }) => {
                setCountPartner(value);
              }}
              onClick={()=>{setLimitPartErr("");}}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </label>
          {limitPartErr && <span className="writeErr">{limitPartErr}</span>}
      </div>
      <div className="dueDateInput">
        <label><span>?????? ?????????<span className="essential6">*</span></span>
          <div>
          <input type="number" value={dueYear} onChange={onChangeDueYear}></input>
          <span>/</span>
          <input type="number" value={dueMonth} onChange={onChangeDueMonth}></input>
          <span>/</span>
          <input type="number" value={dueDay} onChange={onChangeDueDay}></input>
          </div>
        </label>
        {dueDateErr && <span className="tradeMethodErr">{dueDateErr}</span>}
      </div>
      <div className="tradeMethodInput">
        <label><span>?????? ??????<span className="essential5">*</span></span>
        <div>
        <label><input type="radio" name="method" onChange={onChangeTradeMethod} onClick={()=>{setTradeMethodErr("")}} 
        value="direct" checked={tradeMethod === "direct"}/>?????????</label>
        <label><input type="radio" name="method" onChange={onChangeTradeMethod} onClick={()=>{setTradeMethodErr("")}} 
        value="delivery" checked={tradeMethod === "delivery"}/>????????????</label>
        <label><input type="radio" name="method" onChange={onChangeTradeMethod} onClick={()=>{setTradeMethodErr("")}} 
        value="both" checked={tradeMethod === "both"}/>?????? ??????</label>
        </div>
        </label>
        {tradeMethodErr && <span className="tradeMethodErr">{tradeMethodErr}</span>}
      </div>
      <div className="loactionInput">
        <label><span>??????</span>
        <select
          value={city}
          onChange={({ target: { value } }) => {
            setCity(value);
            // console.log(value)
          }}
        >
          <option value="">?????? ??????</option>
          {citys.map((e) => (
            <option key={e.city} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <select
          value={town}
          onChange={({ target: { value } }) => {
            setTown(value);
            // console.log(value)
          }}
        >
          <option value="">?????? ??????</option>
          {towns
          .filter((e) => e.city === city)
          .map((e) => (
            <option key={e.town} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        </label>
      </div>
      <div className="placeInput">
        <label htmlFor="tradePlace"><span>????????? ??????</span>
        <div>
          <input id="tradePlace" placeholder="????????? ???????????????" onChange={onChangeTradePlace} value={inputTradePlace} />
          {displayMap? <><button onClick={handleAddress} className="resetmapbtn">?????????</button><button onClick={handleDisplayMap} className="closemapbtn">?????? ??????</button></> : 
          <button onClick={handleAddress}>?????? ??????</button>}
        </div>
        </label>
        {tradePlaceErr && <span className="writeErr">{tradePlaceErr}</span>}
        <div>{displayMap && <Map searchPlace={tradePlace} />}</div>
      </div>
      <div className="productDetailInput">
      <label><span>?????? ??????<span className="essential52">*</span></span>
      <textarea name="writecontent" className="productDetailTextarea" value={productDetail}
        placeholder="????????? ????????? ???????????? ??????????????????" onChange={onChangeProductDetail} cols="50" wrap="hard"></textarea>
      </label>
      <span className="writecontentlength">{productDetail.length}/2000</span>
      {detailErr && <span className="detailErr">{detailErr}</span>}
      </div>
      </div>
      {isName && isPrice && isTradeMethod && isDetail && isDate ? <button className="writeSubmitBtn" onClick={tradeUpdate}>??????</button> :
      <button className="writeSubmitBtn nobutton">??????</button>}
      {insertMsg && <p>{insertMsg}</p>}
    </div>
  );
}
export default Update