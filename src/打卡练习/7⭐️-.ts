/*
Implement a VueJS component that renders a dynamic and expandable side-menu-like list of items.
1.	The outermost tag of the component is a div with a class of menu-wrapper. Initially it will contain nothing, and your task is to create the code that will display the side-menu there.

2.	The component will receive a property named menuconfig which will contain the configuration of the side-menu data. This will be an array of objects containing title (string) and optional subitems (array of strings). An example menuconfig may appear as follows:
[
	{
		title: "Home",
	},
	{
		title: "Services", subItems: ["Cooking", "Cleaning"]
	}

]

3.	Every menu item should be displayed inside a separate corresponding div. This div should have a dynamically created attribute, data-testid, in the form: first-ievei-{iowercase-titie-name-here}. So, for example, if some item from menuConfig contained a title of Home, the div Should have a data-testid Containing first-level-home.

4.	Every div from the previous point should contain within it:
   * title. For example, for an item with the title Home, the text Home should appear in this div.
   * button With a dynamic data-testid in the form： button-{lowercase-title-name-here} (for example, button-home). The button should only be displayed when there are subItems for the given menu item (a non-empty subitems array). When clicking the button, the submenu (ui list described in the next point) should appear when the menu is hidden, and be removed when the menu is already expanded. The text inside the button should be Expand when the given menu is not expanded, and Hide if the menu has already been expanded.
   * ui list. The ui tag should have a data-testid in the form: ui-{iowercase-titie-here}f so if we had a list for the Home title, the data-testid should be ul-home.
		The ii tags inside the aforementioned ui tag. Each ii should have a data-testid in the form: ii-{iowercase-titie- name-here}-{lowercase-subitem-name-here}. So, for example, forthe Home title and the SdbltemS Main and Services, the ii data-testid should be li-home-main and li-home-services. Inside every ii tag there should be a subItem name (taken from the array subitems). The display state of these submenu lists is controlled by the aforementioned corresponding buttons.

5.	Only one submenu should be in the expanded state at any time. If one of the submenus is open and then some other menu item button is clicked, the previously expanded submenu should be hidden and the new one should appear.
6.	Tests will follow elements by their data-testid, so invisible elements should not be rendered. Do not control elements1 visibility using CSS properties.

Hints
•	Design/styling is not assessed and will not affect your score. You should focus only on implementing the requirements.
•	Initially, no subitems should be visible; in other words, no menu item should be expanded when it contains some subitems (no ui in the DOM).
•	Every title in menuConfig will be unique, so you do not have to worry about duplicate IDs in the code.
•	No title or potential subtitle can have an empty value.
•	Every title and subtitle contains only letters and consists of just one word.
Environment
•	vue 2.7.7
Example
Use the animation below as a reference for vour solution (take into account that the Home item does not have anv corresoonding subIterms)

*/
