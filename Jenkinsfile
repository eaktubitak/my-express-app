pipeline{
    agent{
        label 'docker-agent'
    }

    stages{
        stage('Prepare Workspace') {
            steps {
                script {
                    deleteDir() // Workspace'i temizler
                }
            }
        }
        stage("Welcome"){
            steps{
                sh "pwd"
                sh "ls"
            }
        }
    }
}
