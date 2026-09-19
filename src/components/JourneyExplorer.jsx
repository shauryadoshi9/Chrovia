import React, { useState, useEffect } from "react";
import { 
  GitBranch, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Zap,
  FastForward
} from "lucide-react";

export default function JourneyExplorer({ 
  customers = [], 
  events = [], 
  selectedCustomerId, 
  onSelectCustomer 
}) {
  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];
  const customerEvents = events.filter(e => e.customer_id === currentCustomer?.id);

  // Journey Replay state
  const [replayIndex, setReplayIndex] = useState(customerEvents.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // 1 sec per step

  // Auto-replay timer effect
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

  const activeEvents = customerEvents.slice(0, replayIndex + 1);
  const currentStepEvent = customerEvents[replayIndex];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Controls & Customer Switcher */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <span>Interactive Journey Visualizer</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Cross-Channel Journey Explorer</h2>
          <p className="text-xs text-gray-400 mt-1">
            Chronological step-by-step journey reconstruction and session stitching for {currentCustomer?.name}
          </p>
        </div>

        {/* Customer Select dropdown */}
        <div className="flex items-center space-x-3">
          <label className="text-xs text-gray-400 font-medium">Select Customer:</label>
          <select
            value={currentCustomer?.id}
            onChange={(e) => {
              onSelectCustomer(e.target.value);
              setReplayIndex(0);
              setIsPlaying(false);
            }}
            className="bg-gray-900 border border-white/20 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
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
      <div className="glass-panel p-4 bg-gradient-to-r from-gray-900/90 via-indigo-950/40 to-gray-900/90 border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Playback buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setReplayIndex(0);
              setIsPlaying(false);
            }}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition-all cursor-pointer"
            title="Reset Replay"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setReplayIndex(prev => Math.max(0, prev - 1))}
            disabled={replayIndex <= 0}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-gray-300 text-xs transition-all cursor-pointer"
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
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-gray-300 text-xs transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Replay Progress Bar & Step Counter */}
        <div className="flex-1 max-w-md w-full px-4">
          <div className="flex justify-between text-[11px] text-gray-400 font-mono mb-1">
            <span>Step {replayIndex + 1} of {customerEvents.length}</span>
            <span>{currentStepEvent?.time_display || "00:00"}</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${((replayIndex + 1) / (customerEvents.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Speed selector */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <FastForward className="w-3.5 h-3.5 text-indigo-400" />
          <span>Speed:</span>
          <button
            onClick={() => setPlaybackSpeed(1500)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${playbackSpeed === 1500 ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-400"}`}
          >
            1x
          </button>
          <button
            onClick={() => setPlaybackSpeed(750)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${playbackSpeed === 750 ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-400"}`}
          >
            2x
          </button>
        </div>

      </div>

      {/* Visual Journey Path Graph (Node Nodes across Channels) */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <span>Cross-Channel Flow Diagram</span>
          </h3>
          <span className="text-xs text-gray-400 font-mono">
            Session IDs Linked: {[...new Set(customerEvents.map(e => e.session_id))].join(", ")}
          </span>
        </div>

        {/* Horizontal Node Path Container */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="flex items-center space-x-4 min-w-[700px]">
            {customerEvents.map((evt, idx) => {
              const isPast = idx <= replayIndex;
              const isCurrent = idx === replayIndex;

              return (
                <React.Fragment key={evt.id}>
                  {/* Node Card */}
                  <div
                    onClick={() => setReplayIndex(idx)}
                    className={`flex-1 p-4 rounded-xl border transition-all cursor-pointer min-w-[180px] relative ${
                      isCurrent
                        ? "bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-500/30 scale-105"
                        : isPast
                        ? "bg-gray-900/80 border-white/20 hover:border-indigo-500/40"
                        : "bg-gray-900/30 border-white/5 opacity-40"
                    }`}
                  >
                    {/* Channel Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`badge badge-${evt.channel.toLowerCase()}`}>
                        {evt.channel}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{evt.time_display}</span>
                    </div>

                    <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">{evt.event_type}</h4>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{evt.details}</p>

                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                      <span className={`font-semibold ${
                        evt.status === "FAILED" || evt.status === "ESCALATED" ? "text-rose-400" : "text-emerald-400"
                      }`}>
                        {evt.status}
                      </span>
                      {evt.linked_issue_id && (
                        <span className="text-amber-400 font-mono font-bold">{evt.linked_issue_id}</span>
                      )}
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {idx < customerEvents.length - 1 && (
                    <ChevronRight className={`w-5 h-5 shrink-0 ${
                      idx < replayIndex ? "text-indigo-400" : "text-gray-700"
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
          <div className="flex items-center space-x-2 text-indigo-300 font-bold text-sm">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Active Step Inspection: Step {replayIndex + 1} - {currentStepEvent.event_type}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-gray-900/80 border border-white/10">
              <span className="text-gray-400 block text-[10px]">Event ID & Channel</span>
              <span className="font-extrabold text-white">{currentStepEvent.id}</span>
              <span className={`ml-2 badge badge-${currentStepEvent.channel.toLowerCase()}`}>
                {currentStepEvent.channel}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-gray-900/80 border border-white/10">
              <span className="text-gray-400 block text-[10px]">Session & Timestamp</span>
              <span className="font-mono text-gray-200">{currentStepEvent.session_id}</span>
              <span className="block text-indigo-400 font-semibold">{currentStepEvent.timestamp}</span>
            </div>

            <div className="p-3 rounded-lg bg-gray-900/80 border border-white/10">
              <span className="text-gray-400 block text-[10px]">Sentiment Signal</span>
              <span className={`font-bold ${
                currentStepEvent.sentiment === "VERY_NEGATIVE" || currentStepEvent.sentiment === "FRUSTRATED"
                  ? "text-rose-400"
                  : "text-emerald-400"
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
