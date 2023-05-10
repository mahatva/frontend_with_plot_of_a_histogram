import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import '../css/Graph.css';
import { useNavigate } from 'react-router-dom';


const Graph = () => {
  const navigate = useNavigate(); 
  const [wordFrequency, setWordFrequency] = useState({});

  const handleClick = () => {
    navigate('/'); 
  };

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(
          'https://www.terriblytinytales.com/test.txt'
        );
        const data = await response.text();
        const words = data.split(/\W+/);
        const frequencies = {};
        words.forEach((word) => {
          frequencies[word] = (frequencies[word] || 0) + 1;
        });
        setWordFrequency(frequencies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchText();
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('word-frequency-chart');
    const context = canvas.getContext('2d');
    const sortedWords = Object.entries(wordFrequency).sort(
      (a, b) => b[1] - a[1]
    );
    const labels = sortedWords.slice(0, 20).map(([word]) => word);
    const data = sortedWords.slice(0, 20).map(([word, frequency]) => frequency);

    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(context, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Word Frequency',
            data,
            backgroundColor: 'orange',
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, [wordFrequency]);


  const handleExport = () => {
    const csvContent = [
      ['Word', 'Frequency'],
      ...Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]).slice(0, 20),
    ]
      .map((row) => row.join(','))
      .join('\n');
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'word-frequency.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="graph-container">
      <canvas id="word-frequency-chart"></canvas>
      <div className="back-parrent">
      <button className="back-btn" onClick={handleClick}>
        Back
      </button>
      <button onClick={handleExport} className="export-btn">
      Export
    </button>
    </div>
    </div>
  );
};

export default Graph;
