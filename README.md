# Loveless' Chat App
Built with React Native, utilizing Firebase as the underlying Database.

## Documentation
[Setting up the Database](docs/DATABASE.md)  
[Adding Google Login](docs/login/GOOGLE.md)  
[Adding Facebook Login](docs/login/FACEBOOK.md)  
[Setting up the Chat Rooms](docs/ROOMS.md)

## Build
<sub>⚠️ Before building the app, please go through the [Documentation](#documentation) guides</sub>  

After going through the guides in [Documentation](#documentation) we're ready to start the app.  
We're ready to install the packages needed, inside the project folder we run the command
```
npm install
```
To start Metro, that bundles the JavaScript for React Native, run the command below
```
npx react-native start
```
Let's now get the application running, by running the following command in a separate terminal
```
npx react-native run-android
```
This will start the installed Emulator or install the application on a connected Android device.

## Tasks
1. Splash Screen
    - [x] Splash screen while loading app
    - [x] Load login if not logged in, otherwise Chat rooms
2. Login Screen
    - [x] Facebook & Google Login
    - [x] When signed in go to Chat rooms
    - [x] If error, show error
3. Chat rooms
    - [x] List with name and short description
    - [x] Chevron icon to the right
    - [x] Sorted by newest message
       * Doesn't refresh when returning from chat room (*yet*)
    - [x] Pull to reload list
    - [x] Load chat room when pressed
4. Send and receive messages
    - [x] Load last 50 messages on load
    - [x] Scroll to load more messages
    - [x] Add to list when message received
    - [x] Input field at the bottom
        - [x] Open keyboard when pressed
        - [x] Send and add message when user presses "Send" / "Enter"
    - [x] Message consists of
        - [x] Avatar and Name of sender
        - [x] Date and Text of message
5. Push functionality
    - [x] Ask for notifications, on first message in a room
    - [ ] On new message in room, send push notification
    - [x] When notification is pressed, take the user to the room/message using deep links
6. Upload of images to chat room
    - [x] Upload from camera
    - [x] Upload from gallery
    - [x] Image shown in chat

## Work Hours
I've worked *roughly* 16 hours on this project in total, from start to finish.

## *Notes*
> - The application have not been tested for iOS, and I cannot guarantee it'll compile for iOS.
> - The tests performed on android have been through Metro on a newer Android phone.

## *Problems*
- The biggest problem I faced was that I needed to show a notification to all users subscribed to a room when the room would receive a new message, without a server for the Firebase Admin SDK.
  - As a last try, I tried setting up Firebase Functions to trigger on a new message, where it would then send a message to the app. Unfortunately trying to set up the functions seemed to fail no matter what I did, so yeah..
  - I've thought about a solution that would require a background service to run, which can be done with the [react-native-background-fetch](https://www.npmjs.com/package/react-native-background-fetch) package, which I tried to do, but it gave me a dependency error that I was unable to solve. Another package I tried to utilize was [react-native-background-timer](https://www.npmjs.com/package/react-native-background-timer), which unfortunately gives an error on the screen, and it hasn't been updated for 3 years, but at least it actually ran in the background.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).