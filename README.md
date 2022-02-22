## Description
The application code should be written in HTML and JavaScript.

Name/Value pairs are to be entered into the upper textbox. This textbox will be used by the end-user to quickly add Name/Value pairs to the list below.

When a Name/Value pair is about to be added to the list it must be validated to ensure proper syntax. If the syntax is incorrect then the Name/Value pair must not be added. The Name/Value pair entry format is shown below:
<name> = <value>

Where <name> is the name portion of the pair, and <value> is the value portion of the pair. Only valid Name/Value pairs can be added. Names and Values can contain only alpha-numeric characters. The equal-sign is used to delimit the pair, spaces before and/or after the equal-sign may be entered by the end user (and should be ignored.) 

When the ‘Sort by Name’ button is pressed the list will be sorted ascending by Name.
When the ‘Sort by Value’ button is pressed the list will be sorted ascending by Value.
When the ‘Delete’ button is pressed all selected items in the listbox will be deleted.
When the ‘Show as XML’ button is pressed, all of the items in the listbox must be put into XML format and displayed to the user in some way.

## To run a project on a local PC
1. Clone repository
2. Run the command "npm install"
3. Run the command "npm start"
