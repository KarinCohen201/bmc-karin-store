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
                // Verify that Docker and Docker Compose are installed and accessible
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Build & Run Store') {
            steps {
                echo 'Cleaning up old containers...'
                // Force remove specific container names explicitly
                sh 'docker rm -f bmc-backend || true'
                sh 'docker rm -f bmc-frontend || true'
                
                // Standard compose down
                sh 'docker compose down || true'
                
                echo 'Building and starting the store using Docker Compose...'
                sh 'docker compose up -d --build'
            }
        }
        
        stage('Verify Running Containers') {
            steps {
                echo 'Checking if containers are up...'
                // List active containers to verify successful deployment
                sh 'docker ps'
            }
        }
    }
}