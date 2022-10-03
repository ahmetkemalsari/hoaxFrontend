pipeline {
    agent any
    environment{ 
        NEW_VERSION = '1.3.0'
    }
    parameters{
        choice(name: 'VERSION', choices:  ['1.1.0','1.2.0','1.3.0'],description: '')
        booleanParam(name : 'executeTests',defaultValue:true, description:'')
    }
    stages {
        stage('build') {
            steps {
                echo "build the application"
                echo "build version ${NEW_VERSION}"
            }
        }
        stage('test') {
            when{
                expression{
                    parameters.executeTests == true
                }
            }
            steps {
                echo "test the application"
            }
        }
        stage('deploy') {
            steps {
                echo "deploy the application"
                echo "deploy version ${parameters.VERSION}"
                sh "pwd"
            }
        }
    }

}
