# Personal Color Recommend System : PCRS

팀페이지 주소 : [https://github.com/kookmin-sw/capstone-2021-15/](https://github.com/kookmin-sw/capstone-2021-15/tree/feedback)

### 1. 프로젝트 소개

  퍼스널 컬러란 사람의 피부톤과 가장 어울리는 색상,명도,채도를 찾는 색채학 이론이다. 최근 몇 년간 스타일링에많은 도움이 되는 퍼스널 컬러가 유행하면서 온/오프라인으로 퍼스널 컬러 진단을 받는 사용자가 많아졌다. 우리는 기존의 온/오프라인 퍼스널컬러진단의 부족한 점을 파악하여 이를 보완한 방법으로 서비스를 제공하고자 한다. 기존의 온라인 퍼스널 컬러진단보다 상세한 점수제도를 도입한 퍼스널컬러 진단을 진행하고 진단 결과를 통해, 혹은 이미 진단 받은 결과를 이용하여 오프라인보다 다양한 카테고리의 상품을 추천해준다. 사용자와 같은 톤을 갖은 사람들의 클릭데이터를 이용한 추천시스템을 구현함으로써 추천의 정확도를 높이며 사용자의 새로운 상품 구매시 시간/비용의 효율성을 높이고자 한다. 

**P**ersonal **C**olor **R**ecommend **S**ystem , PCRS ㅍㅋㅊㅅ 는 사용자에 맞는 퍼스널 컬러를 진단해주고 상품추천까지 연결되는 웹 서비스이다. 

1. 다양한 사이트에서 상품의 정보 분류 및 저장 
    - 상품을 퍼스널 컬러기준에 따라 분류
2. 사용자의 퍼스널 컬러 진단 
    - 상세한 퍼스널 컬러 진단를 위해 점수제도 도입
        - 퍼스널 컬러 진단의 결과 확률로 시각화 worst / best
        - 색상,채도,명도 중 어느 부분에 영향을 많이 받는지에 대한 결과 확률로 시각화
3. 사용자의 퍼스널 컬러와 관심 카테고리에 맞는 상품을 추천 
    - 사용자와 같은 톤을 가지고 있는 다른 사용자들의 click log 를 기반으로 상품추천

### 2. Abstract

  Personal color is a theory of colorology that finds the hue, brightness, and saturation that best match a person's skin tone. In recent years, as personal colors, which are very helpful in styling, have become popular in recent years, more users receive personal color diagnosis online/offline. We identify the shortcomings of the existing on/offline personal color diagnosis and try to provide services in a way that complements them. It conducts personal color diagnosis, which introduces a more detailed score system than the existing online personal color diagnosis, and recommends products in a variety of categories than offline, through diagnosis results or by using results that have already been diagnosed. By implementing a recommendation system using click data of people who have the same tone as the user, the accuracy of recommendation is improved, and the efficiency of time/cost when purchasing a new product by the user is to be improved.

Personal Color Recommend System, PCRS ㅍㅋㅊㅅ is a web service that diagnoses personal colors suitable for users and connects to product recommendations.

1. Classify and store product information on various sites
    - Classify products according to personal color standards
2. User's personal color diagnosis
    - Introduced a score system for detailed personal color diagnosis
    - Visualization worst / best with probability of personal color diagnosis
    - Visualize with the probability of the result of which part of hue, saturation, and brightness is most affected

3. Recommend products that fit the user's personal color and interest category
    - Product recommendation based on the click log of other users who have the same tone as the user

### 3. 15Team

- 최재강 : **Product Classification**  , Backend , Frontend
    ![15team/최재강.png](15team/최재강.png =250x250)

- 박수빈 : **Recommendation** **system** , Personal color diagnosis

    ![15team/박수빈.png](15team/박수빈.png =250x250)

- 박민정 : **Backend** , Frontend

    ![15team/박민정.png](15team/박민정.png =250x250)

- 임이현 : **Product Classification ,** Frontend

    ![15team/임이현.png](15team/임이현.png =250x250)

- 박지영 : **Frontend** , Recommendation system

    ![15team/박지영.png](15team/박지영.png =250x250)
