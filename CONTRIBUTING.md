# Contributing

Welcome to the contributing guidelines for the Moondust Theme project. I appreciate your interest and hope you find this guide helpful.

## Contents

- [Preparation](#preparation)
- [Development](#development)
	- [Support a New Syntax](#support-a-new-syntax)
	- [Port the Theme to Another Editor](#port-the-theme-to-another-editor)

## Preparation

Before pursuing specific contribution goals, please ensure you have the necessary tools:

- [Node.js] version 22 or higher.
- [pnpm] version 9 or higher.

I use [mise], a polyglot tool version manager, and recommend it. If you already have experience with tools like asdf, nvm, or nodenv, you will find it very familiar.

> [!NOTE]
>
> This project can be run using older versions of Node.js, but not older than version 18. Also, if you do not want to install pnpm, you can try using npm. However, please note that these are not recommendations.

If you want to see the result of your actions during the contribution, you will also need [Visual Studio Code] to run the theme in debug mode. It is best to use the latest version, but it is not required.

Once you have everything installed, clone the Git repository:

```sh
git clone git@github.com:vanyauhalin/moondusttheme.git
```

... install the dependencies of the theme:

```sh
pnpm install
```

... fetch the grammars for the theme:

```sh
pnpm run pull
```

Now, we are ready to move on.

## Development

I would like to describe specific potential goals for contribution, but you are welcome to pursue other ideas; these are just suggestions.

### Support a New Syntax

Adding support for a new syntax must begin with defining which [TextMate grammars] the implementation will be based upon. Preference should be given to those [grammars that are distributed with] Visual Studio Code. If there are none, then use the extension that is either the most popular or the most relevant.

Once you have discovered the grammar, create a new configuration record with it in the [`lib/grammars.js`] file and populate the [`vendor`] directory with it using the following command:

```sh
pnpm run pull
```

For future testing purposes, you need to create a new configuration record in the [`lib/test.js`] file and create two or three files in the [`fixtures`] directory. The first fixture file `{id}` will contain the code that will be used for testing. The second `{id}.js` will contain the expected result of the test. Both files are required. The third `{id}-` is optional and may contain notes related to the tested grammar. Keep these files empty for now; we will fill them in later.

Additionally, you can help the editor recognize fixture files by adding the following lines to the [`.vscode/settings.json`] file:

```json
{
	"files.associations": {
		"**/fixtures/{id}": "{syntax}",
		"**/fixtures/{id}-": "{syntax}",
		"**/fixtures/{id}.js": "javascript"
	}
}
```

The last configuration record will be in the [`lib/syntaxes.js`] file. Although this will not describe tokens and their colors for now, we will return to this a bit later.

> [!NOTE]
>
> All these configuration records must have the same id. This is what connects them to each other.

The steps of the initial definition of the new syntax have been completed, and we can move on to the actual development:

- Open the [Command Palette] in Visual Studio Code.
- Select the "Workspaces: Duplicate As Workspace in New Window" action.
- Close the original window.
- Open the Command Palette in the new window.
- Select the "Debug: Select and Start Debugging" action.
- Select the "Run Extension" action.
- Navigation to the project directory in the new window.

This workaround will allow you to run the theme in debug mode and continue to work on it within the same project directory.

The next step is to define tokens and their colors for the new syntax:

- Fill the fixture file you created earlier and with various syntax constructs. You do not have to create code that feels real; make it as simple as possible.
- Mark up the syntax constructs with the expected colors in the corresponding file.
- Define the tokens and their colors in the record of the syntax in the `lib/syntaxes.js` file. You can use the Command Palette and the "Developer: Inspect Editor Tokens and Scopes" action to help you with this.

In the interval between these actions, you can run the command:

```sh
pnpm run build
```

... to see the result of the syntax highlighting in the editor, and the:

```sh
pnpm run test
```

... to check if the actual result matches the expected one.

The last and final step is to open a [pull request] and wait for a review. If you feel like you have not fully described all the possible tokens or are worried that you could not choose the right colors for some tokens, that is okay, I will help you complete the pull request. The main thing is to [send it].

### Port the Theme to Another Editor

Visual Studio Code is my main code editor, so this theme was primarily created for it. However, this does not mean that the theme should be available only for it. In the near future, I do not plan to port this theme to other editors as it has not yet reached a stable state. Nonetheless, this does not mean you cannot do so. From my side, I recommend adhering to the ideas embedded in this theme when porting it to other editors. I do not exclude the possibility that in the future, your implementation of the theme may receive "official" support from me. If you decide to make this contribution, please open an [issue] so I can be aware of it and continue to follow your progress. If you do not want to take on this responsibility but still want to see a port to your editor, please open an issue so I can find out.

<!-- Footnotes -->

[`.vscode/settings.json`]: ./.vscode/settings.json
[`fixtures`]: ./fixtures
[`lib/grammars.js`]: ./lib/grammars.js
[`lib/syntaxes.js`]: ./lib/syntaxes.js
[`lib/test.js`]: ./lib/test.js
[`vendor`]: ./vendor

[TextMate grammars]: https://macromates.com/manual/en/language_grammars/
[grammars that are distributed with]: https://github.com/microsoft/vscode/tree/main/extensions/
[Command Palette]: https://code.visualstudio.com/docs/getstarted/userinterface/#_command-palette
[pull request]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests/
[send it]: https://github.com/vanyauhalin/moondusttheme/pulls/
[issue]: https://github.com/vanyauhalin/moondusttheme/issues/

[mise]: https://mise.jdx.dev/
[Node.js]: https://nodejs.org/
[pnpm]: https://pnpm.io/
[Visual Studio Code]: https://code.visualstudio.com/
