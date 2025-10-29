import React, { useRef, useState } from "react";

// const BACKEND_URL = "http://localhost:8000";
const BACKEND_URL = process.env.REACT_APP_API_URL;

function DemoButton({text, onClick, disabled = false}) {
    return(
        <button 
            className="py-2 px-4 text-lg rounded-md bg-blue-950 text-slate-100 disabled:bg-gray-400 disabled:cursor-not-allowed" 
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

function Demo() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [pc, setPc] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [logs, setLogs] = useState([]);
  const [connectionState, setConnectionState] = useState("new");
  const [iceState, setIceState] = useState("new");

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  const startGame = async () => {
    try {
      addLog(`Backend URL: ${BACKEND_URL}`, "info");
      
      // Test backend connectivity first
      addLog("Testing backend connection...", "info");
      const healthCheck = await fetch(`${BACKEND_URL}/`, {
        method: "GET",
      });
      if (!healthCheck.ok) {
        throw new Error(`Backend health check failed: ${healthCheck.status}`);
      }
      addLog("✓ Backend is reachable", "success");

      setStreaming(true);
      // Fetch ICE configuration from backend to ensure consistency
      const iceConfigResponse = await fetch(`${BACKEND_URL}/ice-config`);
      const iceConfig = await iceConfigResponse.json();
      addLog(`ICE servers: ${iceConfig.ice_servers.length} configured`, "info");
      
      const pc = new RTCPeerConnection({
        iceServers: iceConfig.ice_servers
      });
      setPc(pc);

      // Log ICE connection state changes
      pc.oniceconnectionstatechange = () => {
        setIceState(pc.iceConnectionState);
        addLog(`ICE Connection State: ${pc.iceConnectionState}`, 
               pc.iceConnectionState === "connected" ? "success" : "info");
      };

      // Log connection state changes
      pc.onconnectionstatechange = () => {
        setConnectionState(pc.connectionState);
        addLog(`Connection State: ${pc.connectionState}`,
               pc.connectionState === "connected" ? "success" : "info");
      };

      // Log ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          addLog(`ICE Candidate: ${event.candidate.candidate.substring(0, 50)}...`, "debug");
        } else {
          addLog("ICE Gathering Complete", "info");
        }
      };

      // Register remote track handler
      pc.ontrack = (event) => {
        addLog("✓ Received remote track", "success");
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // Get local video feed from browser
      addLog("Requesting camera access...", "info");
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, frameRate: {min: 20}, resizeMode: "none" },
        audio: false
      });
      addLog("✓ Camera access granted", "success");

      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;

      // Add local tracks
      localStream.getTracks().forEach(track => {
        const sender = pc.addTrack(track, localStream);
        addLog(`Added ${track.kind} track`, "info");
      });

      // Adjust sender params for better quality
      const sender = pc.getSenders().find(s => s.track && s.track.kind === "video");
      if (sender) {
        const params = sender.getParameters();
        if (!params.encodings) params.encodings = [{}];

        params.encodings[0].scaleResolutionDownBy = 1;
        params.encodings[0].maxBitrate = 5_000_000;
        
        await sender.setParameters(params);
        addLog("✓ Video encoding parameters set", "info");
      }

      // Create offer after tracks are added
      addLog("Creating offer...", "info");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      addLog("✓ Local description set", "success");

      // Send offer to backend
      addLog("Sending offer to backend...", "info");
      const response = await fetch(`${BACKEND_URL}/offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sdp: offer.sdp, type: offer.type, resolution: 720 }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
      }

      const answer = await response.json();
      addLog("✓ Received answer from backend", "success");

      // Set remote description
      await pc.setRemoteDescription(answer);
      addLog("✓ Remote description set", "success");
      addLog("WebRTC negotiation complete. Waiting for connection...", "info");

    } catch (err) {
      addLog(`ERROR: ${err.message}`, "error");
      console.error("Start game error:", err);
      setStreaming(false);
    }
  };

  const stopGame = async () => {
    setStreaming(false);
    addLog("Stopping game...", "info");

    if (pc) {
      pc.getSenders().forEach(sender => {
        if (sender.track) sender.track.stop();
      });
      pc.close();
      setPc(null);
      addLog("✓ Peer connection closed", "info");
    }

    try {
      await fetch(`${BACKEND_URL}/stop`, { method: "POST" });
      addLog("✓ Backend stop signal sent", "success");
    } catch (err) {
      addLog(`Warning: Backend stop call failed: ${err.message}`, "warning");
    }

    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      remoteVideoRef.current.srcObject = null;
    }

    setConnectionState("new");
    setIceState("new");
  };

  const resetGame = async () => {
    try {
      await fetch(`${BACKEND_URL}/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      addLog("✓ Game reset", "success");
    } catch (err) {
      addLog(`Reset failed: ${err.message}`, "error");
    }
  };
  
  const toggleTracking = async () => {
    try{
      await fetch(`${BACKEND_URL}/toggle_tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      addLog("✓ Tracking toggled", "success");
    } catch (err) {
      addLog(`Toggle tracking failed: ${err.message}`, "error");
    }
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="mt-8 mb-8 flex flex-col justify-center items-center">
      <div className="flex flex-row items-center">
        <h2 className="text-3xl p-4 font-bold text-slate-800">Connect4AR Demo</h2>
        <div className="relative inline-block group p-4">
          <div className="w-10 h-10 rounded-full bg-gray-700 text-slate-100 flex items-center justify-center cursor-pointer text-2xl font-bold">
            ?
          </div>
          <div className="absolute top-full left-full ml-2 -translate-y-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded bg-gray-800 text-white text-xs px-2 py-1 whitespace-pre-line pointer-events-none w-64 z-10">
            This demo uses WebRTC to stream video from your browser to a backend server
            that processes the video feed to detect your hand movements and play Connect 4 in AR!
            <br/><br/>
            Click "Start Game" to begin playing! <br/>
            To stop the game, click "Stop Game". <br/>
            To reset the game board, click "Reset". <br/>
            To toggle tracking markers, click "Toggle Tracking Markers". <br/><br/>
            Pinch above the connect 4 board to "grab" a game token, then move your hand to the desired column
            and release to drop the token in that column. <br/><br/>
            Have fun!
          </div>
        </div>
      </div>

      {/* Under Construction Banner */}
        <div className="w-full max-w-4xl bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🚧</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">Demo Currently Under Construction</h3>
              <p className="text-yellow-700 mb-2">
                The live demo is temporarily unavailable as I ran out of GCP credits for hosting the backend
                and the TURN server. Working on getting the infrastructure back up and running soon once I
                get more credits for a larger VM.
              </p>
              <p className="text-yellow-700">
                In the meantime, check out the project documentation and code on GitHub{" "}
                <a 
                  href = "https://github.com/notjamesw/Connect4AR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-yellow-900"
                >
                  here
                </a> which includes
                a video demo of the application.
              </p>
            </div>
          </div>
        </div>

      {/* Connection Status */}
      {/* <div className="mb-4 flex gap-4 items-center">
        <div className="px-3 py-1 rounded bg-gray-100 text-sm">
          Connection: <span className={`font-bold ${connectionState === 'connected' ? 'text-green-600' : 'text-gray-600'}`}>
            {connectionState}
          </span>
        </div>
        <div className="px-3 py-1 rounded bg-gray-100 text-sm">
          ICE: <span className={`font-bold ${iceState === 'connected' ? 'text-green-600' : 'text-gray-600'}`}>
            {iceState}
          </span>
        </div>
      </div> */}


      <div className="my-8">
        {!streaming ? (
          <DemoButton text="Start Game" onClick={startGame}/>
        ) : (
          <div className="flex flex-row gap-4">
            <DemoButton text="Stop Game" onClick={stopGame} />
            <DemoButton text="Reset" onClick={resetGame} />
            <DemoButton text="Toggle Tracking Markers" onClick={toggleTracking} />
          </div>
        )}
      </div>

      <div className="mb-8 rounded-xl">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          width="1280"
          height="720"
          className="bg-black"
        />
      </div>

      {/* Debug Logs */}
      {/* <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-slate-800">Debug Logs</h3>
          <button 
            onClick={clearLogs}
            className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Clear Logs
          </button>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-64 overflow-y-auto font-mono text-xs">
          {logs.length === 0 ? (
            <div className="text-gray-500">No logs yet. Click "Start Game" to begin.</div>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className={`mb-1 ${
                log.type === 'error' ? 'text-red-400' : 
                log.type === 'success' ? 'text-green-400' :
                log.type === 'warning' ? 'text-yellow-400' :
                log.type === 'debug' ? 'text-gray-500' :
                'text-gray-300'
              }`}>
                <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
              </div>
            ))
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Demo;