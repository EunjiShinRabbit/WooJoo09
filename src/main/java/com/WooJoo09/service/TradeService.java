package com.WooJoo09.service;

import com.WooJoo09.constant.DoneTrade;
import com.WooJoo09.constant.IsRepresent;
import com.WooJoo09.constant.TradeMethod;
import com.WooJoo09.entity.Category;
import com.WooJoo09.entity.Member;
import com.WooJoo09.entity.ProductImg;
import com.WooJoo09.entity.Trade;
import com.WooJoo09.repository.CategoryRepository;
import com.WooJoo09.repository.MemberRepository;
import com.WooJoo09.repository.ProductImgRepository;
import com.WooJoo09.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@ToString
@Service
@RequiredArgsConstructor
public class TradeService {
    private final TradeRepository tradeRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final ProductImgRepository productImgRepository;

    public Page<?> tradeSearchSelect(String target, int page, int size) {
        return tradeRepository.findTradeByProduct("%" + target + "%", PageRequest.of(page, size));
    }

    public Page<?> tradeSearchSelectLogin(String target, int memberNum, int page, int size) {
        return tradeRepository.findTradeByProductLogin("%" + target + "%", memberNum, PageRequest.of(page, size));
    }

    public Page<?> tradeSelectOption(String option, int page, int size) {
        return tradeRepository.findTradeOption(option, PageRequest.of(page, size));
    }
    public Page<?> tradeSelectOptionLogin(String option, int memberNum, int page, int size) {
        return tradeRepository.findTradeOptionLogin(option, memberNum, PageRequest.of(page, size));
    }

    public Page<?> tradeSelectOptionCity(String option, String city, int page, int size) {
        return tradeRepository.findTradeOptionCity(option, city, PageRequest.of(page, size));
    }
    public Page<?> tradeSelectOptionCityLogin(String option, String city, int memberNum, int page, int size) {
        return tradeRepository.findTradeOptionCityLogin(option, city, memberNum, PageRequest.of(page, size));
    }

    public Page<?> tradeSelectOptionTown(String option, String town, int page, int size) {
        return tradeRepository.findTradeOptionTown(option, town, PageRequest.of(page, size));
    }
    public Page<?> tradeSelectOptionTownLogin(String option, String town, int memberNum, int page, int size) {
        return tradeRepository.findTradeOptionTownLogin(option, town, memberNum, PageRequest.of(page, size));
    }

    public Page<?> tradeSelectOptionCategory(String category, String option, int page, int size) {
        return tradeRepository.findTradeOptionCategory(category, option, PageRequest.of(page, size));
    }
    public Page<?> tradeSelectOptionLoginCategory(String category, String option, int memberNum, int page, int size) {
        return tradeRepository.findTradeOptionLoginCategory(category, option, memberNum, PageRequest.of(page, size));
    }

    public Page<?> tradeSelectOptionCityCategory(String category, String option, String city, int page, int size) {
        return tradeRepository.findTradeOptionCityCategory(category, option, city, PageRequest.of(page, size));
    }
    public Page<?> tradeSelectOptionCityLoginCategory(String category, String option, String city, int memberNum, int page, int size) {
        return tradeRepository.findTradeOptionCityLoginCategory(category, option, city, memberNum, PageRequest.of(page, size));
    }

    public Page<?> tradeSelectOptionTownCategory(String category, String option, String town, int page, int size) {
        return tradeRepository.findTradeOptionTownCategory(category, option, town, PageRequest.of(page, size));
    }
    public Page<?> tradeSelectOptionTownLoginCategory(String category, String option, String town, int memberNum, int page, int size) {
        return tradeRepository.findTradeOptionTownLoginCategory(category, option, town, memberNum, PageRequest.of(page, size));
    }

    public Map<?, ?> tradeDetail(int tradeNum){
        Map<String,Map<?,?>> map = new HashMap<>();
        map.put("detail", tradeRepository.tradeDetailSelect(tradeNum));
        map.put("member", tradeRepository.tradeDetailMemberSelect(tradeNum));
        return map;
    }
    public Map<?, ?> tradeDetailLogin(int tradeNum, int memberNum){
        Map<String,Map<?,?>> map = new HashMap<>();
        map.put("detail", tradeRepository.tradeDetailSelectLogin(tradeNum, memberNum));
        map.put("member", tradeRepository.tradeDetailMemberSelect(tradeNum));
        return map;
    }
    public List<?> tradeDetailImage(int tradeNum){
        List<Map<?, ?>> list = new ArrayList<>();
        list = (tradeRepository.tradeDetailImgSelect(tradeNum));
        return list;
    }

    public Map<String, String> tradeInsert(Long memberNum, List<String> imgUrl, String representUrl, String categoryName, String product, int price,
    int limitPartner, Date dueDate, String tradeMethod, String city, String town, String tradePlace, String productDetail){
        Map<String ,String> map = new HashMap<>();
        Trade trade= new Trade();
        Member member = memberRepository.findByMemberNum(memberNum);
        trade.setHost(member);
        Category category = categoryRepository.findByCategoryName(categoryName);
        trade.setCategory(category);
        trade.setLimitPartner(limitPartner);
        trade.setProduct(product);
        trade.setPrice(price);
        trade.setCity(city);
        trade.setTown(town);
        trade.setDueDate(dueDate);
        switch (tradeMethod){
            case "both" : trade.setTradeMethod(TradeMethod.BOTH); break;
            case "delivery" : trade.setTradeMethod(TradeMethod.DELIVERY); break;
            case "direct" : trade.setTradeMethod(TradeMethod.DIRECT); break;
        }
        trade.setProductDetail(productDetail);
        trade.setTradePlace(tradePlace);
        trade.setDoneTrade(DoneTrade.ONGOING);
        Trade savedTrade = tradeRepository.save(trade);
        log.info(savedTrade.toString());
        if(productImgRepository.findByTradeNum(savedTrade).isEmpty()){
            map.put("completePartner", "duplicateTrade");
        } else {
            ProductImg productImg = new ProductImg();
            productImg.setTradeNum(savedTrade);
            productImg.setImgUrl(representUrl);
            productImg.setIsRepresent(IsRepresent.REPRESENT);
            ProductImg savedRepresentImg = productImgRepository.save(productImg);
            log.info(savedRepresentImg.toString());
            for (String e : imgUrl){
                ProductImg productImg2 = new ProductImg();
                productImg2.setTradeNum(savedTrade);
                productImg2.setImgUrl(e);
                productImg2.setIsRepresent(IsRepresent.NOREPRESENT);
                ProductImg savedRepresentImg2 = productImgRepository.save(productImg2);
                log.info(savedRepresentImg2.toString());
            }
        }
        return map;
    }

}