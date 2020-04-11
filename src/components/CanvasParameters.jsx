import React from "react";

function CanvasParameters(props) {
    const {
        mode, setMode,
        context,
        setColor,
        stepsBefore, setStepsBefore,
        stepsAfter, setStepsAfter
    } = props;

    const drawImage = (source) => {
        const canvasImage = new Image();
        canvasImage.onload = () => {
            context.clearRect(0, 0, 2048, 1536);
            context.drawImage(canvasImage, 0, 0);
        };
        canvasImage.setAttribute(`src`, source);
    };

    const handleUndo = () => {
        const tmp = stepsBefore.slice(0, -1);
        if (tmp.length === 0) context.clearRect(0, 0, 2048, 1536);
        if (stepsBefore.length === 0) return;
        drawImage(tmp[tmp.length - 1]);
        setStepsAfter([...stepsAfter, stepsBefore[stepsBefore.length - 1]]);
        setStepsBefore(tmp);
    };

    const handleRedo = () => {
        if (stepsAfter.length === 0) return;
        drawImage(stepsAfter[stepsAfter.length - 1]);
        setStepsBefore([...stepsBefore, stepsAfter[stepsAfter.length - 1]]);
        setStepsAfter(stepsAfter.slice(0, -1));
    };

    const handleReset = () => {
        setStepsAfter([...stepsAfter, stepsBefore[-1]]);
        context.clearRect(0, 0, 2048, 1536);
        setStepsBefore([]);
        setStepsAfter([]);
    };

    return <div className="canvas__parameters">
        <button
            className={mode === `drawing` ? `active` : null}
            onClick={() => setMode(`drawing`)}
        >
            Draw
        </button>
        <button
            className={mode === `erasing` ? `active` : null}
            onClick={() => setMode(`erasing`)}
        >
            Erase
        </button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleReset}>Reset</button>
        <input
            type="color"
            onChange={(evt) => setColor(evt.target.value)}
            id="color"
        />
        <label htmlFor="color">Color</label>
    </div>
}

export default CanvasParameters;
