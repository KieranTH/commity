# Commity

Commity is a sleek and intuitive Visual Studio Code extension designed to streamline the process of creating [Conventional Commits](https://www.conventionalcommits.org/). With Commity, you can quickly craft commit messages that adhere to the Conventional Commits specification, ensuring consistency and clarity in your version control history.

## Features

- **Commit Type Selection**: Choose from predefined commit types such as `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, and `test`.
- **Scope Input**: Optionally specify a scope for your commit (e.g., `button`, `api`).
- **Description Prompt**: Provide a concise, imperative description for your commit.
- **Automatic Command Execution**: Automatically generate and execute the `git commit` command with your crafted message.

## Requirements

- Git must be installed and available in your system's PATH.
- Visual Studio Code version 1.99.0 or higher.

## Extension Settings

This extension does not currently add any custom settings. Future updates may include configurable options for commit types or templates.

## Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Search for and select `Commity: Create a Commit Message`.
3. Follow the prompts to:
   - Select a commit type.
   - Optionally specify a scope.
   - Provide a commit description.
4. The extension will automatically execute the `git commit` command with the generated message.

## Configuration

### `commity.useEmoji`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Enable or disable emojis in commit titles.

## Known Issues

- The extension assumes that a Git repository is already initialized in the workspace. If not, the commit command will fail.
- If no active terminal is available, the extension will create a new one.

## Release Notes

### 0.0.1

- Initial release with support for crafting Conventional Commit messages.

---

## Contributing

Contributions are welcome! If you encounter any issues or have feature suggestions, please open an issue or submit a pull request on the [GitHub repository](https://github.com/your-repo/commity).

## License

This extension is licensed under the [MIT License](LICENSE).

**Enjoy crafting your commits with Commity!**