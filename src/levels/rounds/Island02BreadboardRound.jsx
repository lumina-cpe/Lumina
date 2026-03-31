import { useRef, useState, useEffect } from "react";
import "../../styles/Round_Island02BreadboardRound.css";

export default function Island02BreadboardRound()
{
    const nodesRef = useRef({});
    const connectionsRef = useRef({});

    const materialsList =
    [
        "breadboard","battery","switch","resistor",
        "led","led","buzzer","push_button",
        "wire","wire","wire","wire","wire","wire","wire","wire"
    ];

    const correctOrder =
    [
        "breadboard","battery","switch",
        "resistor","led","led","buzzer","push_button"
    ];

    const [placedOrder, setPlacedOrder] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [showGuide, setShowGuide] = useState(false);
    const [tick, setTick] = useState(0);

    function registerNode(id, el)
    {
        if (el) nodesRef.current[id] = el;
    }

    function center(r)
    {
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    function checkSnaps()
    {
        const ids = Object.keys(nodesRef.current);

        for (let i = 0; i < ids.length; i++)
        {
            for (let j = i + 1; j < ids.length; j++)
            {
                const a = nodesRef.current[ids[i]];
                const b = nodesRef.current[ids[j]];

                const pa = center(a.getBoundingClientRect());
                const pb = center(b.getBoundingClientRect());

                const dx = pa.x - pb.x;
                const dy = pa.y - pb.y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d < 14)
                {
                    connectionsRef.current[ids[i]] = ids[j];
                    a.style.background = "#4caf50";
                    b.style.background = "#4caf50";
                }

                if (d > 22 && connectionsRef.current[ids[i]] === ids[j])
                {
                    delete connectionsRef.current[ids[i]];
                    a.style.background = "#bbb";
                    b.style.background = "#bbb";
                }
            }
        }

        setTick(t => t + 1);
    }

    function registerPlacement(type)
    {
        const expected = correctOrder[placedOrder.length];

        if (type === expected)
        {
            setPlacedOrder(p => [...p, type]);
        }
        else
        {
            const m = mistakes + 1;
            setMistakes(m);
            if (m >= 10) setShowGuide(true);
        }
    }

    function Draggable({ children, pos, setPos })
    {
        function down(e)
        {
            const sx = e.clientX;
            const sy = e.clientY;

            function move(ev)
            {
                setPos(p => ({ x: p.x + ev.clientX - sx, y: p.y + ev.clientY - sy }));
                checkSnaps();
            }

            function up()
            {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("mouseup", up);
            }

            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", up);
        }

        return (
            <div className="round-draggable" style={{ left: pos.x, top: pos.y }} onMouseDown={down}>
                {children}
            </div>
        );
    }

    function Node({ id, x, y })
    {
        return (
            <div
                ref={el => registerNode(id, el)}
                className="round-node"
                style={{ left: x, top: y }}
            />
        );
    }

    function Breadboard()
    {
        const holes = [];

        for (let r = 0; r < 24; r++)
        {
            for (let c = 0; c < 10; c++)
            {
                holes.push({ id: `hole-${r}-${c}`, x: c * 18, y: r * 18 });
            }
        }

        useEffect(() =>
        {
            if (Object.keys(connectionsRef.current).length > 0)
            {
                registerPlacement("breadboard");
            }
        }, []);

        return (
            <div className="round-breadboard">
                {holes.map(h => <Node key={h.id} id={h.id} x={h.x} y={h.y} />)}
            </div>
        );
    }

    function TwoPinPart({ type, icon, leftId, rightId })
    {
        const [pos, setPos] = useState({ x: 420, y: 120 });
        const [done, setDone] = useState(false);

        useEffect(() =>
        {
            if (!done && connectionsRef.current[leftId])
            {
                setDone(true);
                registerPlacement(type);
            }
        }, [tick]);

        return (
            <Draggable pos={pos} setPos={setPos}>
                <img src={`/assets/images/circuitround/${icon}.png`} className="round-icon" />
                <Node id={leftId} x={0} y={14} />
                <Node id={rightId} x={60} y={14} />
            </Draggable>
        );
    }

    function Wire({ id })
    {
        const [pos, setPos] = useState({ x: 520, y: 300 });
        const a = `${id}-a`;
        const b = `${id}-b`;

        return (
            <>
                <Draggable pos={pos} setPos={setPos}>
                    <img src="/assets/images/circuitround/wire.png" className="round-icon" />
                    <Node id={a} x={0} y={10} />
                    <Node id={b} x={80} y={10} />
                </Draggable>
                <WireLine a={a} b={b} tick={tick} />
            </>
        );
    }

    function WireLine({ a, b, tick })
    {
        const [line, setLine] = useState({});

        useEffect(() =>
        {
            const A = nodesRef.current[a];
            const B = nodesRef.current[b];
            if (!A || !B) return;

            const pa = center(A.getBoundingClientRect());
            const pb = center(B.getBoundingClientRect());

            setLine({ x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y });
        }, [tick]);

        return (
            <svg className="round-wire_svg">
                <line {...line} stroke="black" strokeWidth="3" />
            </svg>
        );
    }

    return (
        <div className="round-island02breadboard_round">
            <div className="round-inventory">
                {materialsList.map((m, i) =>
                    <img key={i} src={`/assets/images/circuitround/${m}.png`} className="round-inventory_icon" />
                )}
            </div>

            {showGuide &&
                <div className="round-guide">
                    <h3>Correct Order Guide</h3>
                    <ol>
                        <li>Place Breadboard</li>
                        <li>Connect Battery → Breadboard</li>
                        <li>Add Switch</li>
                        <li>Add Resistor</li>
                        <li>Connect LED 1</li>
                        <li>Connect LED 2</li>
                        <li>Add Buzzer</li>
                        <li>Add Push Button</li>
                    </ol>
                </div>
            }

            <Breadboard />
            <TwoPinPart type="battery" icon="battery" leftId="bat-l" rightId="bat-r" />
            <TwoPinPart type="switch" icon="switch" leftId="sw-l" rightId="sw-r" />
            <TwoPinPart type="resistor" icon="resistor" leftId="res-l" rightId="res-r" />
            <TwoPinPart type="led" icon="led" leftId="led1-l" rightId="led1-r" />
            <TwoPinPart type="led" icon="led" leftId="led2-l" rightId="led2-r" />
            <TwoPinPart type="buzzer" icon="buzzer" leftId="buz-l" rightId="buz-r" />
            <TwoPinPart type="push_button" icon="push_button" leftId="btn-l" rightId="btn-r" />
            <Wire id="wire1" />
        </div>
    );
}