pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching the latest source code...'
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Build & Run Store') {
            steps {
                echo 'Building and starting the store using Docker Compose...'
                sh 'docker compose up -d --build'
            }
        }
        
        stage('Verify Running Containers') {
            steps {
                echo 'Checking if containers are up...'
                sh 'docker ps'
            }
        }
    }
}