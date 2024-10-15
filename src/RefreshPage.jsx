import React, { useEffect, useState } from 'react'

export default function RefreshPage() {
    
    const [time, setTime] = useState(Date.now())

    const refreshPage = () => {
        useEffect(() => {
            const interval = setInterval(() => setTime(Date.now()), 1000);
            return () => {
                clearInterval(interval);
            };
        }, []);
    }
  return refreshPage;
}
