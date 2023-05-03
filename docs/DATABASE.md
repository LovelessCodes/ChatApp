# Setting up the Database
1. Go to [Firebase Console](https://console.firebase.google.com/)  
    * Login with your Google Account
    * Create a project
        - Name doesn't matter
        - Analytics doesn't matter
2. On the left-hand side, click `Build => Firestore Database`
    * Click the `Create database` button
        - Pick *Start in **test mode*** and click `Next`
        - Set the location to be near you and enable.
3. On the left-hand side, click `Project Overview`
4. Click the Android button in the middle of the screen and register the android app
    * Package name has to be `com.lovelesschat`
    * App nickname doesn't matter
    * Input the debug SHA-1 key
    ```
    5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
    ```
    * *Registering the app might give you an error that the SHA-1 is in another app with the same name, this can happen but it still registers the app fine*
5. Download the config file
    * If you got the error on the 8th step, the config file can be found by going back and refreshing the site, there after clicking the android icon with the nickname you set for the app.
    * There will be a button that says `google-services.json`, click it and it'll download.
6. Put the config file you just downloaded, into `android/app/` inside the project folder.

## Indexes
1. Go to the project in the [Firebase Console](https://console.firebase.google.com/)
2. On the left-hand side click the `Firestore Database` option
3. Go to the `Indexes` tab and click `Add index`
    * For the Collection ID, write `messages`
    * First field path needs to be `roomId` and it needs to stay as `Ascending`
    * Second field path needs to be `createdAt` at needs to be switched to `Descending`
    * Remember to click the `Create index` button
