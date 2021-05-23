import React from "react";
import './StepComponent.css';
import { Steps, Divider,Tooltip   } from 'antd';

const { Step } = Steps;

function StepComponent(props) {
    return (
        <div className="diagnosisIntro">
            <h2>{props.stepTitle}</h2>
            <br/>
            <Steps style={{padding:"0 0 0 50px"}}current={props.step}>
                <Step title="Input" description="Upload your image" />
                <Step title="Color Draping " description="Self diagnosis" />
                <Step title="Finish!" description="Diagnosis complete" />
            </Steps>
            <Divider style={{padding:"20px 0 10px 0"}} />
        </div>
    )
}

export default StepComponent;