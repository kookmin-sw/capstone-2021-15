# UtoPR : 유토피아

팀페이지 주소 : [https://kookmin-sw.github.io/capstone-2021-15/](https://kookmin-sw.github.io/capstone-2021-15/)
<br/>
중간발표 영상 : [https://youtu.be/BLwbohQmAq4](https://youtu.be/BLwbohQmAq4)

### 1. 프로젝트 소개

  퍼스널 컬러란 사람의 피부톤과 가장 어울리는 색상,명도,채도를 찾는 색채학 이론이다. 최근 몇 년간 스타일링에많은 도움이 되는 퍼스널 컬러가 유행하면서 온/오프라인으로 퍼스널 컬러 진단을 받는 사용자가 많아졌다. 우리는 기존의 온/오프라인 퍼스널컬러진단의 부족한 점을 파악하여 이를 보완한 방법으로 서비스를 제공하고자 한다. 기존의 온라인 퍼스널 컬러진단보다 상세한 점수제도를 도입한 퍼스널컬러 진단을 진행하고 진단 결과를 통해, 혹은 이미 진단 받은 결과를 이용하여 오프라인보다 다양한 카테고리의 상품을 추천해준다. 사용자와 같은 톤을 갖은 사람들의 클릭데이터를 이용한 추천시스템을 구현함으로써 추천의 정확도를 높이며 사용자의 새로운 상품 구매시 시간/비용의 효율성을 높이고자 한다.

**UtoPR**,  **P**ersonal color **R**ecommend **to** yo**u** 은 사용자에 맞는 퍼스널 컬러를 진단해주고 상품추천까지 연결되는 웹 서비스이다.

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

**UtoPR**,  **P**ersonal color **R**ecommend **to** yo**u** is a web service that diagnoses personal colors suitable for users and connects to product recommendations.

1. Classify and store product information on various sites
    - Classify products according to personal color standards
2. User's personal color diagnosis
    - Visualize the result of personal color diagnosis and present the worst type
3. Recommend products that fit the user's personal color and interest category
    - Product recommendation based on the click log of other users who have the same tone as the user

### 3. 15Team

- 최재강 : **Face detection** ,Product Classification  , Frontend <br/>
 <img width="250" alt="최재강" src="https://user-images.githubusercontent.com/39542978/113392650-69a78900-93d0-11eb-93a4-1b4ac2ed19aa.png">


- 박수빈 : **Recommendation** **system** , Backend <br/>
 <img width="250" alt="박수빈" src="https://user-images.githubusercontent.com/39542978/113392707-8217a380-93d0-11eb-8018-f21f0a7615c0.png">

- 박민정 : Backend, Frontend, Data collection, Application deploy <br/>
<img width="250" alt="박민정" src="https://user-images.githubusercontent.com/39542978/113392782-9d82ae80-93d0-11eb-9c23-1720615e3290.png">

- 임이현:  **Product Classification,** Frontend, Personal color diagnosis <br/>
<img width="250" alt="임이현" src="https://user-images.githubusercontent.com/39542978/113392834-ae332480-93d0-11eb-978c-418976a73da6.png">

- 박지영 : **Frontend** , Recommendation system <br/>
<img width="250" alt="박지영" src="https://user-images.githubusercontent.com/39542978/113392866-c0ad5e00-93d0-11eb-9041-5df3dbfa6ffe.png">

### 4. 사용법

- UtoPR 웹

    [http://15.164.100.12](http://15.164.100.12/main)

    [ 웹 사용방법은 시연영상 참고 ]

- 추천 시스템

    ```bash
    git clone https://github.com/kookmin-sw/capstone-2021-15.git
    cd capstone-2021-15/recommendation_method/gru4rec/
    ```

    ```bash
    pip3 install -r requirements.txt
    bash run.sh
    ```
