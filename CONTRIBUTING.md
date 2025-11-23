# Contributing

Welcome to the contributing guidelines for the Moondust Theme project.

## Contents

- [Preparation](#preparation)
- [Development](#development)
  - [Support a New Syntax](#support-a-new-syntax)
  - [Port the Theme to Another Editor](#port-the-theme-to-another-editor)

## Preparation

Before starting your contribution, please ensure you have the necessary tools:

- [Node.js] version 22 or higher;
- [pnpm] version 9 or higher.

To install these tools, [mise] is the recommended polyglot tool version manager.
If you have experience with managers like asdf, nvm, or nodenv, you will find
mise very similar to use.

To preview your changes during development, you will also need [Visual Studio
Code] to run the theme in debug mode. The latest version is recommended, but not
required.

Once you have everything installed, clone the repository:

```sh
git clone git@github.com:vanyauhalin/moondusttheme.git
```

... and install the dependencies:

```sh
pnpm install
```

## Development

Here are some specific contribution goals, but you are welcome to pursue other
ideas — these are just suggestions.

### Support a New Syntax

Supporting a new syntax involves configuring the grammar, defining colors,
testing, and submitting changes.

#### Configure Grammar

Adding support for a new syntax begins with identifying which [TextMate
grammars] the implementation will be based on. Prefer [grammars that are
distributed with] Visual Studio Code. If none are available, use the most
popular or most relevant extension.

After identifying the grammar, create a new subdirectory in the [`langs/`]
directory. Use the file extension without the dot as the subdirectory name when
possible (e.g., `css` for CSS, `js` for JavaScript, etc.).

Inside the new directory, create a `config.yaml` file with the JSON schema
reference and the `grammar` property:

```yaml
# yaml-language-server: $schema=../../lang-config.json

grammar:
  project: https://github.com/microsoft/vscode
  version: 1.97.2
  files:
  - extensions/css/syntaxes/css.tmLanguage.json
```

Pull the grammar files using:

```sh
node cli.js pull <lang>
```

#### Configure Colors

After configuring the grammar, add a file association entry in
[`.vscode/settings.json`]:

```json
{
	"files.associations": {
		"**/langs/<lang>/sample*": "<language identifier>"
	}
}
```

Define the `syntax.colors` property in the `config.yaml` file:

```yaml
syntax:
  colors:
    source.css: p1
```

List the available scope names:

```sh
node cli.js scopes <lang>
```

Create a `sample` file in the language directory with various language
constructs.

#### Test Colors

Open VS Code and follow these steps:

1. Open the [Command Palette];
2. Select "Workspaces: Duplicate As Workspace in New Window";
3. Close the original window;
4. In the new window, open the Command Palette;
5. Select "Debug: Select and Start Debugging";
6. Choose "Run Extension";
7. Navigate to the project directory.

This workaround lets you run the theme in debug mode while working on it.

Use "Developer: Inspect Editor Tokens and Scopes" from the Command Palette to
help identify scope names while defining colors.

Between making changes, run the following command to apply them:

```sh
node cli.js build
```

Run the following command to verify actual results match expectations:

```sh
node cli.js test <lang>
```

#### Submit Changes

The final step is to open a pull request. Do not worry if you have not covered
all tokens or chosen perfect colors — I will help you complete it. The important
thing is to [submit it].

### Port the Theme to Another Editor

While VS Code is the primary editor for this theme, ports to other editors are
welcome. I do not currently plan to port it to other editors as it has not
reached a stable state, but contributions are welcome.

When porting, please adhere to the core ideas and design principles of this
theme. Your implementation may receive "official" support in the future.

If you decide to create a port, please open an [issue] so I can track your
progress. If you would like to see a port for your editor but do not want to
maintain it yourself, please open an issue to express interest.

<!-- Definitions -->

[Command Palette]: https://code.visualstudio.com/docs/getstarted/userinterface/#_command-palette
[grammars that are distributed with]: https://github.com/microsoft/vscode/tree/main/extensions/
[issue]: https://github.com/vanyauhalin/moondusttheme/issues/
[submit it]: https://github.com/vanyauhalin/moondusttheme/pulls/
[TextMate grammars]: https://macromates.com/manual/en/language_grammars/

[mise]: https://mise.jdx.dev/
[Node.js]: https://nodejs.org/
[pnpm]: https://pnpm.io/
[Visual Studio Code]: https://code.visualstudio.com/

[`.vscode/settings.json`]: ./.vscode/settings.json
[`langs/`]: ./langs/
