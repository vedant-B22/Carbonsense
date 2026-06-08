"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ChartsPanel({ footprint }) {
  const donutRef = useRef(null);
  const barRef = useRef(null);
  const gaugeRef = useRef(null);
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    let script;
    const loadGoogleCharts = () => {
      if (window.google) {
        initCharts();
        return;
      }
      script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.async = true;
      script.onload = initCharts;
      document.body.appendChild(script);
    };

    const initCharts = () => {
      if (window.google) {
        window.google.charts.load("current", { packages: ["corechart", "gauge"] });
        window.google.charts.setOnLoadCallback(() => {
          drawCharts();
          setChartsLoaded(true);
        });
      }
    };

    const drawCharts = () => {
      if (!donutRef.current || !barRef.current || !gaugeRef.current || !window.google?.visualization) return;

      // Donut Chart
      const donutData = window.google.visualization.arrayToDataTable([
        ["Category", "CO₂ (kg/year)"],
        ["Transport", footprint.transport],
        ["Energy", footprint.energy],
        ["Food", footprint.food],
        ["Lifestyle", footprint.lifestyle]
      ]);
      const donutChart = new window.google.visualization.PieChart(donutRef.current);
      donutChart.draw(donutData, {
        pieHole: 0.45, backgroundColor: "transparent",
        legend: { textStyle: { color: "#a0b3a2", fontName: "DM Sans", fontSize: 12 } },
        colors: ["#a8ff3e", "#2e6b36", "#4a9c53", "#7cc786"],
        pieSliceBorderColor: "transparent", chartArea: { width: "100%", height: "85%" }
      });

      // Bar Chart
      const barData = window.google.visualization.arrayToDataTable([
        ["Entity", "kg CO₂/yr", { role: "style" }],
        ["You", footprint.total, "#a8ff3e"],
        ["India Avg", 1900, "#2e6b36"],
        ["World Avg", 4800, "#d9534f"],
        ["Paris Target", 2000, "#4a9c53"]
      ]);
      const barChart = new window.google.visualization.ColumnChart(barRef.current);
      barChart.draw(barData, {
        backgroundColor: "transparent", legend: { position: "none" },
        hAxis: { textStyle: { color: "#a0b3a2", fontName: "DM Sans" } },
        vAxis: { textStyle: { color: "#a0b3a2", fontName: "DM Sans" }, gridlines: { color: "#1a2e1d" } },
        chartArea: { width: "80%", height: "70%" }
      });

      // Gauge Chart
      const gaugeData = window.google.visualization.arrayToDataTable([
        ["Label", "Value"],
        ["Score", footprint.total]
      ]);
      const gaugeChart = new window.google.visualization.Gauge(gaugeRef.current);
      gaugeChart.draw(gaugeData, {
        min: 0, max: 12000,
        redFrom: 6000, redTo: 12000,
        yellowFrom: 2000, yellowTo: 6000,
        greenFrom: 0, greenTo: 2000,
        minorTicks: 5, width: 160, height: 160
      });
    };

    loadGoogleCharts();

    const handleResize = () => { if (window.google && chartsLoaded) drawCharts(); };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (script && document.body.contains(script)) {
        // We leave it loaded globally to prevent double-inits on route navigation
      }
    };
  }, [footprint, chartsLoaded]);

  const skeleton = (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4 animate-pulse">
      <div className="rounded-full bg-forestMuted w-32 h-32" />
      <div className="h-4 bg-forestMuted rounded w-3/4" />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="glass-panel p-6 rounded-2xl border border-accent/10 flex flex-col items-center h-[260px]">
        <h3 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4 w-full text-center">Category Breakdown</h3>
        <div className="w-full h-full flex justify-center items-center">
          {!chartsLoaded ? skeleton : <div ref={donutRef} className="w-full h-full" />}
        </div>
      </div>
      <div className="glass-panel p-6 rounded-2xl border border-accent/10 flex flex-col items-center h-[260px]">
        <h3 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4 w-full text-center">National & Global Benchmarks</h3>
        <div className="w-full h-full flex justify-center items-center">
          {!chartsLoaded ? skeleton : <div ref={barRef} className="w-full h-full" />}
        </div>
      </div>
      <div className="glass-panel p-6 rounded-2xl border border-accent/10 flex flex-col items-center h-[260px]">
        <h3 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4 w-full text-center">Target Threshold</h3>
        <div className="w-full h-full flex justify-center items-center overflow-hidden">
          {!chartsLoaded ? skeleton : (
            <div className="flex justify-center items-center p-2 rounded-xl bg-forestMuted/20 border border-accent/5">
              <div ref={gaugeRef} className="opacity-90 scale-95" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
