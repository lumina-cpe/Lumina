import { useRef, useState, useEffect } from "react";
import "../../styles/Round_Island02BreadboardRound.css";

export default function Island02BreadboardRound()
{
	const boardRef = useRef(null);
	const nodesRef = useRef({});
	const connectionsRef = useRef({});
	const [renderTick, setRenderTick] = useState(0);

	function registerNode(id, element)
	{
		if (element) nodesRef.current[id] = element;
	}

	function getCenter(rect)
	{
		return {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		};
	}

	function checkSnaps()
	{
		const ids = Object.keys(nodesRef.current);

		for (let i = 0; i < ids.length; i++)
		{
			for (let j = 0; j < ids.length; j++)
			{
				if (i === j) continue;

				const aEl = nodesRef.current[ids[i]];
				const bEl = nodesRef.current[ids[j]];

				const a = getCenter(aEl.getBoundingClientRect());
				const b = getCenter(bEl.getBoundingClientRect());

				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 14)
				{
					connectionsRef.current[ids[i]] = ids[j];
					aEl.style.background = "#4caf50";
					bEl.style.background = "#4caf50";
				}

				if (dist > 20 && connectionsRef.current[ids[i]] === ids[j])
				{
					delete connectionsRef.current[ids[i]];
					aEl.style.background = "#bbb";
					bEl.style.background = "#bbb";
				}
			}
		}

		setRenderTick(prev => prev + 1);
	}

	function Draggable({ children, position, setPosition })
	{
		function onMouseDown(e)
		{
			const startX = e.clientX;
			const startY = e.clientY;

			function onMove(ev)
			{
				setPosition(prev =>
				({
					x: prev.x + (ev.clientX - startX),
					y: prev.y + (ev.clientY - startY)
				}));
				checkSnaps();
			}

			function onUp()
			{
				window.removeEventListener("mousemove", onMove);
				window.removeEventListener("mouseup", onUp);
			}

			window.addEventListener("mousemove", onMove);
			window.addEventListener("mouseup", onUp);
		}

		return (
			<div
				onMouseDown={onMouseDown}
				style={{ left: position.x, top: position.y }}
				className="round-draggable"
			>
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

		for (let r = 0; r < 25; r++)
		{
			for (let c = 0; c < 10; c++)
			{
				holes.push({ id: `hole-${r}-${c}`, x: c * 18, y: r * 18 });
			}
		}

		return (
			<div className="round-breadboard">
				{
					holes.map(h =>
						<Node key={h.id} id={h.id} x={h.x} y={h.y} />
					)
				}
			</div>
		);
	}

	function Resistor()
	{
		const [pos, setPos] = useState({ x: 400, y: 120 });

		return (
			<Draggable position={pos} setPosition={setPos}>
				<img src="/assets/icons/resistor.png" className="round-icon" />
				<Node id="res-left" x={0} y={14} />
				<Node id="res-right" x={60} y={14} />
			</Draggable>
		);
	}

	function Wire({ id })
	{
		const [pos, setPos] = useState({ x: 500, y: 300 });
		const endIdA = `${id}-a`;
		const endIdB = `${id}-b`;

		return (
			<>
				<Draggable position={pos} setPosition={setPos}>
					<div className="round-wire">
						<Node id={endIdA} x={0} y={0} />
						<Node id={endIdB} x={80} y={0} />
					</div>
				</Draggable>
				<WireLine a={endIdA} b={endIdB} />
			</>
		);
	}

	function WireLine({ a, b })
	{
		const [line, setLine] = useState({});

		useEffect(() =>
		{
			function update()
			{
				const aEl = nodesRef.current[a];
				const bEl = nodesRef.current[b];
				if (!aEl || !bEl) return;

				const aPos = getCenter(aEl.getBoundingClientRect());
				const bPos = getCenter(bEl.getBoundingClientRect());

				setLine({ x1: aPos.x, y1: aPos.y, x2: bPos.x, y2: bPos.y });
			}

			const interval = setInterval(update, 30);
			return () => clearInterval(interval);
		}, [renderTick]);

		return (
			<svg className="round-wire_svg">
				<line {...line} stroke="black" strokeWidth="3" />
			</svg>
		);
	}

	return (
		<div className="round-island02breadboard_round" ref={boardRef}>
			<Breadboard />
			<Resistor />
			<Wire id="wire1" />
		</div>
	);
}