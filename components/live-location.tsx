"use client";

import { useEffect, useState } from "react";

const LATITUDE = 33.4255;
const LONGITUDE = -111.94;
const TIMEZONE = "America/Phoenix";
const LOCATION_LABEL = "Tempe, AZ";

type Weather = {
  temperature: number;
  code: number;
};

const weatherCopy = (code: number): string => {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Mostly clear";
  if (code === 3) return "Overcast";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorms";
};

const weatherGlyph = (code: number): string => {
  if (code === 0) return "☀";
  if (code <= 2) return "🌤";
  if (code === 3) return "☁";
  if (code <= 48) return "🌫";
  if (code <= 67) return "🌧";
  if (code <= 77) return "❄";
  if (code <= 86) return "🌦";
  return "⛈";
};

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    setTime(formatTime(new Date(), timeZone));
    const id = window.setInterval(() => {
      setTime(formatTime(new Date(), timeZone));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(date);
}

function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let cancelled = false;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=${encodeURIComponent(
      TIMEZONE
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data?.current) return;
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
        });
      })
      .catch(() => {
        // Quietly ignore — the widget gracefully degrades to just location + time.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return weather;
}

export default function LiveLocation() {
  const time = useLocalTime(TIMEZONE);
  const weather = useWeather();

  return (
    <div className="group flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500/80 dark:bg-emerald-400/80"
        />
        <span>Live · {LOCATION_LABEL}</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pl-[14px] text-slate-700 dark:text-slate-300">
        <span className="tabular-nums">33.4°N 111.9°W</span>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <span className="tabular-nums">{time} MST</span>
        {weather && (
          <>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="tabular-nums">
              <span className="mr-1 not-italic">{weatherGlyph(weather.code)}</span>
              {weather.temperature}°F · {weatherCopy(weather.code)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
