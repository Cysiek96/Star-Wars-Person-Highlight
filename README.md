### Table Of content
1. [Project Introduction](#star-Wars-Person-Highlight)
1. [Sepecial Principles](#Special-Principles)
1. [Instalation](#instalation)
1. [Guide](#Guide) 
1. [Person Panel Explanation](#Person-Panel)
1. [Other Elements Explanation](#Other-Elements)
1. [Solved Problems](#solved-problems) 
1. [Roadmap](#Roadmap)
1. [Sources](#Sources)
1. [Change Log](#Changes)


# [Star Wars Person Highlight](#Table-of-content)
[<img alt="Static Badge" src="https://img.shields.io/badge/SWAPI%20app-%23fca311">](https://swapi.dev/)
[<img alt="Static Badge" src="https://img.shields.io/badge/Star-Wars-blue">](https://en.wikipedia.org/wiki/Star_Wars)
[<img alt="Static Badge" src="https://img.shields.io/badge/Vite-0eb7eb">](https://vitejs.dev/)
[<img alt="Static Badge" src="https://img.shields.io/badge/Axios-6a15d1">](https://www.npmjs.com/package/axios)

This application is more advanced than the previous one, which can be found [here](#TUTAJ-MÓJ-GITHUB-do-poprzednije-wersji). It is also worth mentioning that this application is developed under special, more advanced rules, which you can read more about in this [section](#Special-Principles). <br>
The project has a legitimate name, which is also listed in the site title. I have also changed quite a bit in the GUI, which I hope is clearer, containing more information that is related to that particular person from the Star Wars universe.  The graphics have been radically changed, including a person view, a planet view, and a new view of the machines, which are represented by spheres on the person card, has been added. I hope this view will be more user-friendly. I've also added some improvements, such as local storage services, a search bar where we can search for a specific person, a return button to the main menu, and error message display.  It's worth mentioning that all this data is generated dynamically - the data is retrieved using the [SWAPI application]((https://swapi.dev/)).

## [Special Principles](#Table-of-content)

This project was created based on special principles:
 - Display the data received from the [SWAPI application](https://swapi.dev/).
 - Project  need to be create with use modules:
    - [Vite](https://vitejs.dev/)
    - [Axios](https://www.npmjs.com/package/axios)
 - Create function which support error handling.
 - Use localstorage to display data from previous usage.

## [Instalation](#Table-of-content)
We need to copy and put all the code with subfolders into one folder where npm packages such as: axios and vite are installed. 
The easiest way to install these packages is to go to the folder directory where you want to have this Star Wars character highlighting application, and then run this command:
```
npm install axios vite
```
Then just put the downloaded files (just swap the files) and run this application - where the packages are installed.
## [Guide](#Table-of-content)

Right before some data will appear we have some inner screen which is represented by blury loading screen. Immediately after that, we will be able to see 2 cards, which are dynamically downloaded data from the SWAPI application and entered directly into the created card object.

![image](https://github.com/Cysiek96/Z2J/assets/113532109/43dd51cd-1903-4f55-8092-d4106cc5b7d0)

In addition, here we have several navigation tools, which are represented by these elements:
* Search bar - used to search for a specific item from the Star Wars universe.
* Return to the main view, will help us redirect to the first two items from the Swapi database;
* Prev and next buttons, which will allow us to generate the next 2 people.

![image](https://github.com/Cysiek96/Z2J/assets/113532109/9824444a-c7f3-4be4-afff-444e9d8d46f3)


The appearance of the cards is the same for each generated data. The only difference is the number of vehicles that are inserted compared to their number in the Swapi database.
### [Person Panel](#Table-of-content)

This view is a new layout, completely different from the older version. 

![image](https://github.com/Cysiek96/Z2J/assets/113532109/d17f4afe-5f4e-45ef-83d7-7813a2d4d030)

As we can see, this item is created as a grid that is divided by 5 elements: name (1), gender represented by the image (2), basic information with the addition of the name of the home planet (3) and a machinery section that includes vehicles (4) and starships(5).

We can click on items that are marked with a yellowish underline, which means we can click on the name of the planet Home, as well as on the "bubble" of each machine. 

#### [Planet Panel](#Table-of-content)

Not only the peron display card was changed, but planet menu also. As we can see in the previous project this planet menu  is genereted and fill fileds in cards as same as now, but in this time the layout was changed and planet image was added. This image is dynamically inserted in compatision to terrain, but i was lack of planet spheres images which fit exactly into this specific planet terrain, so most of this planets have this one image. 


![image](https://github.com/Cysiek96/Z2J/assets/113532109/8938b5c5-28d7-45d9-b473-7008030528a4)

As we can see, below we have an example with a dynamically added image of the planet. For those who do not believe, please search for LOBOT.

![image](https://github.com/Cysiek96/Z2J/assets/113532109/51c7643f-9fa2-4cfc-ad36-e2636c13f3c7)


I hope this layout looks nicer and clearer than the old one, not only for me.

#### [Machine Panel](#Table-of-content)

The machine's context menu is also a new feature that was created as an addition to an older version of the StarWars Person Hightlight project. The layout of the main view grid is divided into several sections:  The name of the machine (1), (2) an image that matches the machine's category,(3) basic information about that item, and at least the cost(4). If we want any information, we should click the balloon, which is the close button if we are already displaying the tab.   

![image](https://github.com/Cysiek96/Z2J/assets/113532109/cd71f8a4-42e1-43a1-a465-b48687b41c5c)


It is worth mentioning that we can close the machine window just by clicking the same button. Another bubble will not affect the program.


### [Other Elements](#Table-of-content)
As mentioned earlier, this program has many different elements, which are the navigation elements and the search bar.
1. Return to the basic view - this button will appear only if we load data from the locale storage, searching for an person, and also if we use the next or previous button - but only if the generated item does not show us the first two.
1. Buttons: prev and next - this item generates 2 items next or previous from the SWAPI application database. These buttons are displayed only when we have not reached the minimum and maximum in the database.
1. Search bar - an element that is also equipped with a selection element. So far, this selection is limited only to a person, but in the future I will extend this application with other elements that will allow the user to search directly for a planet or machine, etc.  We need to pass some data in the centimeter field where the placeholder is located and click Enter. We will get information about the element we are looking for, and the results, correct or incorrect.

![image](https://github.com/Cysiek96/Z2J/assets/113532109/0510064c-96f9-42b4-8796-bd1260db8163)

4. Searching infrormation window - Information search window - this is an element that appears only when you use the search bar. It contains information about the request that was entered in the search bar.

![image](https://github.com/Cysiek96/Z2J/assets/113532109/b145d707-9524-4988-bfdb-ce991650ac7c)

5. Error message window - an element that provides the user with information about incorrect data, such as:
   *  The server cannot reach this state.
   * The request failed.
   * The request was correct, but there are no results.
   The error message contains information such as the status, the error message and the requested URL.

![image](https://github.com/Cysiek96/Z2J/assets/113532109/e841c3fa-5dba-461b-b88f-8cc5513ff89c)

## [Solved Problems](#Table-of-content)

- [x]  Local storage does not return an error if the search result contains only one item, and we refresh the page
- [x]  The next and previous buttons do not generate and display more than 2 items simultaneously.
- [x]  Planet menu returns only one displayed item at a time 
- [x]  The machine element creates only one view and prevents the creation of other views. Also, other bubbles do not affect this view.

## [Roadmap](#Table-of-content)
- [ ] Allow users to search by categories other than person
- [ ] Allow the user to observe two planetary elements on one screen - the view of one planet does not affect the other.
- [ ] Fix the smaller bugs
- [ ] Create a fully responsive website
- [ ] Search / Create different planetary spheres that can represent more than just a few planets img


## [Sources](#Table-of-content)
- [SWAPI APP](https://swapi.dev/)
- [Google Icons](https://fonts.google.com/icons)
- [Vite](https://vitejs.dev/)
- [Axios](https://www.npmjs.com/package/axios)


### [Changes](#Table-of-content)
