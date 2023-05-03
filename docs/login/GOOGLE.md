# Setting up the Google Login
<sub>⚠️ Before following this, please follow the [Setting up the Database](/docs/DATABASE.md) documentation</sub>
1. Go to the project in the [Firebase Console](https://console.firebase.google.com/)
2. On the left-hand side, click `Build => Authentication`
    * Click the `Get Started` button if it's not setup
3. Go to the `Sign-in method` tab and click `Google` and enable it
    * Provide a Project support email and click `Save`
4. Click the Google provider and open up the `Web SDK configuration` tab
5. Copy the key in the `Web client ID` field and paste it into the `env.example.ts` file where it says "*YOUR_WEB_CLIENT_ID*" and rename the file to `env.ts`