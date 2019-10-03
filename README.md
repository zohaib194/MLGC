# MLGC
The idea behind MLGC is to support any organization in their efforts of becoming more sustainable. More precisely, the proposed solution consists in a waste sorter based on image recognition.

As part of the project, the team has applied the TYOM feautre on SAP Cloud Platform and created a mobile interface for image recognition in order to simulate a trash scanner. The training datasample consisted in approximtely 300 pictures per category, available on Kaggle.

## How to run
- Clone the repository.
- Navigate to the root directory of the repository.
- Create .env file and add the following fields:
    * clientID="**************'"
    * clientSecret="*******"
    * authenticationURL="************************/oauth/token?grant_type=client_credentials"
    * baseURL="https://mlftrial-image-classifier.cfapps.eu10.hana.ondemand.com/api/v2/image/classification"

- Run the following commands in the root directory:
    - npm install
    - npm start

- Open the browser and navigate to http://localhost:19002/
- Install the Expo app in the mobile phone.
- Open the Camera in the mobile and scan the QR code.
- Expo will generate a notification, open Expo using notification and let Expo do the rest.
