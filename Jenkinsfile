pipeline {
    // Execute this pipeline on any available agent
    agent any

    stages {
        // Stage 1: Initial check of the source code
        stage('Checkout') {
            steps {
                // Informative message about fetching code
                echo 'Fetching the latest source code from GitHub...'
            }
        }

        // Stage 2: Verify that Docker and Docker Compose are installed and accessible
        stage('Environment Check') {
            steps {
                echo 'Verifying Docker installation...'
                // Check Docker version to ensure CLI is working
                sh 'docker --version'
                // Check Docker Compose version for container orchestration
                sh 'docker compose version'
            }
        }

        // Stage 3: The actual build process (to be expanded later)
        stage('Build Store') {
            steps {
                echo 'Starting the Docker build process for bmc-karin-store...'
                // Future command: sh 'docker compose build'
            }
        }
    }
}