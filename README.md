# Directions App

This is the Walnut Hills Programming Club directions app. To see the current version, go to <https://walnut.direct/>.

## Reporting issues

If you find a problem with the generated directions (including missing rooms and unclear directions) or with the site itself, or you have a suggestion, you can create an issue by clicking on the [Issues](https://github.com/WalnutProgramming/Directions/issues) tab at the top of this page.

You can also look at the Issues page to see some of our known problems and to-dos. Feel free to ask how you can help if there's an issue you want to help with.

## How to view and work on the app on your own computer

### Stuff to install

1. **GitHub Desktop:** At the [top of this page](https://github.com/WalnutProgramming/Directions), click the green **Clone or download** button, and then click **Open in Desktop**. If you don't have GitHub Desktop installed, it should redirect you to the [install page](https://desktop.github.com/), and you can click the **Download** button.
   - After you install GitHub Desktop, click on the **Clone or download** button at the top of this page again to clone it if you haven't already.
   - (I recommend using GitHub Desktop since it's easy to use, but it's not required if you know how to use git.)
1. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/)
   - (This is required to be able to run our app on your computer.)
1. Install [Visual Studio Code](https://code.visualstudio.com/) (VSCode)

   - (This is my favorite text editor, but it's not required if you prefer something else.)

### Running the app

1. If it's not already open, open the project in GitHub Desktop. Click on the **Repository** menu, then click **Open in terminal** to open up a terminal window.
1. Type `yarn` into the terminal window, and press enter. It will install a bunch of extra things that are required to run the app.
1. To actually run the app, use the command `yarn serve`.

### Editing the app

Open the "Directions" folder in Visual Studio Code.

### Summary of important files and folders

1. Generating the directions

   - [src/walnut.ts](src/walnut.ts) is where we describe our school. This is where we list all of the rooms and hallways that are in our app and how they're connected together.
   - The general code that could apply to any building (not just our school) is in a separate package called [room-finder](https://github.com/WalnutProgramming/room-finder).

2. The website itself
   - The ([src/views](src/views)) folder is where we define each of the pages in the site. For example, the main page is in [src/views/IndexPage.vue](src/views/IndexPage.vue), and the page where we give the directions is [src/views/DirectionsPage.vue](src/views/DirectionsPage.vue).
   - [src/components/](src/components/) is for **components** like buttons. Many of these are things that we use across multiple pages. Each component is a file in that folder.

### Making changes

When you have a change you want to make, you can follow the directions [here](https://github.com/WalnutProgramming/making-a-pull-request) to request that your changes be brought into the main version of our program.

### What are all of these tools we're using? What are these `.vue` and `.ts` files?

#### Vue

[Vue](https://vuejs.org/) is a JavaScript framework that makes it easier for us to make user interfaces. One of its features is that it allows us to use `.vue` files, which include HTML, JavaScript (or TypeScript), and CSS all in one file so that we can keep related things together.

#### TypeScript (`.ts` files)

[TypeScript](https://www.typescriptlang.org/) is a programming language that's exactly like JavaScript, except it allows us to specify **static types** in our program. Types make it easier for us not to make mistakes in our programs.

For example, in JavaScript, we would just write

```js
const myVariable = 3;
```

to define a variable called `myVariable`, but in TypeScript, we can (optionally) write that `myVariable` is a `number` like this:

```ts
const myVariable: number = 3;
```

This makes it easier not to make mistakes. If you ignore these type annotations (which is completely fine), TypeScript is just like regular JavaScript. And you don't have to write the type annotations if you don't want to.

## Editing this page

If you want to make this page clearer, you can either follow the instructions above, or you can just edit it directly here on GitHub by editing [README.md](README.md), which will create a Pull Request.
