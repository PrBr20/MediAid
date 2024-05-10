# MediAid

It is a web platform for doctors, patients, medicine shops and dignostic labs

## Features

- Doctors, Medicines and Tests filtering
- Taking appointment of Doctors and Diagnostic Labs
- Live update of the appointment delay and expected time
- Prescription and Lab Report Management
- Medicine Buying and Selling
- Delivering Reports of concerning patient from Labs to Doctors

## Run Locally

Clone the project

```bash
  git clone https://github.com/PrBr20/MediAid.git
```

Then you should have some environment variables.
In the backend, create a .env file and paste the following lines with appropiate tokens.

```bash
  PORT=*********
  MONGO_URL=***********
  JWT_SECRET=**********
```

Similarly in the frontend, create a .env.local file and paste the following lines with proper tokens.

```bash
  VITE_CLOUD_NAME=******
  VITE_UPLOAD_PRESET=*****
```

Go to the project directory and run the backend

```bash
  cd MediAid
  cd backend
  npm install
  npm run start
```

The backend should start at localhost:5000. The api documentation file is in the backend directory. You can check using postman whether or not the backend is working correcly.

Now go to the frontend directory and run the frontend

```bash
  cd ../frontend
  npm install
  npm run dev
```

Now open any browser and paste "localhost:5173". and here you go
