pipeline {
    agent {
        docker {
            image 'node:12-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
	post{
		failure {
    		slackSend color: '#FF0000',
    		message: "@channel ${env.JOB_BASE_NAME} failure. (${env.BUILD_URL})"
		}
	}
}
