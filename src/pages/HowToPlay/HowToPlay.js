import React, { useState } from "react";
import { View } from 'react-native';
import './HowToPlay.css';
import Popup from "../../components/Popup";
import arrow from "../../images/arrow.png";
import arrow_circle from "../../images/arrow_circle.png";
import step1 from "../../images/step1.gif";
import step2 from "../../images/step2.gif";
import step3 from "../../images/step3.gif";
import step4 from "../../images/step4.gif";

function HowToPlay() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const toggleStep1 = () => {
        setIsOpen1(!isOpen1);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
    };
    const toggleStep2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false);
        setIsOpen3(false);
        setIsOpen4(false);
    };
    const toggleStep3 = () => {
        setIsOpen3(!isOpen3);
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen4(false);
    };
    const toggleStep4 = () => {
        setIsOpen4(!isOpen4);
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
    };

    return (
        <>
            <div className="howToPlay">How to Play</div>
            <div className="steps">Steps</div>
            <div className="guideline">
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <button className="button" onClick={toggleStep1}>1</button>
                    <img src={arrow} width={40} height={30} style={{marginLeft: 10, marginRight: 10}}></img>
                    <button className="button" onClick={toggleStep2}>2</button>
                    <img src={arrow} width={40} height={30} style={{marginLeft: 10, marginRight: 10}}></img>
                    <button className="button" onClick={toggleStep3}>3</button>
                    <img src={arrow_circle} width={50} height={45} style={{marginLeft: 10, marginRight: 10}}></img>
                    <button className="button" onClick={toggleStep4}>4</button>
                </View>
            </div>

        {isOpen1 && (
            <div className="stepalign">
                <div className="steptitle">The More the Merrier</div>
                <div className="stepimage"><img src={step1} width={300} height={300}/></div>
                <div className="stepdetail">This is a party game so grab your friends and get ready to play!</div>
            </div>
        )}
        {isOpen2 && (
            <div className="stepalign">
            <div className="steptitle">Pitch Your Hot Take</div>
            <div className="stepimage"><img src={step2} width={300} height={300}/></div>
            <div className="stepdetail">Write up a question with two competitive answers for others to vote on</div>
            </div>
        )}
        {isOpen3 && (
            <div className="stepalign">
            <div className="steptitle">Vote and Get Points</div>
            <div className="stepimage"><img src={step3} width={300} height={300}/></div>
            <div className="stepdetail">Vote on your friends’ hot questions and the side with the majority gets a point</div>
            </div>
        )}
        {isOpen4 && (
            <div className="stepalign">
            <div className="steptitle">Laugh and Argue</div>
            <div className="stepimage"><img src={step4} width={300} height={300}/></div>
            <div className="stepdetail">See who thinks like you and defend your answers, majority or minority!</div>
            </div>
        )}
        
        </> 
    );
}

export default HowToPlay;