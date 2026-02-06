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
                // Stop and remove existing containers to ensure a clean state.
                // '|| true' prevents the pipeline from failing if no containers are currently running.
                sh 'docker compose down || true'
                
                echo 'Building and starting the store using Docker Compose...'
                // Build images and start containers in detached mode (-d)
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