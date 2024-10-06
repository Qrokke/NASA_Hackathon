import React, { useState } from 'react';
import './App.css';


function Result() {
  const [name, setName] = useState('');  // 名前の状態を管理
  const [selectedYear, setSelectedYear] = useState('');  // 年の状態を管理
  const [selectedMonth, setSelectedMonth] = useState('');  // 月の状態を管理
  const [selectedDay, setSelectedDay] = useState('');  // 日の状態を管理
  const [selectedStarSystem, setSelectedStarSystem] = useState('');  // 星系の状態を管理
  const [selectedPlanet, setSelectedPlanet] = useState('');  // 惑星の状態を管理
  const [message, setMessage] = useState('');  // メッセージの状態を管理

  const handleStarSystemChange = (e) => {
    setSelectedStarSystem(e.target.value);
    setSelectedPlanet('');  // 星系が変わったら惑星をリセット
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // フォーム送信のデフォルト動作をキャンセル

    if (name.trim() === "" || selectedYear === "" || selectedMonth === "" || selectedDay === "" || selectedPlanet === "") {
      setMessage("名前、生年月日、星座，惑星をすべて入力してください。");  // すべてのフィールドが必要
    } else {
      const birthdate = `${selectedYear}-${selectedMonth}-${selectedDay}`;  // 生年月日を生成
      setMessage(`こんにちは、${name}さん！あなたの生年月日は ${birthdate}、選択した惑星は ${selectedPlanet} ですね。`);
    }

    setName('');  // フォームのリセット
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedDay('');
    setSelectedPlanet('');
    setSelectedStarSystem('');
  };

  return (
    <div>
        2page
    </div>
  );
}


export default Result;

