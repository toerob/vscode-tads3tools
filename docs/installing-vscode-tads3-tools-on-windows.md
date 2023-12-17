# Using VSCode-Tads3tools on Windows 10 and up

1. Download the [TADS 3 Author's Kit](http://www.tads.org/tads3.htm#) from the official website. If needed, select the folder where you want to install it.

2. Install vscode-tads3tools from VSCode's Marketplace. It's set up for Mac users, so you'll need to do some tweaking to make it work on Windows.

3. Add the Program Files folder for TADS 3 into your Path environment variables

	a. Type "Edit the System Environment Variables" into the Start menu search.
	
	b. The System Properties window should pop up and you'll see a button at the bottom that says "Environment Variables". Click it.
	
	c. Scroll down the User variables list until you find the "Path" variable. Click Edit.
	
	d. At the end of the list, click Edit and add the folder where you installed the TADS 3 workbench into the Path. Mine looks like this: `C:\Program Files (x86)\TADS 3\`.
	
	e. Click OK > OK > OK to exit out of all the windows and save your work.

4. Go to VSCode's Extensions tab and click the vscode-tads3tools Extension. Click the little gear icon to go to the extension's settings.

Make sure these are the same for both the User and Workspace!

#### Tads2 > Compiler: Path
`t3make`

#### Tads3 > Adv3: Library
`[folder where you installed the TADS 3 workbench]\lib\adv3`

#### Tads3 > Adv3 Lite: Library
***Note**: You need to install Adv3Lite first if you want to use it! [Download here](https://github.com/EricEve/adv3lite/releases/latest) and put it in the folder where you installed the TADS 3 workbench within the `\lib` folder.*

`[folder where you installed the TADS 3 workbench]\lib\adv3Lite`

#### Tads3: Game Runner Interpreter
Fill this out if you want to have the game run in your terminal.

`t3run.exe -plain`

#### Tads3: Include
`[folder where you installed the TADS 3 workbench]\include`

#### Tads3: Lib
`[folder where you installed the TADS 3 workbench]\lib`


5. Go to the search bar at the top of VSCode and type `> Edits: Tads3 command: Create a new Tads3 template project`

6. Select your project folder (needs to be empty!) and then decide whether you want to use Adv3 or Adv3Lite from the dropdown.

8. The library files (depending on if you chose Adv3 or Adv3Lite) will be generated in `/obj` within the folder, and you'll also see `gameMain.t`, `GameInfo.txt` and `Makefile.t3m`. **_Save_ the `gameMain.t` file right away**, even if you haven't edited it yet! Otherwise you'll get an error saying it doesn't exist.

9. Type `t3make` into the terminal. It will compile the library and `gameMain.t` files into playable TADS 3 games! The file should automatically compile and run in the terminal. Every time you save, it will recompile.

**Note:** The default behavior is to restart the game whenever the code is recompiled. You can turn this off in the settings:
#### Tads3: Restart Game Runner On T3 Image Changes
Uncheck the box.
