import React from 'react';
import ContentStatusChart from './components/ContentStatusChart'; // パスの調整が必要な場合があります
import './App.css'; // 必要に応じて

function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <h2>クローラーダッシュボード</h2>
      </div>
      <main>
        <ContentStatusChart />
      </main>
    </div>
  );
}

export default App;