pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build --no-cache'
            }
        }

        stage('Test') {
            steps {
                sh 'docker-compose run --rm backend pytest'
            }
        }

        stage('Code Quality') {
            steps {
                sh '''
                docker-compose run --rm backend sh -c "
                pip install flake8 &&
                flake8 .
                "
                '''
            }
        }

        stage('Security Scan') {
            steps {
                sh '''
                docker run --rm \
                -v /var/run/docker.sock:/var/run/docker.sock \
                aquasec/trivy image --exit-code 1 --severity HIGH,CRITICAL smart_study-backend
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Release') {
            steps {
                sh 'docker tag smart_study-backend smart_study-backend:latest'
            }
        }

        stage('Monitoring') {
            steps {
                sh 'docker stats --no-stream'
            }
        }
    }
}