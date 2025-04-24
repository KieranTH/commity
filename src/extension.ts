// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		"commity.commit",
		async () => {
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
			const commitMessage = `${typePick.label}${scopePart}: ${description}`;

			const terminal =
				vscode.window.activeTerminal || vscode.window.createTerminal();
			terminal.show();
			terminal.sendText(`git commit -m "${commitMessage}"`);
		},
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log("Logg");
}
