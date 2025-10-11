pipeline {
    agent any

    tools {
        nodejs 'NodeJS_22' // Replace with your configured NodeJS tool name
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/rhl20kmr/angular-ssr-project.git', branch: 'jenkins-branch'
            }
        }

      stage('Install Dependencies') {
            steps {
                dir('angular-ssr-app') {
                    sh 'npm ci'
                }
            }
        }
        

        stage('Build') {
            steps {
                dir('angular-ssr-app') {
                    sh 'npm run build -- --configuration production'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'jenkins-branch'
            }
            steps {
                echo 'Deploying Angular app..'
                // Add your deployment script here (e.g., Firebase, S3, FTP)
            }
        }
    }

    post {
        success {
            echo '✅ Angular pipeline completed successfully.!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs for details.'
        }
    }
}
