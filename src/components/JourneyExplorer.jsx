import React, { useState, useEffect } from "react";
import { 
  GitBranch, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  Zap,
  FastForward,
  Repeat
} from "lucide-react";

export default function JourneyExplorer({ 
  customers = [], 
  events = [], 
  selectedCustomerId, 
  onSelectCustomer 
}) {
  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];
  const customerEvents = events.filter(e => e.customer_id === currentCustomer?.id);

  const [replayIndex, setReplayIndex] = useState(customerEvents.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setReplayIndex(prev => {
          if (prev >= customerEvents.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, customerEvents.length, playbackSpeed]);

  const currentStepEvent = customerEvents[replayIndex];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Controls & Customer Switcher */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <GitBranch className="w-4 h-4 text-indigo-500" />
            <span>Interactive Journey Visualizer</span>
          </div>
          <h2 className="text-xl font-extrabold text-[var(--text-main)]">Cross-Channel Journey Explorer</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Chronological step-by-step journey reconstruction and session stitching for {currentCustomer?.name}
          </p>
        </div>

        {/* Customer Select dropdown */}
        <div className="flex items-center space-x-3">
          <label className="text-xs text-[var(--text-muted)] font-medium">Select Customer:</label>
          <select
            value={currentCustomer?.id}
            onChange={(e) => {
              onSelectCustomer(e.target.value);
              setReplayIndex(0);
              setIsPlaying(false);
            }}
            className="bg-[var(--bg-inner)] border border-[var(--border-panel)] text-[var(--text-main)] text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Journey Replay Control Bar */}
      <div className="glass-panel p-4 bg-gradient-to-r from-[var(--bg-panel)] via-[var(--bg-inner)] to-[var(--bg-panel)] border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Playback buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setReplayIndex(0);
              setIsPlaying(false);
            }}
            className="p-2 rounded-lg bg-[var(--bg-inner)] hover:bg-[var(--bg-panel-hover)] border border-[var(--border-panel)] text-[var(--text-main)] text-xs transition-all cursor-pointer"
            title="Reset Replay"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setReplayIndex(prev => Math.max(0, prev - 1))}
            disabled={replayIndex <= 0}
            className="p-2 rounded-lg bg-[var(--bg-inner)] hover:bg-[var(--bg-panel-hover)] border border-[var(--border-panel)] disabled:opacity-40 text-[var(--text-main)] text-xs transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause Replay" : "Play Journey"}</span>
          </button>

          <button
            onClick={() => setReplayIndex(prev => Math.min(customerEvents.length - 1, prev + 1))}
            disabled={replayIndex >= customerEvents.length - 1}
            className="p-2 rounded-lg bg-[var(--bg-inner)] hover:bg-[var(--bg-panel-hover)] border border-[var(--border-panel)] disabled:opacity-40 text-[var(--text-main)] text-xs transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Replay Progress Bar & Step Counter */}
        <div className="flex-1 max-w-md w-full px-4">
          <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-mono mb-1">
            <span>Step {replayIndex + 1} of {customerEvents.length}</span>
            <span>{currentStepEvent?.time_display || "00:00"}</span>
          </div>
          <div className="w-full bg-[var(--bg-inner)] h-2 rounded-full overflow-hidden border border-[var(--border-panel)]">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${((replayIndex + 1) / (customerEvents.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Speed selector */}
        <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
          <FastForward className="w-3.5 h-3.5 text-indigo-500" />
          <span>Speed:</span>
          <button
            onClick={() => setPlaybackSpeed(1500)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${playbackSpeed === 1500 ? "bg-indigo-600 text-white" : "bg-[var(--bg-inner)] text-[var(--text-dim)]"}`}
          >
            1x
          </button>
          <button
            onClick={() => setPlaybackSpeed(750)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${playbackSpeed === 750 ? "bg-indigo-600 text-white" : "bg-[var(--bg-inner)] text-[var(--text-dim)]"}`}
          >
            2x
          </button>
        </div>

      </div>

      {/* Visual Journey Path Graph (Node Nodes across Channels) */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[var(--text-main)] flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            <span>Cross-Channel Flow Diagram</span>
          </h3>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            Session IDs Linked: {[...new Set(customerEvents.map(e => e.session_id))].join(", ")}
          </span>
        </div>

        {/* Horizontal Node Path Container */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="flex items-center space-x-4 min-w-[700px]">
            {customerEvents.map((evt, idx) => {
              const isPast = idx <= replayIndex;
              const isCurrent = idx === replayIndex;
              const isRepeatContact = evt.event_type === "REPEAT_CONTACT";

              return (
                <React.Fragment key={evt.id}>
                  {/* Node Card */}
                  <div
                    onClick={() => setReplayIndex(idx)}
                    className={`flex-1 p-4 rounded-xl border transition-all cursor-pointer min-w-[190px] relative ${
                      isCurrent
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-xl shadow-indigo-600/30 scale-105 ring-2 ring-indigo-500"
                        : isPast
                        ? "bg-[var(--bg-inner)] border-[var(--border-panel)] hover:border-indigo-500/50"
                        : "bg-[var(--bg-inner)] border-[var(--border-panel)] opacity-40"
                    }`}
                  >
                    {/* Channel Tag & Time */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`badge ${isCurrent ? "bg-white/20 text-white border-white/40 font-bold" : `badge-${evt.channel.toLowerCase()}`}`}>
                        {evt.channel}
                      </span>
                      <span className={`text-[10px] font-mono ${isCurrent ? "text-indigo-100 font-bold" : "text-[var(--text-dim)]"}`}>
                        {evt.time_display}
                      </span>
                    </div>

                    {/* Event Type & Repeat Contact Highlight */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className={`text-xs font-extrabold line-clamp-1 ${isCurrent ? "text-white" : "text-[var(--text-main)]"}`}>
                        {evt.event_type}
                      </h4>
                      {isRepeatContact && (
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border shrink-0 flex items-center space-x-1 ${
                          isCurrent ? "bg-amber-400 text-slate-900 border-amber-300 font-black" : "bg-amber-500/25 text-amber-800 dark:text-amber-300 border-amber-500/40"
                        }`}>
                          <Repeat className="w-2.5 h-2.5" />
                          <span>REPEAT</span>
                        </span>
                      )}
                    </div>

                    <p className={`text-[11px] line-clamp-2 ${isCurrent ? "text-indigo-100 font-medium" : "text-[var(--text-muted)]"}`}>
                      {evt.details}
                    </p>

                    <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${isCurrent ? "border-white/20" : "border-[var(--border-panel)]"}`}>
                      <span className={`font-extrabold ${
                        isCurrent
                          ? "text-white"
                          : evt.status === "FAILED" || evt.status === "ESCALATED"
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}>
                        {evt.status}
                      </span>
                      {evt.linked_issue_id && (
                        <span className={`font-mono font-bold px-1.5 py-0.5 rounded border ${
                          isCurrent
                            ? "bg-white/20 text-white border-white/30"
                            : "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"
                        }`}>
                          {evt.linked_issue_id}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {idx < customerEvents.length - 1 && (
                    <ChevronRight className={`w-5 h-5 shrink-0 ${
                      idx < replayIndex ? "text-indigo-500" : "text-[var(--text-dim)]"
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Step Details Panel */}
      {currentStepEvent && (
        <div className="glass-panel p-6 space-y-4 border-indigo-500/40">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-300 font-bold text-sm">
            <Zap className="w-4 h-4 text-indigo-500" />
            <span>Active Step Inspection: Step {replayIndex + 1} - {currentStepEvent.event_type}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-[var(--bg-inner)] border border-[var(--border-panel)]">
              <span className="text-[var(--text-dim)] block text-[10px]">Event ID & Channel</span>
              <span className="font-extrabold text-[var(--text-main)]">{currentStepEvent.id}</span>
              <span className={`ml-2 badge badge-${currentStepEvent.channel.toLowerCase()}`}>
                {currentStepEvent.channel}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-inner)] border border-[var(--border-panel)]">
              <span className="text-[var(--text-dim)] block text-[10px]">Session & Timestamp</span>
              <span className="font-mono text-[var(--text-main)]">{currentStepEvent.session_id}</span>
              <span className="block text-indigo-600 dark:text-indigo-400 font-semibold">{currentStepEvent.timestamp}</span>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-inner)] border border-[var(--border-panel)]">
              <span className="text-[var(--text-dim)] block text-[10px]">Sentiment Signal</span>
              <span className={`font-bold ${
                currentStepEvent.sentiment === "VERY_NEGATIVE" || currentStepEvent.sentiment === "FRUSTRATED"
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}>
                {currentStepEvent.sentiment}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
