import React, { useMemo, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { Box } from '@chakra-ui/react';

const CryptoChart = ({ data, color }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#333',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const newSeries = chart.addAreaSeries({
      lineColor: color,
      topColor: `${color}ff`,
      bottomColor: `${color}00`,
      lineWidth: 2,
    });

    newSeries.setData(
      data.map((d) => ({
        time: d.date,
        value: d.priceUsd,
      }))
    );

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, color]);

  return <Box ref={chartContainerRef} />;
};

export default CryptoChart;
