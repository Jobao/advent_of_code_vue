import { md5 } from "js-md5";
import Ui_2015_01 from "./components/2015/ui_2015_01.vue";
import type { Component } from "vue";
import Ui_2015_02 from "./components/2015/ui_2015_02.vue";
import Ui_2015_03 from "./components/2015/ui_2015_03.vue";
import Ui_2015_04 from "./components/2015/ui_2015_04.vue";
import Ui_2015_05 from "./components/2015/ui_2015_05.vue";
import Ui_2015_06 from "./components/2015/ui_2015_06.vue";
import Ui_2015_07 from "./components/2015/ui_2015_07.vue";

export interface Solutions {
	[year: string]: {
		[day: string]: { run: (input: string | string[]) => string[]; transformInput: (input: string | string[]) => string | string[]; title: string; description: string; urlToAOC: string; uiComponent: Component };
	};
}

export const solutions: Solutions = {
	"2015": {
		"1": {
			run: (input: string | string[]) => {
				let result: string[] = [];
				let currentFloor = 0;
				let currentPosition = 1;
				let part2Indentified = false;
				for (const c of input) {
					if (c === "(") {
						currentFloor++;
					} else if (c === ")") {
						currentFloor--;
						if (!part2Indentified) {
							if (currentFloor < 0) {
								result.push("Part 2: " + currentPosition.toString());
								part2Indentified = true;
							}
						}
					}
					currentPosition++;
				}
				result.push("Part 1: " + currentFloor.toString());

				return result;
			},
			transformInput: (input: string | string[]) => {
				return input as string;
			},
			title: "Not Quite Lisp",
			description: "Santa is trying to deliver presents in a large apartment building, but he can't find the right floor - the directions he got are a little confusing. He starts on the ground floor (floor 0) and then follows the instructions one character at a time.",
			urlToAOC: "https://adventofcode.com/2015/day/1",
			uiComponent: Ui_2015_01,
		},
		"2": {
			run: (input: string | string[]) => {
				let result: string[] = [];

				const splitter = "x";
				let totalPaper = 0;
				let totalRibbon = 0;
				for (const line of input) {
					const [l, w, h] = line.split(splitter).map(Number);
					let sorted = [l, w, h].sort();

					let currentPaper = 2 * l * w + 2 * w * h + 2 * h * l + Math.min(l * w, w * h, h * l);
					let currentRibbon = 2 * Math.min(l + w, w + h, h + l) + l * w * h;
					totalPaper += currentPaper;
					totalRibbon += currentRibbon;
				}
				result.push("Part 1: " + totalPaper.toString());
				result.push("Part 2: " + totalRibbon.toString());
				return result;
			},
			transformInput: (input: string | string[]) => {
				return (input as string).split("\n");
			},
			title: "I Was Told There Would Be No Math",
			description: "The elves are running low on wrapping paper, and so they need to submit an order for more.",
			urlToAOC: "https://adventofcode.com/2015/day/2",
			uiComponent: Ui_2015_02,
		},
		"3": {
			run: (input: string | string[]) => {
				let result: string[] = [];
				let santa: Map<string, number> = new Map();
				let robot: Map<string, number> = new Map();
				let currentXSanta = 0;
				let currentYSanta = 0;
				santa.set(currentXSanta + "," + currentYSanta, 1);
				robot.set(currentXSanta + "," + currentYSanta, 1);
				for (const c of input) {
					if (c === "^") {
						currentYSanta++;
					} else if (c === "v") {
						currentYSanta--;
					} else if (c === ">") {
						currentXSanta++;
					} else if (c === "<") {
						currentXSanta--;
					}
					const houseValue = santa.get(currentXSanta + "," + currentYSanta);
					if (houseValue) {
						santa.set(currentXSanta + "," + currentYSanta, houseValue + 1);
					} else {
						santa.set(currentXSanta + "," + currentYSanta, 1);
					}
				}
				result.push("Part 1: " + santa.size.toString());

				santa = new Map();
				currentXSanta = 0;
				currentYSanta = 0;
				let currentXRobot = 0;
				let currentYRobot = 0;
				santa.set(currentXSanta + "," + currentYSanta, 1);
				robot.set(currentXRobot + "," + currentYRobot, 1);
				let santaTurn = true;
				let uniqueHouses = 1;

				for (const c of input) {
					if (c === "^") {
						santaTurn ? currentYSanta++ : currentYRobot++;
						//currentYSanta++;
					} else if (c === "v") {
						santaTurn ? currentYSanta-- : currentYRobot--;
						//currentYSanta--;
					} else if (c === ">") {
						santaTurn ? currentXSanta++ : currentXRobot++;
						//currentXSanta++;
					} else if (c === "<") {
						santaTurn ? currentXSanta-- : currentXRobot--;
						//currentXSanta--;
					}
					if (santaTurn) {
						const houseValue = santa.get(currentXSanta + "," + currentYSanta);
						if (houseValue) {
							santa.set(currentXSanta + "," + currentYSanta, houseValue + 1);
						} else {
							santa.set(currentXSanta + "," + currentYSanta, 1);
							if (!robot.get(currentXSanta + "," + currentYSanta)) {
								uniqueHouses++;
							}
						}
					} else {
						const houseValue = robot.get(currentXRobot + "," + currentYRobot);
						if (houseValue) {
							robot.set(currentXRobot + "," + currentYRobot, houseValue + 1);
						} else {
							robot.set(currentXRobot + "," + currentYRobot, 1);
							if (!santa.get(currentXRobot + "," + currentYRobot)) {
								uniqueHouses++;
							}
						}
					}

					santaTurn = !santaTurn;
				}

				result.push("Part 2: " + uniqueHouses.toString());
				return result;
			},
			transformInput(input: string | string[]) {
				return input as string;
			},
			title: "Perfectly Spherical Houses in a Vacuum",
			description: "Santa is delivering presents to an infinite two-dimensional grid of houses.",
			urlToAOC: "https://adventofcode.com/2015/day/3",
			uiComponent: Ui_2015_03,
		},
		"4": {
			run: (input: string | string[]) => {
				let result: string[] = [];
				let hashed = "";
				let leadingZerosPT1 = 5;
				let leadingZerosPT2 = 6;
				let currentNonce = 0;
				let part1Found = false;
				let part2Found = false;
				hashed = md5(input + currentNonce.toString());
				while (part1Found === false || part2Found === false) {
					currentNonce++;
					hashed = md5(input + currentNonce.toString());
					if (!part1Found) {
						if (hashed.substring(0, leadingZerosPT1) === "00000") {
							result.push("Part 1: " + currentNonce.toString());
							part1Found = true;
						}
					}
					if (!part2Found) {
						if (hashed.substring(0, leadingZerosPT2) === "000000") {
							result.push("Part 2: " + currentNonce.toString());
							part2Found = true;
						}
					}
				}
				return result;
			},
			transformInput: (input: string | string[]) => {
				return input as string;
			},
			title: "The Ideal Stocking Stuffer",
			description: "Santa needs help mining some AdventCoins (very similar to bitcoins) to use as gifts for all the economically forward-thinking little girls and boys.",
			urlToAOC: "https://adventofcode.com/2015/day/4",
			uiComponent: Ui_2015_04,
		},
		"5": {
			run: (input: string | string[]) => {
				let result: string[] = [];
				let nicePart1 = 0;
				let nicePart2 = 0;
				const vowels = ["a", "e", "i", "o", "u"];
				const forbiddenStrings = ["ab", "cd", "pq", "xy"];
				const requiredVowelsForNice = 3;
				const part1 = (line: string) => {
					let forbidden = line.includes(forbiddenStrings[0]) || line.includes(forbiddenStrings[1]) || line.includes(forbiddenStrings[2]) || line.includes(forbiddenStrings[3]);
					if (forbidden) {
						return;
					}
					let vowelsCount = 0;
					for (const c of line) {
						if (vowels.includes(c)) {
							vowelsCount++;
						}
					}
					if (vowelsCount < requiredVowelsForNice) {
						return;
					}
					let repeat = false;
					for (let index = 0; index < line.length; index++) {
						const c = line[index];
						if (index + 1 !== line.length) {
							if (c === line[index + 1]) {
								repeat = true;
							}
						}
					}
					if (!repeat) {
						return;
					}
					nicePart1++;
				};
				const part2 = (line: string) => {
					nicePart2 += line.split("\n").filter((line) => {
						const appearsTwice = Array.from({ length: line.length - 1 }).some((_, i) => line.indexOf(line.slice(i, i + 2), i + 2) >= 0);
						const repeats = Array.from({ length: line.length - 2 }).some((_, i) => line[i] === line[i + 2]);
						return appearsTwice && repeats;
					}).length;
				};
				let tot = 0;
				for (const line of input) {
					part1(line);
					part2(line);
				}
				result.push("Part 1: " + nicePart1.toString());
				result.push("Part 2: " + nicePart2.toString());
				return result;
			},
			transformInput: (input: string | string[]) => {
				return (input as string).split("\n");
			},
			title: "Doesn't He Have Intern-Elves For This?",
			description: "Santa needs help figuring out which strings in his text file are naughty or nice.",
			urlToAOC: "https://adventofcode.com/2015/day/5",
			uiComponent: Ui_2015_05,
		},
		"6": {
			run: (input: string | string[]) => {
				let brightness = 0;
				let result: string[] = [];
				const turnOn = (x: number, y: number) => {
					light[x][y].state = true;
					light[x][y].brightness++;
				};
				const turnOff = (x: number, y: number) => {
					light[x][y].state = false;
					light[x][y].brightness--;
					if (light[x][y].brightness < 0) {
						light[x][y].brightness = 0;
					}
				};
				const toggle = (x: number, y: number) => {
					light[x][y].state = !light[x][y].state;
					light[x][y].brightness += 2;
				};
				let light = Array.from(Array(1000), () => Array.from(Array(1000), () => ({ state: false, brightness: 0 })));
				for (const line of input) {
					const words = line.split(" ");
					if (words[0] === "turn") {
						const [from_x, from_y] = words[2].split(",").map(Number);
						const [to_x, to_y] = words[4].split(",").map(Number);
						if (words[1] === "on") {
							for (let x = from_x; x <= to_x; x++) {
								for (let y = from_y; y <= to_y; y++) {
									turnOn(x, y);
								}
							}
						} else {
							for (let x = from_x; x <= to_x; x++) {
								for (let y = from_y; y <= to_y; y++) {
									turnOff(x, y);
								}
							}
						}
					} else {
						const [from_x, from_y] = words[1].split(",").map(Number);
						const [to_x, to_y] = words[3].split(",").map(Number);
						for (let x = from_x; x <= to_x; x++) {
							for (let y = from_y; y <= to_y; y++) {
								toggle(x, y);
							}
						}
					}
				}

				let part1 = 0;
				for (let x = 0; x < 1000; x++) {
					for (let y = 0; y < 1000; y++) {
						if (light[x][y].state) {
							part1++;
						}
						brightness += light[x][y].brightness;
					}
				}
				result.push("Part 1: " + part1.toString());
				result.push("Part 2: " + brightness.toString());
				return result;
			},
			transformInput: (input: string | string[]) => {
				return (input as string).split("\n");
			},
			title: "Probably a Fire Hazard",
			description: "Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.",
			urlToAOC: "https://adventofcode.com/2015/day/6",
			uiComponent: Ui_2015_06,
		},
		"7": {
			run: (input: string | string[]) => {
				let result: string[] = [];
				return result;
			},
			transformInput: (input: string | string[]) => {
				return (input as string).split("\n");
			},
			title: "Some Assembly Required",
			description: "This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates! Unfortunately, little Bobby is a little under the recommended age range, and he needs help assembling the circuit.",
			urlToAOC: "https://adventofcode.com/2015/day/7",
			uiComponent: Ui_2015_07,
		},
	},
};
