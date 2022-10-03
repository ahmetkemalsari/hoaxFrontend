pipeline {
    agent any
    environment{ 
        NEW_VERSION = '1.3.0'
    }
    stages {
        stage('build') {
            steps {
                echo "build the application"
                echo "build version ${NEW_VERSION}"
            }
        }
        stage('test') {
            steps {
                echo "test the application"
            }
        }
        stage('deploy') {
            steps {
                echo "deploy the application"
                sh "pwd"
            }
        }
    }

}
