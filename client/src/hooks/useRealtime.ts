"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export interface ExecutionEvent {
  type: "thought" | "tool" | "result" | "error" | "log";
  content?: string;
  tool?: string;
  input?: any;
  output?: any;
  time: string;
}

export function useRealtime(executionId?: string) {
  const [events, setEvents] = useState<ExecutionEvent[]>([]);
  const [status, setStatus] = useState<"idle" | "connecting" | "active" | "completed" | "error">("idle");
  const eventSourceRef = useRef<EventSource | null>(null);
  const { token } = useAuthStore();

  const connect = useCallback(() => {
    if (!executionId || !token) return;

    setStatus("connecting");
    
    // In a real production app, we'd use the backend SSE endpoint
    // For this demo/dev phase, we'll simulate the real-time stream if the URL is not reachable
    // Or connect to: `${process.env.NEXT_PUBLIC_API_URL}/executions/${executionId}/stream?token=${token}`
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/executions/${executionId}/stream?token=${token}`;
    
    try {
      const es = new EventSource(url);
      eventSourceRef.current = es;

      es.onopen = () => {
        setStatus("active");
        console.log("SSE Connected");
      };

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === "done") {
            setStatus("completed");
            es.close();
            return;
          }

          setEvents(prev => [...prev, {
            ...data,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
          }]);
        } catch (err) {
          console.error("Error parsing SSE data", err);
        }
      };

      es.onerror = (err) => {
        console.error("SSE Error", err);
        setStatus("error");
        es.close();
        
        // Simulation mode for dev if backend isn't ready
        if (process.env.NODE_ENV === "development") {
          simulateStream();
        }
      };

    } catch (err) {
      console.error("Failed to create EventSource", err);
      setStatus("error");
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [executionId, token]);

  // Simulation for demonstration purposes
  const simulateStream = () => {
    setStatus("active");
    const mockEvents: Partial<ExecutionEvent>[] = [
      { type: "thought", content: "Analyzing the incoming request..." },
      { type: "tool", tool: "search_db", input: { q: "customer_123" }, output: { name: "Alice" } },
      { type: "thought", content: "Found customer. Preparing personalized response." },
      { type: "tool", tool: "generate_email", input: { to: "alice@example.com" }, output: "Sent" },
      { type: "result", content: "Process completed successfully." }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < mockEvents.length) {
        setEvents(prev => [...prev, {
          ...mockEvents[i],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
        } as ExecutionEvent]);
        i++;
      } else {
        setStatus("completed");
        clearInterval(interval);
      }
    }, 1500);
  };

  useEffect(() => {
    if (executionId) {
      connect();
    }
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [executionId, connect]);

  return { events, status, clearEvents: () => setEvents([]) };
}
