// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec } from "child_process";

const commitTypeToEmoji: Record<string, string> = {
	feat: "✨",
	fix: "🐛",
	docs: "📚",
	style: "🎨",
	refactor: "♻️",
	test: "✅",
	chore: "🔧",
} as const;

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		"commity.commit",
		async () => {
			const config = vscode.workspace.getConfiguration("commity");

			const autoStage = config.get<boolean>("autoStage", true);

			if (autoStage) {
				await runGitAdd();
			}

			const useEmoji = config.get<boolean>("useEmoji", true);
			const types = [
				{ label: "feat", description: "A new feature" },
				{ label: "fix", description: "A bug fix" },
				{
					label: "chore",
					description: "Build process or auxiliary tool changes",
				},
				{ label: "docs", description: "Documentation only changes" },
				{ label: "style", description: "Code style change (formatting, etc)" },
				{
					label: "refactor",
					description:
						"Code change that neither fixes a bug nor adds a feature",
				},
				{ label: "test", description: "Adding or fixing tests" },
			];
			if (useEmoji) {
				for (const type of types) {
					type.label = `${commitTypeToEmoji[type.label]} ${type.label}`;
				}
			}

			const typePick = await vscode.window.showQuickPick(types, {
				placeHolder: "Select a commit type",
			});
			if (!typePick) return;

			const scope = await vscode.window.showInputBox({
				prompt: "Optional scope (e.g. button, api)",
				placeHolder: "Leave empty for none",
			});

			const description = await vscode.window.showInputBox({
				prompt: "Commit description (imperative, lower case)",
			});
			if (!description) return;

			const scopePart = scope ? `(${scope})` : "";
			const message = `${typePick.label}${scopePart}: ${description}`;

			const terminal =
				vscode.window.activeTerminal || vscode.window.createTerminal();
			terminal.show();
			terminal.sendText(`git commit -m "${message}"`);
		},
	);

	context.subscriptions.push(disposable);
}

async function runGitAdd(): Promise<void> {
	return new Promise((resolve, reject) => {
		exec("git add .", (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage(`Error staging changes: ${stderr}`);
				reject(error);
			} else {
				vscode.window.showInformationMessage(
					"All changes staged successfully.",
				);
				resolve();
			}
		});
	});
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log("Logg");
}
