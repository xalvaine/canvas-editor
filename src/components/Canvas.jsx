import React, {useState} from "react";
import CanvasParameters from "./CanvasParameters";

function Canvas() {
    const [drawing, setDrawing] = useState(false);
    const [brushPosition, setBrushPosition] = useState({x: 0, y: 0});
    const [context, setContext] = useState();
    const [color, setColor] = useState(`black`);
    const [mode, setMode] = useState(`drawing`);
    const [stepsBefore, setStepsBefore] = useState([``]);
    const [stepsAfter, setStepsAfter] = useState([]);

    const moveBrush = (evt) => {
        const canvas = evt.target;
        setBrushPosition({
            x: evt.pageX - canvas.offsetParent.offsetLeft,
            y: evt.pageY - canvas.offsetParent.offsetTop,
        });
        setContext(evt.target.getContext(`2d`));
    };

    const handleMouseDown = (evt) => {
        setDrawing(true);
        moveBrush(evt);
        context.beginPath();
        context.moveTo(brushPosition.x, brushPosition.y);
        if (mode === `drawing`) {
            context.lineWidth = 5;
            context.strokeStyle = color;
        } else {
            context.lineWidth = 30;
            context.strokeStyle = `white`;
        }
        setStepsAfter([]);
        window.addEventListener(`mouseup`, handleMouseUp);
    };

    const handleMouseMove = (evt) => {
        moveBrush(evt);
        if (drawing) {
            context.lineTo(brushPosition.x, brushPosition.y);
            context.stroke();
        }
    };

    const handleMouseUp = (evt) => {
        setDrawing(false);
        context.closePath();
        setStepsBefore([...stepsBefore, evt.target.toDataURL()]);
        window.removeEventListener(`mouseup`, handleMouseUp);
    };

    return <div className="canvas">
        <CanvasParameters
            context={context}
            setColor={setColor}
            setMode={setMode}
            stepsBefore={stepsBefore}
            setStepsBefore={setStepsBefore}
            stepsAfter={stepsAfter}
            setStepsAfter={setStepsAfter}
        />
        <canvas
            className="canvas__canvas"
            width="1024"
            height="768"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
        />
    </div>;
}

export default Canvas;