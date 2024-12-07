import React from 'react';
import Style from './style.module.scss';
import { CiWarning,CiCircleInfo } from "react-icons/ci";
import { BiQuestionMark } from "react-icons/bi";

const Card = ({
    sensoreName,
    sensoreType,
    boardName,
    sensoreValue
}) => {
    const SensorIcon = ({ type }) => {
        const types = {
          warning: <CiWarning />,
          info: <CiCircleInfo />,
        };
      
        return types[type] || <BiQuestionMark />;
      };

    return (
        <div className={Style.card}>
            <div className={Style.name}><SensorIcon type={sensoreType} /> {sensoreName}</div>
            <div className={Style.boardname}>{boardName}</div>
        </div>
    );
};

export default Card;