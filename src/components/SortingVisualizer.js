import React, { Component } from "react";
import "../bars.css";
import { sleep } from "./delay";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
export default class SortingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arr: [],
			currentIndexJ: null,
			currentIndexJpp: null,
			sorted_array: false,
		};
	}
	// on reload
	componentDidMount() {
		this.resetArray();
	}

	resetArray = () => {
		// reset the array to random values
		const arr = [];
		for (let i = 0; i < 50; i++) {
			arr.push(getRandomIntFromInterval(10, 100));
		}
		this.setState({
			arr,
			currentIndexJ: null,
			currentIndexJpp: null,
			sorted_array: false,
		});
	};

	bubbleSort = async () => {
		let len = this.state.arr.length;
		let arr = this.state.arr;
		for (let i = 0; i < len; i++) {
			await sleep(50);
			for (let j = 0; j < len - i - 1; j++) {
				await sleep(25);
				this.setState({ currentIndexJ: j, currentIndexJpp: j + 1 });
				if (arr[j] > arr[j + 1]) {
					let temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;
				}
				this.setState({ arr });
			}
		}
		this.setState({ arr });
		this.setState({ sorted_array: true });
	};

	render() {
		// random height bars:
		const bars = this.state.arr.map((value, index) => {
			return (
				<div
					className={this.state.sorted_array ? "bar_sorted" : "bar"}
					id={
						this.state.currentIndexJ === index
							? "bar_active"
							: this.state.currentIndexJpp === index
							? "bar_active"
							: ""
					}
					key={index}
					style={{ height: `${value}px` }}></div>
			);
		});
		// buttons:
		const resetButton = (
			<Button onClick={this.resetArray} style={{ marginRight: "10px" }}>
				Reset
			</Button>
		);
		const bubbleSortButton = (
			<Button variant="warning" onClick={this.bubbleSort}>
				Bubble Sort
			</Button>
		);

		return (
			<>
				<div className="bar-container">{bars}</div>
				<div className="button-container">
					{resetButton}
					{bubbleSortButton}
				</div>
			</>
		);
	}
}
// generate randon values given min,max bounds
function getRandomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
