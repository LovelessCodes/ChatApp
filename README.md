# Loveless' Chat App
Built with React Native, utilizing Firebase as the underlying Database.

## Setting up the Database
1. Go to [Firebase Console](https://console.firebase.google.com/)  
    * Login with your Google Account
    * Create a project
        - Name doesn't matter
        - Analytics doesn't matter
2. On the left-hand side, click `Build => Authentication`
    * Click the `Get Started` button
3. Go to the `Sign-in method` tab and click `Google` and enable it
4. On the left-hand side, click `Build => Firestore Database`
    * Click the `Create database` button
        - Pick *Start in **test mode***
        - Set the location to be near you
5. On the left-hand side, click `Project Overview`
6. Click the Android button in the middle of the screen and register the android app
    * App nickname doesn't matter
    * Package name has to be `com.lovelesschat`
    * Leave the checkbox unticked
7. You will now be presented with the environment variables you need in the `.env` file

## Tasks
1. ~~Splash Screen~~
   * ~~Splash while loading app~~
   * ~~Load login if not logged in, otherwise Chat rooms~~
2. ~~Login Screen~~
   * ~~Facebook & Google Login~~
   * ~~When signed in go to Chat rooms~~
   * ~~If error, show error~~
3. ~~Chat rooms~~
   * ~~List with name and short description~~
   * ~~Chevron icon to the right~~
   * ~~Sorted by newest message~~
       * Doesn't refresh when returning from chat room (*yet*)
   * ~~Pull to reload list~~
   * ~~Load chat room when pressed~~
4. ~~Send and receive messages~~
   * ~~Load last 50 messages on load~~
   * ~~Scroll to load more messages~~
   * ~~Add to list when message received~~
   * ~~Input field at the bottom~~
       * ~~Open keyboard when pressed~~
       * ~~Send and add message when user presses "Send" / "Enter"~~
   * ~~Message consists of~~
       * ~~Avatar and Name of sender~~
       * ~~Date and Text of message~~
5. Push functionality
   * Ask for notifications, on first message in a room
   * On new message in room, send push notification
   * When notification is pressed, take the user to the room/message using deep links
6. ~~Upload of images to chat room~~
   * ~~Upload from camera~~
   * ~~Upload from gallery~~
   * ~~Image shown in chat~~

## Work Hours
This is a rough estimation of the hours I've worked on this.
| Day      | Hours     |
|:--------:|:---------:|
| Friday   | ~5 hours  |
| Saturday | ~6 hours  |

### *Notes*
> - The application have not been tested for iOS, and I cannot guarantee it'll compile for iOS.
> - The tests performed on android have been through Metro on a newer Android phone.