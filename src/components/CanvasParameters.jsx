import React from "react";

function CanvasParameters({setMode, context, setColor, stepsBefore, setStepsBefore, stepsAfter, setStepsAfter}) {

    const handleUndo = () => {
        const tmp = stepsBefore.slice(0, -1);
        if (tmp.length === 1) handleReset();
        const canvasImage = new Image();
        canvasImage.onload = () => {
            context.clearRect(0, 0, 1024, 768);
            context.drawImage(canvasImage, 0, 0);
        };
        canvasImage.setAttribute(`src`, tmp[tmp.length - 1]);
        setStepsAfter([...stepsAfter, stepsBefore[stepsBefore.length - 1]]);
        setStepsBefore(tmp);
    };

    const handleRedo = () => {
        const canvasImage = new Image();
        canvasImage.onload = () => {
            context.clearRect(0, 0, 1024, 768);
            context.drawImage(canvasImage, 0, 0);
        };
        canvasImage.setAttribute(`src`, stepsAfter[stepsAfter.length - 1]);
        setStepsBefore([...stepsBefore, stepsAfter[stepsAfter.length - 1]]);
        setStepsAfter(stepsAfter.slice(0, -1));
    };

    const handleReset = () => {
        setStepsAfter([...stepsAfter, stepsBefore[-1]]);
        context.clearRect(0, 0, 1024, 768);
        setStepsBefore([``]);
        setStepsAfter([]);
    };

    return <div className="canvas__parameters">
        <button onClick={() => setMode(`drawing`)}>Draw</button>
        <button onClick={() => setMode(`erasing`)}>Erase</button>
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
