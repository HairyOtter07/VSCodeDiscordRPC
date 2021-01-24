// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as rpc from 'discord-rpc';
import { time } from 'console';

const clientID = "802630166562996255";
const client = new rpc.Client({transport: "ipc"});

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscordrpc" is now active!');

	let disposable2 = vscode.commands.registerCommand('vscordrpc.runRPC', () => {
		vscode.window.showInformationMessage('Running RPC...');

		let timestamp = new Date();

		let extensions = {
			"js": ["nodejs", "Node.JS"],
			"py": ["py", "Python"],
			"java": ["java", "Java"],
		}

		vscode.window.onDidChangeActiveTextEditor(() => {
			let currentFile = vscode.window.activeTextEditor?.document.fileName.split("\\");
			let fileName = currentFile ? currentFile[currentFile?.length - 1]: "";
			let extension = fileName.split(".")[fileName.split(".").length - 1];
			let realEx: string[];
			switch (extension) {
				case "js":
					realEx = extensions.js;
					break;
				case "py":
					realEx = extensions.py;
					break;
				case "java":
					realEx = extensions.java;
					break;
				default:
					realEx =  ["", extension.toUpperCase()]
			}
			client.setActivity({
				details: "Editing " + fileName,
				state: realEx[1],
				startTimestamp: timestamp,
				largeImageKey: "vscode",
				largeImageText: "VSCode",
				smallImageKey: realEx[0] != "" ? realEx[0] : "vscode",
				smallImageText: realEx[1]
			  });
		});

		client.on("ready", () => {
			timestamp = new Date();
			client.setActivity({
				details: "Started Editing",
				state: "VSCode",
				startTimestamp: timestamp,
				largeImageKey: "vscode",
				largeImageText: "VSCode",
				smallImageKey: "vscode",
				smallImageText: "VSCode"
			  });
		});
		client.login({clientId: clientID});
	})

	vscode.commands.executeCommand("vscordrpc.runRPC");
}

// this method is called when your extension is deactivated
export function deactivate() {}
