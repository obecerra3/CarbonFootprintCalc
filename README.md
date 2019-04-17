# ***Fly Aware***
Spring 2019 Georgia Tech Junior Design project for a carbon footprint calculator for air travel in the form of Chrome extension. Created for the Global Change Program at Georgia Tech.

## Release Notes of ***Fly Aware ver. 1.0***
### NEW FEATURES
- Added drop down displaying step by step calculations
- Added geolocation detection to change charity options based on user's location
- Added charity options for Georgia users
- Added desktop notification when the flight information is detected  
- Removed dependency on Vue.js

### BUG FIXES



### KNOWN BUGS
- Notification of flight information detection seems to not show up sometimes for mac users
- Only charity options for Georgia are available currently. Charity options for other states will be added in the next version.


## Install Guide of ***Fly Aware ver 1.0***
### PRE-REQUISITES
- You must have Google Chrome in your laptop to use the Chrome Extension

### DEPENDENCIES
- No dependencies

### DOWNLOAD
- Download the unpacked version of the Chrome Extension from [GitHub](https://github.com/obecerra3/CarbonFootprintCalc)

### BUILD
- No building is necessary

### INSTALLATION
1. On your Google Chrome, open the Extension Management page by navigating to <chrome://extensions/>
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **LOAD UNPACKED** button and select the directory in which the Chrome Extension is saved in your computer

### RUNNING APPLICATION
1. Go to any of booking websites for [American Airlines](https://www.aa.com/homePage.do), [Delta Airlines](https://www.delta.com/), [Southwest Airlines](https://www.southwest.com/), and [United Airlines](https://www.united.com/en/us).
2. After you arrive to the trip summary page of the website, the desktop notification will pop up, telling you that the flight information was detected.
3. Click onto the Fly Aware icon to view the carbon footprint estimation for each flight, total carbon emitted with contextualization, and the list of local charity options.
4. Click the flight boxes to open the drop down and view the calculation steps.
5. Click the local charity options to navigate to donation pages.
