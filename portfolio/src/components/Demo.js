import React, { useRef, useState } from "react";

const BACKEND_URL = process.env.API_URL;

function DemoButton({text, onClick}) {
    return(
        <button class = "py-2 px-4 text-lg rounded-md bg-blue-950 text-slate-100" onClick={onClick}>
            {text}
        </button>
    );
}

function Demo() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [pc, setPc] = useState(null);
  const [streaming, setStreaming] = useState(false);


  const startGame = async () => {
    setStreaming(true);
    const pc = new RTCPeerConnection();
    setPc(pc);

    // Register remote track handler
    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Get local video feed from browser
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720, frameRate: {min: 20}, resizeMode: "none" },
      audio: false
    });

    // Adjust sender params for better quality
    const sender = pc.getSenders().find(s => s.track && s.track.kind === "video");
    if (sender) {
      const params = sender.getParameters();
      if (!params.encodings) params.encodings = [{}];

      params.encodings[0].scaleResolutionDownBy = 1; // no downscaling
      params.encodings[0].maxBitrate = 5_000_000;    // allow up to 5 Mbps bitrate
      
      await sender.setParameters(params);
      
      // console.log("Sender parameters:", params);
      // Also inspect the video track itself
      // const settings = sender.track.getSettings();
      // console.log(`Track capture: ${settings.width}x${settings.height} @ ${settings.frameRate}fps`);
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = localStream;

    // Add local tracks
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    // Create offer after tracks are added
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Send offer to backend
    const response = await fetch(`${BACKEND_URL}/offer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sdp: offer.sdp, type: offer.type, resolution: 720 }),
    });
    const answer = await response.json();

    // Set remote description
    await pc.setRemoteDescription(answer);
  };

  // Stop game / close peer connection
    const stopGame = async () => {
        setStreaming(false);

        if (pc) {
            pc.getSenders().forEach(sender => {
                if (sender.track) sender.track.stop();
            });
            pc.close();
            setPc(null);
        }

        try {
            await fetch(`${BACKEND_URL}/stop`, { method: "POST" });
        } catch (err) {
            console.warn("Backend stop call failed:", err);
        }

        if (localVideoRef.current?.srcObject) {
            localVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
            localVideoRef.current.srcObject = null;
        }

        if (remoteVideoRef.current?.srcObject) {
            remoteVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
            remoteVideoRef.current.srcObject = null;
        }
    };

  const resetGame = async () => {
    try {
      await fetch(`${BACKEND_URL}/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
    } catch (err) {
      console.warn("Backend reset call failed:", err);
    }
  };
  
  const toggleTracking = async () => {
    try{
      await fetch(`${BACKEND_URL}/toggle_tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
    } catch (err) {
      console.warn("Backend toggle_hands call failed:", err);
    }
  };

    return (
        <div class="mt-8 mb-8 flex flex-col justify-center items-center">
            <div class = "flex flex-row">
                <h2 class = "text-3xl p-4 font-bold text-slate-800">Connect4AR Demo</h2>
                <div class="relative inline-block group p-4">
                    <div
                        class="w-10 h-10 rounded-full bg-gray-700 text-slate-100
                            flex items-center justify-center cursor-pointer text-2xl font-bold"
                    >
                        ?
                    </div>

                    <div
                        class="absolute top-full left-full ml-2 -translate-y-1/4
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-300
                                rounded bg-gray-800 text-white text-xs px-2 py-1 whitespace-wrap whitespace-pre-line
                                pointer-events-none w-64"
                        >
                        This demo uses WebRTC to stream video from your browser to a backend server
                        that processes the video feed to detect your hand movements and play Connect 4 in AR!
                        <br></br><br></br>
                        Click "Start Game" to begin playing! <br></br>
                        To stop the game, click "Stop Game". <br></br>
                        To reset the game board, click "Reset". <br></br>
                        To toggle tracking markers, click "Toggle Tracking Markers". <br></br><br></br>

                        Pinch above the connect 4 board to "grab" a game token, then move your hand to the desired column
                        and release to drop the token in that column. <br></br><br></br>

                        Have fun!
                    </div>
                    </div>
            </div>
            <div class = "my-8">
            {!streaming ? (
                <DemoButton text="Start Game" onClick={startGame}/>
            ) : (
            <div class = "flex flex-row gap-4">
                <DemoButton text="Stop Game" onClick={stopGame} />
                <DemoButton text="Reset" onClick={resetGame} />
                <DemoButton text="Toggle Tracking Markers" onClick={toggleTracking} />
            </div>
            )}
            </div>
            <div class = "mb-8 rounded-xl">
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    width="1280"
                    height="720"
                    className="bg-black"
                />
            </div>
        </div>
    );
}

export default Demo;