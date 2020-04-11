import React, {Component} from "react";
import CanvasParameters from "./CanvasParameters";

class Canvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawing: false,
            brushPosition: {x: 0, y: 0},
            context: undefined,
            color: `black`,
            mode: `drawing`,
            stepsBefore: [],
            stepsAfter: [],
        };

        const moveBrush = (evt) => {
            const canvas = evt.target;
            this.setState({
                brushPosition: {
                    x: (evt.pageX - canvas.offsetParent.offsetLeft) * evt.target.width / evt.target.offsetWidth,
                    y: (evt.pageY - canvas.offsetParent.offsetTop) * evt.target.height / evt.target.offsetHeight,
                },
                context: evt.target.getContext(`2d`),
            });
        };

        const handleMouseUp = (canvas, triggerHandleMouseUp) => {
            const {context, stepsBefore} = this.state;
            context.closePath();
            this.setState({
                drawing: false,
                stepsBefore: [...stepsBefore, canvas.toDataURL()],
            });
            window.removeEventListener(`mouseup`, triggerHandleMouseUp);
        };

        this.handleMouseDown = (evt) => {
            const {context, brushPosition, mode, color} = this.state;
            this.setState({drawing: true});
            moveBrush(evt);
            context.beginPath();
            context.moveTo(brushPosition.x, brushPosition.y);
            context.imageSmoothingEnabled = true;
            context.lineCap = `round`;
            context.imageSmoothingQuality = `low`;
            if (mode === `drawing`) {
                context.lineWidth = 20;
                context.strokeStyle = color;
            } else {
                context.lineWidth = 120;
                context.strokeStyle = `white`;
            }
            this.setState({stepsAfter: []});
            const canvas = evt.target;
            const triggerHandleMouseUp = () => handleMouseUp(canvas, triggerHandleMouseUp);
            window.addEventListener(`mouseup`, triggerHandleMouseUp);
        };

        this.handleMouseMove = (evt) => {
            const {drawing, context, brushPosition} = this.state;
            moveBrush(evt);
            if (drawing) {
                context.lineTo(brushPosition.x, brushPosition.y);
                context.stroke();
            }
        };

        this.useState = (parameter) =>
            (value) => {
                const obj = {};
                obj[parameter] = value;
                this.setState(obj);
            };
    }

    render() {
        const {context, mode, stepsBefore, stepsAfter} = this.state;
        return <div className="canvas">
            <CanvasParameters
                context={context}
                mode={mode}
                stepsBefore={stepsBefore}
                stepsAfter={stepsAfter}
                setColor={this.useState(`color`)}
                setMode={this.useState(`mode`)}
                setStepsBefore={this.useState(`stepsBefore`)}
                setStepsAfter={this.useState(`stepsAfter`)}
            />
            <canvas
                className="canvas__canvas"
                width="2048"
                height="1536"
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
            />
        </div>;
    }
}

export default Canvas;
