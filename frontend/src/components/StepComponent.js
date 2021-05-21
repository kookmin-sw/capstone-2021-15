import React from "react";
import './StepComponent.css';
import { Steps, Divider,Tooltip   } from 'antd';

const { Step } = Steps;

function StepComponent(props) {
    return (
        <div className="diagnosisIntro">
            <h1 >진단 결과</h1>
            <p style={{padding:"15px 0 5px 0"}}>진단 결과를 설명을 해볼까 합니다. 노루, 별 새워 별 강아지, 그러나 계십니다. <br/>가난한 시와 하나에 위에 버리었습니다. 벌써 하나에 무엇인지 딴은 내 듯합니다. 그리고 이름과, 하나에 때 아직 듯합니다.</p>
            <br/>
            <Steps style={{padding:"0 0 10px 0"}}current={2}>
                <Step title="Input" description="This is a description." />
                <Step title="Color Draping " description="This is a description." />
                <Step title="Finish!" description="" />
            </Steps>
            <Divider style={{padding:"20px 0 10px 0"}} />
        </div>
    )
}

export default StepComponent;