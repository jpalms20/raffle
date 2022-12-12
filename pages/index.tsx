import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import styles from "../styles/Home.module.css";

// 13
const group1 = [
	"Richard Nochefranca",
	"Bruce Plummer",
	"Gerson Cortez",
	"Jonathan Garcia",
	"Ivan Valdez Pastrana",
	"Frederick Latimer",
	"Lorena Davis",
	"Lissette Rodriquez",
	"Lisa Martinez",
	"Desiree Cabrera",
	"Pedro Calvillo",
	"Juan Salceda",
	"Charity Thomas",
];

// 21
const group2 = [
	"Joe Lam",
	"Victor Treto",
	"Earl Horton",
	"Bryan Papp",
	"Sunny Simok",
	"Peter Salazar",
	"Tam Vo",
	"Derrick Jackson",
	"Ramiro Ruvalcaba",
	"Alberto Sanchez",
	"Eddy Acevedo",
	"William Nunez",
	"Edgar Hernandez",
	"Monica Brown",
	"Ralph Montiel",
	"Lourdes Alonso",
	"Dez Larkin",
	"Hamad Mansaray",
	"Mikeena Chavious",
	"Antowin Delph",
];

export default function Home() {
	const [group, setGroup] = useState("1");
	const [draw, setDraw] = useState(false);
	const [done, setDone] = useState(false);

	const users = group === "1" || group == "2" ? group1 : group2;

	let prize =
		"Apple Watch Series 8 GPS 45mm Midnight Aluminum Case with Midnight Sport Band - M/L";

	if (group === "1") {
		prize =
			'Original Peloton Bike | Indoor Stationary Exercise Bike with Immersive 22" HD Touchscreen';
	} else if (group === "2") {
		prize =
			"FITURE - Smart Workout Mirror Home Gym; Real-Time Popular Fitness Classes";
	}

	const handleChangeDraw = (e: any) => {
		setGroup(e.target.value);
		setDraw(false);
		setDone(false);
	};

	const handleOnDraw = (e: any) => {
		if (done) {
			setDraw(false);
			setDone(false);
		} else {
			setDraw(true);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="JPA Steps Raffle Drawing" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Script src="https://example.com/script.js" />

			<main className={styles.main}>
				<h1 className={styles.gradienttext}>JPA Steps Competition</h1>
				<h1 className={styles.gradienttext}>Raffle Drawing!</h1>

				<select
					id="drawSelect"
					onChange={handleChangeDraw}
					className={styles.select}
				>
					<option value="1">First Prize Drawing</option>
					<option value="2">Second Prize Drawing</option>
					<option value="3">Third Prize Drawing</option>
					<option value="4">Fourth Prize Drawing</option>
				</select>

				<p className={styles.prize}>{prize}</p>

				<button
					type="button"
					id="drawBtn"
					onClick={handleOnDraw}
					className={styles.button}
				>
					{done ? "RESET" : "DRAW"}
				</button>
				{draw && <DisplayWinner users={users} setDone={setDone} />}

				<div>
					<p className={styles.participates}>Participates</p>
					<DisplayUsers users={users} />
				</div>
			</main>
		</div>
	);
}

const DisplayUsers = ({ users }: any) => {
	var half_length = Math.ceil(users.length / 2);

	var leftSide = users.slice(0, half_length);
	var rightSide = users.slice(half_length);

	return (
		<div className={styles.flex}>
			<ul className={styles.rightPadding}>
				{leftSide.map((item: any) => (
					<li key={item}>{item}</li>
				))}
			</ul>
			<ul className={styles.list2}>
				{rightSide.map((item: any) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
};

const DisplayWinner = ({ users, setDone }: any) => {
	const [name, setName] = useState(users[0]);
	const [isRendering, setIsRendering] = useState(true);
	const { width, height } = useWindowSize();

	useEffect(() => {
		if (isRendering) {
			const interval = setInterval(() => {
				setName(users[Math.floor(Math.random() * users.length)]);
			}, 60);

			const timeout = setTimeout(() => {
				setIsRendering(!isRendering);
				setDone(true);
			}, 3000);

			return () => {
				clearInterval(interval);
				clearTimeout(timeout);
			};
		}
	}, [isRendering, users, setDone]);

	return (
		<div>
			<Confetti
				style={!isRendering ? { display: "block" } : { display: "none" }}
				width={width}
				height={height}
			/>
			<h1 className="names">{isRendering ? name : name}</h1>
		</div>
	);
};
