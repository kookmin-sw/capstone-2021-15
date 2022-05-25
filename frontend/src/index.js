import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// IE9의 경우
import 'react-app-polyfill/ie9';
// IE11의 경우
import 'react-app-polyfill/ie11';

import Reducer from './_reducers';
import { Provider } from 'react-redux'; // context 값 핸들링. context-> 모든 레벨의 컴포넌트 트리에 props를 통하지 않아도 데이터 전달 방법 제공 
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from "react-router-dom";
// BrowserRouter -> HTML5의 History API를 사용해 페이지를 새로고침하지 않고도 주소 변경 가능하게함
// 깜빡거림이 없음 + 현재 주소에 관련된 정보를 props로 조회 및 사용 가능케함
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider 
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && // 크롬 redux 상태 모니터링 프로그램 적용
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();