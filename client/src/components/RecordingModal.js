import React from 'react'
import ScriptController from './ScriptController'
import { useState, useEffect } from 'react';
import UtteranceDisplayer from './UtteranceDisplayer';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import AudioPlayer from './AudioPlayer';

function RecordingModal() {

    const [currentState, setCurrentState] = useState({currentLine: 0, recordState: null, audioData: null})
    const [error, setError] = useState("");

    const utterances = JSON.parse('["Ellen looked out at the street through the glass front.", " The man from four hundred and ten was standing out there, smoking a cigarette, watching her.", " When their eyes met, he abruptly threw away the cigarette and started walking toward the apartment house.", " Again she felt that faint dread she had experienced in the hall earlier.", " The waitress picked up her quarter, gave her back a nickel and a dime.", " four hundred and ten was just ahead of her in the lobby.", "He held the front door open for her.", " He opened the elevator doors, too, and she stepped in ahead of him.", " When the doors clanged shut, she had a feeling of panic.", "Come in, my dear, come in.", " She almost fell over the landing.", " The door closed behind her.", " She stumbled to the davenport, sank down, gasping.", " Two cats rubbed against her legs, purring.", " Two cats? She heard herself say stupidly, Missis Moffatt, wheres the other cat? and wondered why she said it."]')

    const previousLine = (event) => {
        var originalLineNumber = currentState.currentLine
        if (currentState.currentLine >= 1) {
            setCurrentState({
                currentLine: originalLineNumber - 1
            })
        }
        console.log("previous line: ", currentState.currentLine)
    }

    const nextLine = (event) => {
        var originalLineNumber = currentState.currentLine
        if (currentState.currentLine >= 0) {
            setCurrentState({
                currentLine: originalLineNumber + 1
            })
        }
        console.log("next line: ", currentState.currentLine)
    }

    const start = (event) => {
        console.log("Start")
        setCurrentState({
            currentLine: currentState.currentLine,
            recordState: RecordState.START,
            audioData: currentState.audioData
        })
        console.log(currentState)
    }

    const pause = (event) => {
        console.log("Pause")
        setCurrentState({
            currentLine: currentState.currentLine,
            recordState: RecordState.PAUSE,
            audioData: currentState.audioData
        })
    }

    const stop = (event) => {
        setCurrentState({
            currentLine: currentState.currentLine,
            recordState: RecordState.STOP,
            audioData: currentState.audioData
        })
    }

    const onStop = (audioData) => {
        console.log('audioData', audioData)
        setCurrentState({
            currentLine: currentState.currentLine,
            recordState: currentState.recordState,
            audioData: audioData
        })
        AudioPlayerRendering()
    }

    const AudioPlayerRendering = () => {
        return <AudioPlayer source={currentState.audioData}></AudioPlayer>
    }

    return (
        <><div>RecordingModal</div><div>
            <UtteranceDisplayer line={utterances[currentState.currentLine]}></UtteranceDisplayer>
            <AudioReactRecorder state={currentState.recordState} onStop={onStop}></AudioReactRecorder>
            {/* {AudioPlayerRendering} */}
            <AudioPlayer source={currentState.audioData}></AudioPlayer>
            <ScriptController previousLine={previousLine} nextLine={nextLine} start={start} stop={stop} pause={pause}></ScriptController>
        </div></>
    )
}

export default RecordingModal