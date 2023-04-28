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


> *Notes*
> - The application have not been tested for iOS, and I cannot guarantee it'll compile for iOS.
> - The tests performed on android have been through Metro on a newer Android phone.