# Setting up the Facebook Login
<sub>⚠️ Before following this, please follow the [Setting up the Database](/docs/DATABASE.md) documentation</sub>
1. Go to the [Facebook Apps](https://developers.facebook.com/apps/) page
2. Click `Create App` and pick `User` as the App type
    * App name doesn't really matter
3. Click the `Set up` button under the Facbook Login card
4. Click the Android button, and click the "*I already installed the Android SDK*" link right next to the `Next` button.
5. Go to the `Add Your Development and Release Key Hashes` tab
6. Go to where you can insert something under `Key hashes`
    * Insert `Xo8WBi6jzSxKDVR4drqm84yr9iU=`[^1] as the key hash 
    * Remember to click the `Save` button
7. On the left-hand side, go to `Settings => Basic`
8. Go to the project in the [Firebase Console](https://console.firebase.google.com/) in another tab
9. Go to `Authentication` and then the `Sign-in method` tab
10. Click `Add new provider` and pick Facebook from the list
11. Put in the `App ID` and `App Secret` from the Facebook page
12. Copy the `App ID` and put it in the file located at `android/app/src/main/res/values/strings.xml` where it says "*YOUR_FACEBOOK_APP_ID*"
13. On the Facebook page, go to `Settings => Advanced` and scroll a bit down till you see `Client token` and copy it into the `android/app/src/main/res/values/strings.xml` file where it says "*YOUR_FACEBOOK_CLIENT_TOKEN*"
    * Before you click `Save` on the Firebase Console, copy the link that ends in `/auth/handler`
15. Go back to the Facebook page, and then on the left-hand side, go to `Facebook Login => Settings`
16. Insert the link that you copied, into the field under `Valid OAuth Redirect URIs` and click `Save Changes`

[^1]: Only use this key hash, during development/debugging
