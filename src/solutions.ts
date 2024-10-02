import { md5 } from "js-md5";

interface Solutions {
	[year: string]: {
		[day: string]: { run: (input: string | string[]) => string[]; transformInput: (input: string | string[]) => string | string[] };
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
		},
	},
};
