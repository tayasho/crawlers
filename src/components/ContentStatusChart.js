import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import './ContentStatusChart.css';

const ContentStatusChart = () => {
  const published = 1393;
  const draft = 508;
  const archived = 561; // この値はサマリーに表示しませんが、グラフや他の計算で使われます
  const stopped = 246;
  const running = published-stopped;

  // ★ ユーザー指定の「全件」合計を計算
  const totalPubDraft = published + draft;

  // 他の合計値 (グラフのmaxY計算などに必要なら残す)
  const totalLeftBar = published + draft + archived;
  const totalRightBar = running + stopped;
  const maxY = Math.ceil(Math.max(totalLeftBar, totalRightBar) / 500) * 500;

  const publishedGreen = "#2E7D32";
  const runningGreen = "#66BB6A";
  const stoppedOrange = "#FF9800";

  // 右側のバー用のフォーマッタ関数 (Published比)
  const formatPercentageAgainstPublished = (value) => {
    if (typeof value !== 'number') return "";
    if (published === 0) return 'N/A';
    const percentage = ((value / published) * 100).toFixed(2);
    return `${percentage}%`;
  };

  // 左側のバー用のフォーマッタ関数（実数）
  const formatAsNumber = (value) => {
      if (typeof value !== 'number') return "";
      return value;
  };

  const data = [
    { name: 'All Status', published, draft, archived, running, stopped },
  ];

  // 表示用の計算値
  const runningVsPublishedPercent = formatPercentageAgainstPublished(running);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2 className="chart-title">クローラー起動数/正常稼働率</h2>
      </div>
      <div className="responsive-chart">
        <ResponsiveContainer width="100%" height={300}>
          {/* --- グラフ部分 (変更なし) --- */}
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, maxY]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="published" stackId="a" fill={publishedGreen} name="Published">
              <LabelList dataKey="published" position="insideTop" className="bar-label" formatter={formatAsNumber} />
            </Bar>
            <Bar dataKey="draft" stackId="a" fill="#FFC107" name="Draft">
              <LabelList dataKey="draft" position="insideTop" className="bar-label" formatter={formatAsNumber} />
            </Bar>
            <Bar dataKey="archived" stackId="a" fill="#9E9E9E" name="Archived">
              <LabelList dataKey="archived" position="insideTop" className="bar-label" formatter={formatAsNumber} />
            </Bar>
            <Bar dataKey="running" stackId="b" fill={runningGreen} name="Running">
              <LabelList dataKey="running" position="insideTop" className="bar-label" formatter={formatPercentageAgainstPublished} />
            </Bar>
            <Bar dataKey="stopped" stackId="b" fill={stoppedOrange} name="Stopped">
              {/* Stopped の LabelList を追加 (実数表示) */}
              <LabelList dataKey="stopped" position="insideTop" className="bar-label" formatter={formatPercentageAgainstPublished} />
            </Bar>
          </BarChart>
          {/* --- グラフ部分ここまで --- */}
        </ResponsiveContainer>
      </div>

      {/* ★★★ グラフ下部のサマリー情報エリア (指定項目のみ表示) ★★★ */}
      <div className="chart-summary" style={{
          marginTop: '20px',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '5px',
          width: '90%',
          maxWidth: '600px',
          textAlign: 'left',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
        <h3 style={{ marginTop: '0', marginBottom: '10px', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          データサマリー
        </h3>
        {/* 指定された項目のみを表示 */}
        <p style={{ margin: '5px 0' }}>
          <strong>全件 (Published + Draft):</strong> {totalPubDraft.toLocaleString()} 件
        </p>
         <p style={{ margin: '5px 0' }}>
          <strong>Published:</strong> {published.toLocaleString()} 件
        </p>
        <p style={{ margin: '5px 0' }}>
          <strong>Draft:</strong> {draft.toLocaleString()} 件
        </p>
        <p style={{ margin: '5px 0' }}>
          <strong>Running:</strong> {running.toLocaleString()} 件 <span style={{ color: '#666' }}>(Published比: {runningVsPublishedPercent})</span>
        </p>
         <p style={{ margin: '5px 0' }}>
          <strong>Stopped:</strong> {stopped.toLocaleString()} 件
        </p>
         {/* Archived, その他の合計値は表示しない */}
      </div>
    </div>
  );
};

export default ContentStatusChart;