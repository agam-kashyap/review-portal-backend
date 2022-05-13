<h1 align="center">selec. Backend</h1>

> Developed as a part of CS 816 - Software Production Engineering course.

![CI Badge](https://github.com/agam-kashyap/review-portal-backend/actions/workflows/backend-ci.yml/badge.svg)

## Install

```sh
git clone git@github.com:agam-kashyap/review-portal-backend.git
cd review-portal-backend
npm install
```

## API Documentation

Find the [API documentation here](https://app.swaggerhub.com/apis-docs/agam-kashyap/Selec/1.0.0)


## Launch the backend

```sh
npm start
```

## Docker Development

```sh
docker pull agamkashyap/review-portal-backend
docker build -t agamkashyap/review-portal-backend:latest .
docker run -p 3000:3000 agamkashyap/review-portal-backend:latest
```

Find the [docker image here](https://hub.docker.com/r/keiserdocker/selec-frontend)
