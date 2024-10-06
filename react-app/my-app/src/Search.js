import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';


function Search() {
  const [name, setName] = useState('');  // 名前の状態を管理
  const [selectedYear, setSelectedYear] = useState('');  // 年の状態を管理
  const [selectedMonth, setSelectedMonth] = useState('');  // 月の状態を管理
  const [selectedDay, setSelectedDay] = useState('');  // 日の状態を管理
  const [selectedStarSystem, setSelectedStarSystem] = useState('');  // 星系の状態を管理
  const [selectedPlanet, setSelectedPlanet] = useState('');  // 惑星の状態を管理
  const [message, setMessage] = useState('');  // メッセージの状態を管理
  const navigate = useNavigate();

  const handleStarSystemChange = (e) => {
    setSelectedStarSystem(e.target.value);
    setSelectedPlanet('');  // 星系が変わったら惑星をリセット
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // フォーム送信のデフォルト動作をキャンセル
    let birthdate ='';

    if (name.trim() === "" || selectedYear === "" || selectedMonth === "" || selectedDay === "" || selectedPlanet === "") {
      setMessage("名前、生年月日、星座，惑星をすべて入力してください。");  // すべてのフィールドが必要
    } else {
      birthdate = `${selectedYear}-${selectedMonth}-${selectedDay}`;  // 生年月日を生成
      setMessage(`こんにちは、${name}さん！あなたの生年月日は ${birthdate}、選択した惑星は ${selectedPlanet} ですね。`);
    }

    setName('');  // フォームのリセット
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedDay('');
    setSelectedPlanet('');
    setSelectedStarSystem('');

    console.log(name, birthdate, selectedPlanet);

    // fetch(`https://2dkhkhbteycxfeou56oxyjhyty0yuvkx.lambda-url.us-east-2.on.aws?name=${name}&birthday=${birthdate}&starsytem=${selectedPlanet}`)  // APIのURLを指定
    // .then(response => response.json())  // レスポンスをJSON形式に変換
    // .then(data => {
    // })
    // .catch(error => {
    //   console.error('エラーが発生しました:', error);  // エラー処理
    // });

    const queryString = new URLSearchParams({
      selectedStarSystem,
      selectedPlanet
    }).toString();

    navigate('/result?' + queryString);
  };




  return (
    <div className="App">
      <header className="header">
        <h1>ROITs Horoscope</h1>
      </header>

      <div className="container">
        {/* 左側に標準のホロスコープ画像を表示 */}
        <div className="horoscope">
          <img src="https://via.placeholder.com/300" alt="ホロスコープ" />
        </div>

        {/* 右側に入力フォームを表示 */}
        <div className="form-container">
          <form onSubmit={handleSubmit} id="nameForm">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">名前:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}  // 名前の入力を管理
                      placeholder="名前を入力してください"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="birthdate">生年月日:</label>
                  </td>
                  <td>
                    {/* 年、月、日を選択するためのドロップダウン */}
                    <select id="birthdate-year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                      <option value="">年</option>
                      {Array.from({ length: 100 }, (_, i) => (
                        <option key={i} value={2023 - i}>{2023 - i}</option>
                      ))}
                    </select>
                    <select id="birthdate-month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                      <option value="">月</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                      ))}
                    </select>
                    <select id="birthdate-day" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                      <option value="">日</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                  <label htmlFor="star-system">星系:</label>
                  </td>
                  <td>
                    <select
                      id="star-system"
                      value={selectedStarSystem}
                      onChange={handleStarSystemChange}  // 星系の選択を管理
                    >
                      <option value="">星系を選んでください</option>
                      <option value="trappist1">トラピスト1</option>
                      <option value="sun">太陽</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="planet">惑星:</label>
                  </td>
                  <td>
                    <select
                      id="planet"
                      value={selectedPlanet}
                      onChange={(e) => setSelectedPlanet(e.target.value)}  // 惑星の選択を管理
                    >
                      <option value="">惑星を選んでください</option>
                      {selectedStarSystem === "trappist1" && (
                        <>
                          <option value="0">TRAPPIST-1b</option>
                          <option value="1">TRAPPIST-1c</option>
                          <option value="2">TRAPPIST-1d</option>
                          <option value="3">TRAPPIST-1e</option>
                          <option value="4">TRAPPIST-1f</option>
                          <option value="5">TRAPPIST-1g</option>
                        </>
                      )}
                      {selectedStarSystem === "sun" && (
                        <>
                          <option value="0">Mercury</option>
                          <option value="1">Venus</option>
                          <option value="2">Earth</option>
                          <option value="3">Mars</option>
                          <option value="4">Jupiter</option>
                          <option value="5">Saturn</option>
                        </>
                      )}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button>Find</button>
          </form>
          <div id="message">{message}</div>  {/* メッセージを表示 */}
        </div>
      </div>
        <footer className="footer">
          <p>&copy; 2024 ROITs。</p>
        </footer>
    </div>
  );
}


export default Search;

